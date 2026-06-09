import axios from "axios";
import { HomeRoomsBase } from "../../base/homeRoomsBase";
import { Rl } from "../../types/douyu/homeRooms.type";

export async function getHomeRooms(page: number) {
  try {
    const { data } = await axios.get(
      `https://www.douyu.com/gapi/rkc/directory/mixListV1/0_0/${page}`,
    );
    const { rl } = data?.data || {};
    if (!rl) return null;
    return rl?.map((item: Rl) => HomeRoomsBase.fromDouyu(item));
  } catch (error) {
    console.error("获取斗鱼首页失败", error);
  }
}
