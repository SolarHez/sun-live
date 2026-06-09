import { Buffer } from "buffer";

import Tars from "@tars/stream";
import axios from "axios";

/**
 * 发送 Huya UWP 请求
 * @param servantName 服务端名称
 * @param funcName 函数名称
 * @param req 请求参数 Tars 结构体
 * @param rsp 响应参数 Tars 结构体
 * @returns 响应结果
 */
export async function TarsHttpClient<T>(
  servantName: string,
  funcName: string,
  req: any,
  rsp: any,
) {
  //   const requestBuffer = buildRequest('liveui', 'getVipBarList', req);
  const tup = new Tars.Tup();
  tup.servantName = servantName; //'liveui'
  tup.funcName = funcName; //'getVipBarList'
  tup.requestId = 0;
  tup.tupVersion = 3;
  tup.writeStruct("tReq", req);
  const requestBuffer = tup.encode().toNodeBuffer();
  const { data } = await axios.post<ArrayBuffer>(
    "https://wup.huya.com",
    requestBuffer,
    {
      headers: {
        "Content-Type": "application/x-wup",
        "Content-Length": requestBuffer.length.toString(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      responseType: "arraybuffer",
    },
  );

  const response = decideResponse(Buffer.from(data), rsp);
  return response as T;
}

function decideResponse(data: any, rsp: any) {
  const tup_decode = new Tars.Tup();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  tup_decode.decode(new Tars.BinBuffer(data));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const vipBarListRsp = tup_decode.readStruct("tRsp", rsp);
  return vipBarListRsp;
}
