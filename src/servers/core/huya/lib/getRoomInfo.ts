import axios from "axios";
import { RoomInfoBase } from "../../base/roomInfoBase";

export async function getRoomInfo(room_id: number, type?: string) {
  try {
    const { data } = await axios.get(
      `https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid=${room_id}`,
    );
    if (type === "uid") {
      return RoomInfoBase.fromHuyaUid(data.data);
    }

    return RoomInfoBase.fromHuya(data.data);
  } catch (error) {
    console.error("获取虎牙直播间详情失败", error);
    return null;
  }
}
