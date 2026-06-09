import axios from "axios";
import { SearchRoomBase } from "../../base/searchRoomBase";

export async function searchRoom(wd: string) {
  try {
    const { data } = await axios.get(
      `https://search.cdn.huya.com/?q=${wd}&m=Search&do=getSearchContent&uid=0&v=4&typ=-5&livestate=0&rows=5&start=0`,
    );
    if (!data?.response) return [];
    const user = data?.response[1].docs || [];
    const room = data?.response[3].docs || [];
    if (!room.length && !user.length) return [];
    const mergedMap = new Map();

    // 将两个数组合并为一个待处理数组
    const combinedRaw = [...room, ...user];

    combinedRaw.forEach((item) => {
      const id = item.room_id; // 或者 item.rid，取决于你的数据主键
      if (!id) return;

      if (mergedMap.has(id)) {
        // 如果已存在，则进行属性合并（更新）
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const existing = mergedMap.get(id);
        mergedMap.set(id, { ...item, ...existing });
      } else {
        // 如果不存在，直接添加
        mergedMap.set(id, { ...item });
      }
    });

    return Array.from(mergedMap.values()).map((item) =>
      SearchRoomBase.fromHuya(item),
    );
  } catch (error) {
    console.error("搜索虎牙直播间失败", error);
    return null;
  }
}
