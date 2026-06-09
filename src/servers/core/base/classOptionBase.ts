import { LeftNavCateList } from "../types/douyu/classOption.type";

export class ClassOptionBase {
  cid: string = "0"; // 类别id
  cname: string = ""; // 类别名称

  static fromDouyu(raw: LeftNavCateList) {
    const data = new ClassOptionBase();
    data.cid = raw.id?.toString() || "0";
    data.cname = raw.cn1 || "";
    return data;
  }
}
