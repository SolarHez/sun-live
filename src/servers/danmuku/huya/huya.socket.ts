//WebSocket 基础封装 (建立连接/心跳)

import huya from "../../core/huya";
import { standardizedFormat } from "./huya.handlers";
import { getHuyaRegisterData } from "./huya.parser";
import { base64ToUint8Array } from "./utils/array";
import { isEmpty } from "./utils/is";

export class HuyaSocketClient {
  private roomId: string;
  private socket: WebSocket | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  // 回调函数定义
  public onMessage?: (data: any) => void;

  constructor(roomId: string) {
    this.roomId = roomId;
  }

  /**
   * 初始化连接服务器
   */
  public connect() {
    this.socket = new WebSocket(`wss://cdnws.api.huya.com`);
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
  }

  /**
   * 处理连接打开
   */
  private handleOpen() {
    console.log(`[弹幕系统-虎牙] - 连接成功！房间ID: ${this.roomId}`);
    // 连接成功后，发送注册并进入房间
    this.sendAndEnterRoom();
  }

  /**
   * 发送注册并进入房间
   */
  private async sendAndEnterRoom() {
    if (!this.socket) return;
    this.onMessage?.({
      type: "msg",
      name: "系统公告",
      txt: `开始准备为您连接弹幕，请稍后... `,
    });
    // 发送注册包
    var joindata = await getHuyaRegisterData(Number(this.roomId));
    if (joindata) {
      this.socket.send(joindata as any);
      this.onMessage?.({
        type: "msg",
        name: "系统公告",
        txt: `弹幕系统连接成功！`,
      });
    }
    // 发送心跳包
    this.startHeartbeat();
  }

  /**
   * 开始心跳
   */
  private startHeartbeat() {
    if (!this.socket) return;
    // 停止旧的心跳定时器
    this.stopHeartbeat();
    // 开始新的心跳定时器
    this.heartbeatTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        // 发送心跳包
        this.socket.send(base64ToUint8Array("ABQdAAwsNgBM") as any); //心跳包参数
      }
    }, 30000); // 每 30 秒发送一次心跳包
  }

  /**
   * 停止心跳
   */
  private stopHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
  }
  /**
   * 处理收到的消息
   */
  private async handleMessage(event: MessageEvent) {
    const wsData = standardizedFormat(event.data as any);
    if (!isEmpty(wsData)) {
      if (wsData.type === "online") {
        const data = (await huya.getVipOnline(Number(this.roomId))) as any;

        this.onMessage?.({ ...wsData, vip: data.iTotal });
        return;
      }
      this.onMessage?.(wsData);
    }
  }

  /**
   * 处理错误
   */
  private handleError() {
    console.error("连接错误");
  }

  /**
   * 处理关闭
   */
  public handleClose() {
    console.log("连接关闭");
    // 关闭心跳定时器
    this.stopHeartbeat();
    // 关闭 WebSocket 连接
    this.socket?.close();
    this.socket = null;
  }
}
