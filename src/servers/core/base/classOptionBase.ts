export class ClassOptionBase {
  cid2: number = 0; // 二级分类ID
  cname2: string = ""; // 二级分类名称
  icon: string = ""; // 二级分类图标
  desc: string = ""; // 二级分类描述
  hot: number = 0; // 二级分类热度
  platform: string = ""; // 二级分类平台

  static fromDouyu(raw: any) {
    const data = new ClassOptionBase();
    data.cid2 = raw.cid2;
    data.cname2 = raw.cname2;
    data.icon = raw.squareIconUrlW;
    data.desc = raw.cateDesc;
    data.hot = raw.hn;
    data.platform = "douyu";
    return data;
  }

  static fromHuya(raw: any) {
    const data = new ClassOptionBase();
    data.cid2 = raw.gid;
    data.cname2 = raw.gameFullName;
    data.icon = `https://huyaimg.msstatic.com/cdnimage/game/${raw.gid}-MS.png`;
    data.desc = raw.cateDesc;
    data.hot = raw.totalCount;
    data.platform = "huya";
    return data;
  }
}
