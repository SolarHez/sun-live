// 业务逻辑分发 (处理不同类型的消息)
import { Buffer } from "buffer";
import * as Crypto from "expo-crypto";

import * as Tars from "@tars/stream"; //
import { LiveDanmuItem } from "../type";
import { replaceAtA } from "./utils/array";

//结构数据并返回规范JSON
export function standardizedFormat(data: any): LiveDanmuItem {
  let inputBuffer = new Tars.TarsInputStream(
    new Tars.BinBuffer(Buffer.from(data)),
  );
  const type = inputBuffer.readUInt32(0, false);
  if (type === 7) {
    inputBuffer = new Tars.TarsInputStream(
      inputBuffer.readBytes(1, false, Tars.BinBuffer),
    );
    const SecPackType = inputBuffer.readUInt32(1, false);
    if (SecPackType === 1400) {
      inputBuffer = new Tars.TarsInputStream(
        inputBuffer.readBytes(2, false, Tars.BinBuffer),
      );
      /**
       * 这里踩了一个坑！！！Tars的读取一定要按时序读，不然读到的数据为空，也就是第一个参数的数字先读最小值从0~10
       */
      let userInfo = inputBuffer.readStruct(0, false, HYSender);
      let txt = inputBuffer.readString(3, false);
      let bulletFormat = inputBuffer.readStruct(6, false, HYBulletFormat);
      return {
        id: Crypto.randomUUID(),
        type: "danmu",
        name: userInfo.nickName,
        avatar: ``,
        txt: replaceAtA(txt),
        color: numberToHexColor(bulletFormat.fontColor),
      };
    }

    if (SecPackType === 8006) {
      // 1. 剥离嵌套块 (Tag 2)
      inputBuffer = new Tars.TarsInputStream(
        inputBuffer.readBytes(2, false, Tars.BinBuffer),
      );
      var online = inputBuffer.readUInt32(0, false);
      return {
        type: "online",
        hot: online,
        id: Crypto.randomUUID(),
      };
    }
  }
  return {} as LiveDanmuItem;
}

//Tars数据构造函数
export class HYSender {
  uid: number;
  lMid: number;
  nickName: string;
  gender: number;
  constructor() {
    this.uid = 0;
    this.lMid = 0;
    this.nickName = "";
    this.gender = 0;
  }

  static _readFrom(inputBuffer: any) {
    const instance = new HYSender();
    instance.uid = inputBuffer.readUInt32(0, false);
    instance.lMid = inputBuffer.readUInt32(1, false);
    instance.nickName = inputBuffer.readString(2, false);
    instance.gender = inputBuffer.readUInt32(3, false);
    return instance;
  }
}

//Tars数据构造函数
export class HYBulletFormat {
  fontColor: number;
  fontSize: number;
  textSpeed: number;
  transitionType: number;
  constructor() {
    this.fontColor = 0;
    this.fontSize = 4;
    this.textSpeed = 0;
    this.transitionType = 1;
  }

  static _readFrom(inputBuffer: any) {
    const instance = new HYBulletFormat();
    instance.fontColor = inputBuffer.readUInt32(0, false);
    instance.fontSize = inputBuffer.readUInt32(1, false);
    instance.textSpeed = inputBuffer.readUInt32(2, false);
    instance.transitionType = inputBuffer.readUInt32(3, false);
    return instance;
  }
}

//数字颜色转换为#颜色
function numberToHexColor(colorNumber: any) {
  if (!colorNumber) return;
  // 如果输入是 255，返回白色
  if (colorNumber === 255) {
    return "#FFF";
  }

  // 确保输入是一个有效的整数
  if (
    typeof colorNumber !== "number" ||
    colorNumber < 0 ||
    colorNumber > 16777215
  ) {
    return "#FFF";
  }

  // 转换为 16 进制，并确保颜色是 6 位
  let hexColor = colorNumber.toString(16).padStart(6, "0");
  return "#" + hexColor;
}
