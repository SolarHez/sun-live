import axios from "axios";
import { PlayUrlBase } from "../../base/playUrlBase";
import { get_douyu_sgin } from "../utils/douyu-sgin.util";

export async function getPlayUrl(room_id: number) {
  try {
    const { data: scriptData } = await axios.get(
      `https://www.douyu.com/swf_api/homeH5Enc?rids=${room_id}`,
    );
    const scriptJsContent = scriptData?.data?.[`room${room_id}`] as string;
    const sgin = await get_douyu_sgin(scriptJsContent, room_id);
    //sgin += `&cdn=&rate=-1&ver=Douyu_223061205&iar=1&ive=1&hevc=0&fa=0`;
    const { data } = await axios.post(
      `https://www.douyu.com/lapi/live/getH5Play/${room_id}`,
      sgin,
      {
        headers: {
          referer: `https://www.douyu.com/${room_id}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return PlayUrlBase.fromDouyu(data.data);
  } catch (error) {
    console.error("获取斗鱼直播间播放地址失败", error);
    return null;
  }
}
