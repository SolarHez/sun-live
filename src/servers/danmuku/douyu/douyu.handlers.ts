// 业务逻辑分发 (处理不同类型的消息)
import * as Crypto from "expo-crypto";
import { replaceAtA } from "../huya/utils/array";
import { LiveDanmuItem } from "../type";

/**
 * 规范JSON格式
 * @param {原JSON数据} data
 * @returns
 */
export function standardizedFormat(data: any): LiveDanmuItem {
  data = parseDanmuData(data);
  const messageType = data.messageType;
  if (messageType == "chatmsg") {
    return {
      id: Crypto.randomUUID(),
      type: "danmu",
      name: data.nn,
      avatar: `https://apic.douyucdn.cn/upload/${data.ic?.replace(/@S/g, "/")}_middle.jpg`,
      txt: replaceAtA(data.txt),
      color: codeTextColor(data.col),
    };
  }

  if (messageType == "oni") {
    return {
      id: Crypto.randomUUID(),
      type: "online",
      vip: data.vn, //直播间在线人数
    };
  }

  return {} as LiveDanmuItem;
}

/**
 * 编码message为标准JSON格式
 * @param {乱码message} data
 * @returns
 */
function parseDanmuData(data: string) {
  // Step 1: 清理掉乱码字符，保留中文和其他有意义的字符
  const cleanedData = data; // 过滤掉无效字符，保留字母、数字、中文和必要符号

  // Step 2: 按 / 分割字符串，得到每个键值对
  const keyValuePairs = cleanedData.split("/").filter((pair: string) => pair);

  // Step 3: 创建一个空对象保存键值对
  const parsedData = {} as any;

  // Step 4: 遍历每个键值对
  keyValuePairs.forEach((pair: any) => {
    // Step 4.1: 按 @= 分割每个键值对
    const [key, value] = pair.split("@=");

    if (key && value) {
      // Step 4.2: 将键值对存入对象
      parsedData[key] = value;
    }
  });

  // Step 5: 返回转换后的 JSON 数据
  return cleanData(parsedData);
}

/**
 * 规范弹幕文本颜色
 * @param {颜色键值} color
 * @returns
 */
function codeTextColor(color: any) {
  let displayColor;
  switch (color) {
    case "1":
      displayColor = "#ff5d23"; // 红色
      break;
    case "2":
      displayColor = "#1e87f0"; // 蓝色
      break;
    case "3":
      displayColor = "#7ac84b"; // 绿色
      break;
    case "4":
      displayColor = "#FFA500"; // 橙色
      break;
    case "5":
      displayColor = "#9b39f4"; // 紫色
      break;
    case "6":
      displayColor = "#ff69b4"; // 粉色
      break;
    default:
      displayColor = "#FFF"; // 默认白色
  }

  return displayColor;
}

/**
 * 辅助编码message部分乱流键名
 * @param {编码后的json数据} data
 * @returns
 */
function cleanData(data: any) {
  // 使用正则去掉所有非打印字符，保留常规的字符
  const cleanedData = {} as any;

  Object.keys(data).forEach((key: any) => {
    // 过滤掉键名中包含非 ASCII 字符的部分，保留有意义的部分
    const cleanedKey = key.replace(/[^\x20-\x7E]/g, "");

    // 对含有 `type` 的键进行处理（重命名为更合适的键名）
    if (cleanedKey === "type") {
      cleanedData["messageType"] = data[key]; // 重命名键名为 `messageType`
    } else {
      cleanedData[cleanedKey] = data[key]; // 保留其他键值
    }
  });

  return cleanedData;
}
