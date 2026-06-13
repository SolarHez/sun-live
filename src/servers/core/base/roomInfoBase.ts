import { Room } from "../types/douyu/roomInfo.type";
import { Data } from "../types/huya/roomInfo.type";

export class RoomInfoBase {
  name: string = ""; // 直播间名称
  rid: number = 0; // 直播间 ID
  title: string = ""; // 直播间标题
  avatar: string = ""; // 直播间头像
  stime: number = 0; // 直播开始时间
  etime: number = 0; // 直播结束时间
  pic: string = ""; // 直播间封面
  platform: string = ""; // 直播平台
  yyid: number = 0; // 虎牙直播间 签名ID
  lChannelId: number = 0; // 虎牙直播间 签名ID
  lSubChannelId: number = 0; // 虎牙直播间 签名ID
  uid: number = 0; // 虎牙直播间 签名ID
  isLoop: boolean = false; // 是否循环
  isLive: boolean = false; // 是否直播

  static fromDouyu(raw: Room) {
    const dto = new RoomInfoBase();
    dto.name = raw.nickname || "";
    dto.rid = Number(raw.room_id || 0);
    dto.title = raw.room_name || "";
    dto.avatar = raw.avatar_mid || "";
    dto.stime = Number(raw.show_time || 0);
    dto.etime = Number(raw.end_time) || Math.floor(Date.now() / 1000);
    dto.pic = raw.room_pic || "";
    dto.isLoop = raw.videoLoop === 1 ? true : false;
    dto.isLive = raw.show_status === 1 ? true : false;
    dto.platform = "douyu";
    return dto;
  }

  static fromHuya(raw: Data) {
    const liveData = raw.liveData;
    const dto = new RoomInfoBase();
    dto.name = liveData?.nick || "";
    dto.rid = Number(liveData?.profileRoom);
    dto.title = liveData?.introduction || "";
    dto.avatar = liveData?.avatar180 || "";
    dto.stime = liveData?.startTime || 0;
    dto.etime = Math.floor(Date.now() / 1000);
    dto.pic = liveData?.screenshot || "";
    dto.isLoop = raw.realLiveStatus === "REPLAY" ? true : false;
    dto.isLive = raw.realLiveStatus === "ON" ? true : false;
    dto.platform = "huya";
    return dto;
  }

  static fromHuyaUid(raw: Data) {
    const liveData = raw.liveData;
    const dto = {
      yyid: 0,
      uid: 0,
      lChannelId: 0,
      lSubChannelId: 0,
      platform: "",
    };
    dto.yyid = liveData?.yyid || 0;
    dto.uid = liveData?.uid || 0;
    dto.lChannelId = liveData?.channel || 0;
    dto.lSubChannelId = liveData?.liveChannel || 0;
    dto.platform = "huya";
    return dto;
  }
}
