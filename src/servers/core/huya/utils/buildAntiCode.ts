import * as Crypto from "expo-crypto";

/**
 * 虎牙 AntiCode 生成方法
 * @param stream 串流名 (sStreamName)
 * @param presenterUid 主播UID (lPresenterUid)
 * @param antiCode 原始 antiCode
 */
export async function buildAntiCode(
  stream: string,
  presenterUid: number,
  antiCode: string,
): Promise<string> {
  const urlParams = new URLSearchParams(antiCode);
  const mapAnti: Record<string, string> = {};
  urlParams.forEach((value, key) => {
    mapAnti[key] = value;
  });

  // 如果不包含 fm 参数，直接返回原始值
  if (!mapAnti["fm"]) {
    return antiCode;
  }

  const ctype = mapAnti["ctype"] || "huya_pc_exe";
  const platformId = parseInt(mapAnti["t"] || "0", 10);
  const isWap = platformId === 103;
  const clacStartTime = Date.now();

  // 计算 seqId
  const seqId = presenterUid + clacStartTime;

  // 计算 secretHash: md5(seqId|ctype|t)

  const secretHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    `${seqId}|${ctype}|${platformId}`,
  );

  // 虎牙转换 UID 逻辑：PC端通常会对 UID 进行位移
  const convertUid = ((BigInt(presenterUid) << 32n) >> 0n).toString();
  const calcUid = isWap ? presenterUid.toString() : convertUid;

  // 解析 fm (Base64解码)
  const fm = decodeURIComponent(mapAnti["fm"]);
  const secretPrefix = Buffer.from(fm, "base64")
    .toString("utf-8")
    .split("_")[0];

  const wsTime = mapAnti["wsTime"];

  // 核心加密串：prefix_uid_stream_hash_time
  const secretStr = `${secretPrefix}_${calcUid}_${stream}_${secretHash}_${wsTime}`;
  // const wsSecret = crypto.createHash("md5").update(secretStr).digest("hex");
  const wsSecret = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    secretStr,
  );

  // 生成结果对象
  const antiCodeRes: Record<string, any> = {
    wsSecret: wsSecret,
    wsTime: wsTime,
    seqid: seqId,
    ctype: ctype,
    ver: "1",
    fs: mapAnti["fs"],
    fm: encodeURIComponent(fm),
    t: platformId,
  };

  if (isWap) {
    const rnd = Math.random();
    const ct = Math.floor((parseInt(wsTime, 16) + rnd) * 1000);
    const uuid = Math.floor(
      (((ct % 1e10) + Math.random()) * 1e3) % 0xffffffff,
    ).toString();
    antiCodeRes["uid"] = presenterUid;
    antiCodeRes["uuid"] = uuid;
  } else {
    antiCodeRes["u"] = calcUid;
  }

  // 序列化回字符串
  return Object.entries(antiCodeRes)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
