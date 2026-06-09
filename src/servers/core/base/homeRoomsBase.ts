import { Rl } from "../types/douyu/homeRooms.type";
import { VList } from "../types/huya/homeRooms.type";

export class HomeRoomsBase {
  name: string = ""; // 房间名
  rid: number = 0; // 房间id
  title: string = ""; // 房间标题
  avatar: string = ""; // 头像
  pic: string = ""; // 封面
  hot: number = 0; // 热度
  cat: string = ""; // 分类
  label: string[] | string = []; // 标签
  platform: string = ""; // 平台
  isLoop: boolean = false; // 是否循环
  isLive: boolean = false; // 是否直播

  static fromDouyu(raw: Rl) {
    const dto = new HomeRoomsBase();
    dto.name = raw.nn || "";
    dto.rid = Number(raw.rid || 0);
    dto.title = raw.rn || "";
    dto.avatar = raw.av || "";
    dto.pic = raw.rs16 || "";
    dto.hot = raw.ol || 0;
    dto.cat = raw.c2name || "";
    dto.label = raw.roomLabel || "";
    dto.platform = "douyu";
    dto.isLoop = raw.rsst === 3005 ? true : false;
    dto.isLive = true;
    return dto;
  }

  static fromHuya(raw: VList) {
    const dto = new HomeRoomsBase();
    dto.name = raw?.sNick || "";
    dto.rid = Number(raw.lProfileRoom);
    dto.title = raw.sIntroduction || "";
    dto.avatar = raw.sAvatar180 || "";
    dto.pic = raw.sScreenshot || "";
    dto.hot = raw.lActivityCount || 0;
    dto.cat = raw.sGameFullName || "";
    dto.label = raw.sRecommendTagName || "";
    dto.platform = "huya";
    dto.isLoop = false;
    dto.isLive = true;
    return dto;
  }
}
