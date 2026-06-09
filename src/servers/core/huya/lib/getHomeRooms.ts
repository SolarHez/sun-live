import axios from "axios";
import { HomeRoomsBase } from "../../base/homeRoomsBase";

export async function getHomeRooms(page: number) {
  try {
    const { data } = await axios.get(
      `https://live.huya.com/liveHttpUI/getLiveList?iGid=0&iPageNo=${page}&iPageSize=120`,
    );
    return data.vList.map((item: any) => HomeRoomsBase.fromHuya(item));
  } catch (error) {
    console.error("获取虎牙首页失败", error);
  }
}
