import axios from "axios";
import { ClassRoomsBase } from "../../base/classRoomsBase";

export async function getClassRooms(class_id: string, page: number) {
  try {
    const { data } = await axios.get(
      `https://live.huya.com/liveHttpUI/getLiveList?iGid=${class_id}&iPageNo=${page}&iPageSize=120`,
    );
    return data.vList.map((item: any) => ClassRoomsBase.fromHuya(item));
  } catch (error) {
    console.error("获取虎牙分类下的直播间失败", error);
    return null;
  }
}
