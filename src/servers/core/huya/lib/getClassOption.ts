import axios from "axios";
import { ClassOptionBase } from "../../base/classOptionBase";

export async function getClassOption() {
  try {
    const typeData = [
      {
        cid: "1",
        cname: "网游竞技",
      },
      {
        cid: "2",
        cname: "单机热游",
      },
      {
        cid: "3",
        cname: "手游休闲",
      },
      {
        cid: "8",
        cname: "娱乐",
      },
    ];
    const requests = typeData.map((item) =>
      axios.get(
        `https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=${item.cid}`,
      ),
    );
    const requestsData = await Promise.all(requests).then((results) => {
      return results.map((result) => {
        return result.data.data;
      });
    });

    return requestsData.map((item, index: number) => {
      return {
        ...typeData[index],
        list: item.map((item: any) => ClassOptionBase.fromHuya(item)),
      };
    });
  } catch (error) {
    console.error("获取虎牙直播间分类失败", error);
    return null;
  }
}
