import * as Crypto from "expo-crypto";
//WebSocket 基础封装 (建立连接/心跳)
import { standardizedFormat } from "./douyu.handlers";
import { WebSocket_Packet } from "./douyu.parser";
import { isEmpty } from "./utils/is";
import { getRandom } from "./utils/random";

export class DouyuSocketClient {
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
    this.socket = new WebSocket(
      `wss://danmuproxy.douyu.com:850${getRandom(2, 5)}`,
    );
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
    console.log(`[弹幕系统-斗鱼] - 连接成功！房间ID: ${this.roomId}`);
    // 连接成功后，发送注册并进入房间
    this.sendAndEnterRoom();
  }

  /**
   * 发送注册并进入房间
   */
  private sendAndEnterRoom() {
    if (!this.socket) return;
    this.onMessage?.({
      type: "msg",
      name: "系统公告",
      txt: `开始准备为您连接弹幕，请稍后... `,
      id: Crypto.randomUUID(),
    });
    // 发送注册包
    this.socket.send(WebSocket_Packet(`type@=loginreq/roomid@=${this.roomId}`));
    // 发送进入房间包
    this.socket.send(
      WebSocket_Packet(`type@=joingroup/rid@=${this.roomId}/gid@=-9999/`),
    );
    this.onMessage?.({
      type: "msg",
      name: "系统公告",
      txt: `弹幕系统连接成功！`,
      id: Crypto.randomUUID(),
    });
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
        this.socket.send(WebSocket_Packet("type@=mrkl/")); //心跳包参数
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
    // 确保为 ArrayBuffer 类型数据
    if (!(event.data instanceof ArrayBuffer)) return;
    // 解码 ArrayBuffer 数据为字符串
    const decoder = new TextDecoder("utf-8");
    const messageData = decoder.decode(new Uint8Array(event.data));
    // 解析消息数据
    const parsedData = standardizedFormat(messageData);
    if (isEmpty(parsedData)) return;
    // 调用回调函数处理消息
    this.onMessage?.(parsedData);
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
