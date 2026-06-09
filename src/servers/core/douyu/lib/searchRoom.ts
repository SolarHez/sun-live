import axios from "axios";
import { SearchRoomBase } from "../../base/searchRoomBase";

export async function searchRoom(wd: string) {
  try {
    const { data } = await axios.get(
      `https://apiv2.douyucdn.cn/japi/search/api/getSearchRecV2?ab_cw=NEWCATEN&client_sys=ios&kw=${wd}&tagTest=a&version=1`,
    );
    const { recList } = data?.data || {};
    if (!recList) return null;
    return recList
      ?.map((item: any) => {
        if (!item?.roomInfo) return;
        return SearchRoomBase.fromDouyu(item.roomInfo);
      })
      .filter((item: any) => item !== undefined);
  } catch (error) {
    console.error("搜索斗鱼直播间失败", error);
    return null;
  }
}
