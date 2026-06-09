import CryptoJS from "crypto-js";

/**
 * 斗鱼sgin 加密签名
 */
export async function get_douyu_sgin(scriptContent: string, room_id: number) {
  (global as any).CryptoJS = CryptoJS;
  (global as any).window = global; // 确保 window 也能被访问

  try {
    // 3. 执行包装器，传入 sandbox
    const fn = new Function(`${scriptContent}; return ub98484234;`);
    const ub98484234 = fn();
    // 4. 执行加密函数
    const did = "10000000000000000000000000001501";
    const time = Math.floor(Date.now() / 1000);
    const sgin = ub98484234(room_id, did, time);
    return sgin;
  } catch (e) {
    console.error(`获取sgin发生错误: ${e}`);
    throw e;
  }
}
