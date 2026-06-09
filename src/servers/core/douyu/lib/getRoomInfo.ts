import axios from "axios";
import { RoomInfoBase } from "../../base/roomInfoBase";

export async function getRoomInfo(room_id: number) {
  try {
    const { data } = await axios.get(`https://www.douyu.com/betard/${room_id}`);

    return RoomInfoBase.fromDouyu(data?.room || {});
  } catch (error) {
    console.error("获取斗鱼直播间详情失败", error);
    return null;
  }
}
