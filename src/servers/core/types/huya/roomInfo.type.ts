export interface RoomInfoResponseDto {
  status?: number;
  message?: string;
  data?: Data;
}

export interface Data {
  liveStatus?: string;
  profileInfo?: ProfileInfo;
  liveData?: LiveData;
  chTopId?: number;
  subChId?: number;
  welcomeText?: string;
  roomPay?: any[];
  isRoomPay?: boolean;
  realLiveStatus?: string;
}

export interface LiveData {
  yyid?: number;
  uid?: number;
  privateHost?: string;
  aid?: number;
  profileRoom?: number;
  activityCount?: number;
  avatar180?: string;
  nick?: string;
  sex?: number;
  activityId?: number;
  level?: number;
  profileHomeHost?: string;
  gid?: number;
  gameFullName?: string;
  gameHostName?: string;
  gameType?: null;
  bussType?: number;
  liveId?: number;
  channel?: number;
  liveChannel?: number;
  shortChannel?: string;
  totalCount?: number;
  startTime?: number;
  endTime?: number;
  attendeeCount?: number;
  screenshot?: string;
  introduction?: string;
  roomName?: string;
  isSecret?: number;
  cameraOpen?: number;
  recommendStatus?: string;
  liveSourceType?: number;
  screenType?: number;
  bitRate?: number;
  hls?: string;
  hlsUrl?: string;
  videoSyncTime?: number;
  updateCacheTime?: number;
}

export interface ProfileInfo {
  uid?: number;
  yyid?: number;
  nick?: string;
  avatar180?: string;
  activityId?: number;
  activityCount?: number;
  privateHost?: string;
  profileRoom?: number;
}
