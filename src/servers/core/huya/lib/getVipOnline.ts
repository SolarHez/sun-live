import axios from "axios";
import { TarsHttpClient } from "../tars/http";
import {
  GetVipBarListReq,
  GetVipBarListRsp,
} from "../tars/protocol/getvipbarlist";

export async function getVipOnline(room_id: number) {
  try {
    const { data } = await axios.get(
      `https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=${room_id}`,
    );
    const { lChannelId } = data.data.stream.baseSteamInfoList[0];
    const req = new GetVipBarListReq();
    req.lPid = lChannelId;
    return TarsHttpClient("liveui", "getVipBarList", req, GetVipBarListRsp);
  } catch (error) {
    console.error("获取虎牙直播间VipBarList失败", error);
    return null;
  }
}
