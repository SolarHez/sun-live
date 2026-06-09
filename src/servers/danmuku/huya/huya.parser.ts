import { Buffer } from "buffer";

if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}

import * as Tars from "@tars/stream"; //
import huya from "../../core/huya";

/**
 * 获取虎牙弹幕WS注册参数
 * @param {*} rid
 * @returns
 */
export async function getHuyaRegisterData(rid: number) {
  try {
    const data = await huya.getRoomInfo(rid, "uid");
    console.log(`获取虎牙弹幕WS注册参数成功:`, data);
    const { yyid, lChannelId, lSubChannelId } = data as any;
    const TarsData = await TarsOutputData(yyid, lChannelId, lSubChannelId);
    return TarsData;
  } catch (error) {
    console.error(`获取虎牙弹幕WS注册参数发生错误`, error);
  }
}

export async function TarsOutputData(
  yyid: number,
  lChannelId: number,
  lSubChannelId: number,
) {
  try {
    // 实例化内部流
    const tars = new Tars.TarsOutputStream();
    tars.writeUInt32(0, yyid);
    tars.writeUInt32(1, 1);
    tars.writeString(2, "");
    tars.writeString(3, "");
    tars.writeUInt32(4, lChannelId);
    tars.writeUInt32(5, lSubChannelId);
    tars.writeUInt32(6, 0);
    tars.writeUInt32(7, 0);

    // 实例化外层命令流
    const wscmd = new Tars.TarsOutputStream();
    wscmd.writeUInt32(0, 1);
    wscmd.writeBytes(1, tars.getBinBuffer());

    // 核心技巧：toNodeBuffer() 在补丁环境下会返回一个兼容 Uint8Array 的对象
    // 我们强制将其转为前端通用的 Uint8Array
    const bufferData = wscmd.getBinBuffer().toNodeBuffer();
    return new Uint8Array(bufferData);
  } catch (error) {
    console.error("Tars 序列化过程中发生错误：", error);
  }
}
