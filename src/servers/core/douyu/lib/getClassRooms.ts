import axios from "axios";
import { ClassRoomsBase } from "../../base/classRoomsBase";

export async function getClassRooms(class_id: string, page: number) {
  try {
    const { data } = await axios.get(
      `https://www.douyu.com/gapi/rknc/directory/mixListV1/2_${class_id}/${page}`,
    );
    const { rl } = data?.data || {};
    if (!rl) return null;
    return rl.map((item: any) => ClassRoomsBase.fromDouyu(item));
  } catch (error) {
    console.error("获取斗鱼分类下的直播间失败", error);
    return null;
  }
}
