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
  private isInitiatedClose = false;
  private HEARTBEAT_RAW_BYTES: Uint8Array;
  private uiTimer: ReturnType<typeof setInterval> | null = null;
  private lastMessageTime: number = 0;
  private reconnectTimer: ReturnType<typeof setInterval> | null = null;
  private messageCount = 0;
  private messageQueue: any[] = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  public onMessage?: (data: any) => void;
  private memoryTimer: ReturnType<typeof setInterval> | null = null;

  constructor(roomId: string) {
    this.roomId = roomId;
    this.HEARTBEAT_RAW_BYTES = base64ToUint8Array("ABQdAAwsNgBM");
  }

  public connect() {
    this.isInitiatedClose = false;

    this.memoryTimer = setInterval(() => {
      if ((global as any).HermesInternal) {
        const stats = (
          (global as any).HermesInternal as any
        ).getInstrumentedStats?.();
        if (stats) {
          console.log((global as any).__turboModuleProxy);
          console.log(
            "[Hermes内存]",
            "GC次数:",
            stats.js_num_full_gc,
            "堆大小:",
            (stats.js_allocatedBytes / 1024 / 1024).toFixed(1),
            "MB",
            "消息:",
            this.messageCount,
          );
        }
      }
    }, 2000);

    this.socket = new WebSocket(`wss://cdnws.api.huya.com`);
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
  }

  private handleOpen() {
    console.log(`[弹幕系统-虎牙] - 连接成功！房间ID: ${this.roomId}`);
    this.lastMessageTime = Date.now();
    this.startFlush();
    this.sendAndEnterRoom();
  }

  private async sendAndEnterRoom() {
    if (!this.socket) return;
    this.onMessage?.({
      type: "msg",
      name: "系统公告",
      txt: `开始准备为您连接弹幕，请稍后... `,
    });
    var joindata = await getHuyaRegisterData(Number(this.roomId));
    if (joindata) {
      this.socket.send(joindata as any);
      this.onMessage?.({
        type: "msg",
        name: "系统公告",
        txt: `弹幕系统连接成功！`,
      });
    }
    this.startHeartbeat();
  }

  private startHeartbeat() {
    if (!this.socket) return;
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(this.HEARTBEAT_RAW_BYTES);
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
  }

  private handleMessage(event: MessageEvent) {
    this.lastMessageTime = Date.now();
    this.messageCount++;
    const wsData = standardizedFormat(event.data as any);
    if (!isEmpty(wsData)) {
      this.messageQueue.push(wsData);
    }
  }

  private startFlush() {
    this.flushTimer = setInterval(() => {
      if (this.messageQueue.length > 0) {
        const batch = this.messageQueue.splice(0);
        const onlineMsg = batch.find((m) => m.type === "online");
        if (onlineMsg) {
          huya.getVipOnline(Number(this.roomId)).then((data: any) => {
            this.onMessage?.({ ...onlineMsg, vip: data.iTotal });
          });
        }
        const normalMsgs = batch.filter((m) => m.type !== "online");
        this.onMessage?.({ type: "batch", data: normalMsgs });
      }
    }, 500);
  }

  private handleError(event: Event) {
    console.error("[弹幕系统-虎牙] 连接错误", {
      roomId: this.roomId,
      readyState: this.socket?.readyState,
      url: this.socket?.url,
      event,
    });
  }

  private restart() {
    this.cleanup();
    this.connect();
  }

  private cleanup() {
    this.stopHeartbeat();
    if (this.uiTimer) clearInterval(this.uiTimer);
    if (this.memoryTimer) clearInterval(this.memoryTimer);
    if (this.reconnectTimer) clearInterval(this.reconnectTimer);
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.messageQueue = [];
    this.messageCount = 0;
    if (this.socket) {
      this.socket.onerror = null;
      this.socket.onclose = null;
      this.socket.onmessage = null;
      this.socket.close();
      this.socket = null;
    }
  }

  public handleClose() {
    if (this.isInitiatedClose) return;
    this.isInitiatedClose = true;
    console.log("连接关闭");
    this.cleanup();
  }
}
