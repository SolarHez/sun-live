import { RoomInfo } from "../types/douyu/searchRoom.type";
import { Doc } from "../types/huya/searchRoom.type";

export class SearchRoomBase {
  avatar: string = ""; // 主播头像
  bkUrl: string = ""; // 直播间URL地址
  cat: string = ""; // 直播间分类
  des: string = ""; // 主播描述
  fans: number = 0; // 主播粉丝数
  appUrl: string = ""; // 主播直播间App唤起URL地址
  isLive: boolean = false; // 是否直播中
  isLoop: boolean = false; // 是否循环直播
  nickName: string = ""; // 主播昵称
  rid: number = 0; // 直播间ID
  pic: string = ""; // 直播间封面
  tag: string[] | string = ""; // 直播间标签
  platform: string = ""; // 平台类型

  static fromDouyu(raw: RoomInfo) {
    const dto = new SearchRoomBase();
    dto.avatar = raw?.avatar || "";
    dto.cat = raw?.cateName || "";
    dto.des = raw?.description || "";
    dto.fans = raw?.fansNum || 0;
    dto.isLive = raw?.isLive === 1 ? true : false;
    dto.isLoop = raw?.isLoop === 1 ? true : false;
    dto.nickName = raw?.nickName || "";
    dto.rid = Number(raw?.rid || 0);
    dto.pic = raw?.roomSrc || "";
    dto.tag = raw?.tag || "";
    dto.platform = "douyu";
    return dto;
  }

  static fromHuya(raw: Doc) {
    const dto = new SearchRoomBase();
    dto.avatar = raw.game_avatarUrl180 || raw.game_imgUrl || "";
    dto.bkUrl = raw.game_liveLink || "";
    dto.cat = raw.rec_game_name || raw.gameName || "";
    dto.des = raw.live_intro || raw.game_introduction || "";
    dto.fans = raw.game_activityCount || 0;
    dto.appUrl = raw.game_profileLink || "";
    dto.isLive = raw.gameLiveOn ? true : false;
    dto.isLoop = false;
    dto.nickName = raw.game_nick || "";
    dto.rid = Number(raw.room_id || 0);
    dto.pic = raw.game_screenshot || "";
    dto.tag = raw.game_name || "";
    dto.platform = "huya";
    return dto;
  }
}
