import axios from "axios";
import { LeftNavCateList } from "../../types/douyu/classOption.type";
import { ClassOptionBase } from "../../base/classOptionBase";

export async function getClassOption() {
  try {
    const { data } = await axios.get(
      `https://www.douyu.com/japi/weblist/apinc/newDirectory`,
    );
    const { cateList } = data?.data?.leftNavV2 || {};

    if (!cateList) return null;
    // 1. 预处理分类列表
    const filteredList = cateList.filter((item: any) => item.cn1 !== "正能量");
    // 2. 并发请求处理（增加错误容错）
    const requestsData = await Promise.all(
      filteredList.map(async (item: any) => {
        try {
          const { data } = await axios.get(
            `https://www.douyu.com/japi/weblist/apinc/getC2List`,
            {
              params: {
                shortName: item.cn1,
                customClassId: item.id,
                offset: 0,
                limit: 200,
              },
            },
          );
          return data;
        } catch (error) {
          // 单个请求失败不影响全局，返回 null
          console.error(`加载分类 [${item.cname}] 失败:`, error);
          return null;
        }
      }),
    );
    // 3. 组合数据并过滤无效结果
    return requestsData
      .map((res, index) => {
        const { list } = res?.data || {};
        if (!list) return null; // 过滤掉请求失败或数据为空的项

        return {
          cid: filteredList[index].id,
          cname: filteredList[index].cn1,
          list: list.map((live: LeftNavCateList) =>
            ClassOptionBase.fromDouyu(live),
          ),
        };
      })
      .filter(Boolean); // 移除 null 元素
  } catch (error) {
    console.error("获取斗鱼直播间分类失败", error);
    return null;
  }
}
