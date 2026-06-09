import axios from "axios";
import { PlayUrlBase } from "../../base/playUrlBase";
import { TarsHttpClient } from "../tars/http";
import {
  CdnTokenInfoExRsp,
  GetCdnTokenInfoExReq,
  GetCdnTokenInfoExRsp,
} from "../tars/protocol/getcdntokeninfoex";
import { buildAntiCode } from "../utils/buildAntiCode";

export async function getPlayUrl(room_id: number) {
  try {
    const { data } = await axios.get(
      `https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=${room_id}`,
    );
    const { sFlvUrl, sStreamName, lChannelId } =
      data.data.stream.baseSteamInfoList[0];
    const request = new GetCdnTokenInfoExReq();
    request.sFlvUrl = sFlvUrl;
    request.sStreamName = sStreamName;
    const { sFlvToken } = await TarsHttpClient<CdnTokenInfoExRsp>(
      "liveui",
      "getCdnTokenInfoEx",
      request,
      GetCdnTokenInfoExRsp,
    );
    const antiCode = await buildAntiCode(sStreamName, lChannelId, sFlvToken);
    console.log(antiCode);
    const url = new URL(`${sFlvUrl}/${sStreamName}.flv?${antiCode}`);
    url.searchParams.append("codec", "264");
    url.searchParams.append("ratio", "0");
    return PlayUrlBase.fromHuya({ room_id, url: url.toString() });
  } catch (error) {
    console.error("获取虎牙直播间播放地址失败", error);
    return null;
  }
}
