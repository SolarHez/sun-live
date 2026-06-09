export interface SearchRoomResponseDto {
  data?: Data;
  error?: number;
  msg?: string;
}

export interface Data {
  recList?: RecList[];
}

export interface RecList {
  algorithm?: Algorithm;
  bkUrl?: string;
  kw?: string;
  roomInfo?: RoomInfo;
  schemeUrl?: string;
  type?: number;
  feedInfo?: FeedInfo;
  topicInfo?: TopicInfo;
}

export interface Algorithm {
  rt?: string;
  _recall_type?: string;
  _sta?: string;
}

export interface FeedInfo {
  feedId?: number;
  title?: string;
}

export interface RoomInfo {
  avatar?: string;
  bkUrl?: string;
  cateName?: string;
  cid?: number;
  desType?: number;
  desVersion?: string;
  description?: string;
  descriptionV2?: string;
  fansNum?: number;
  fansNumStr?: string;
  feedNum?: number;
  feedNumStr?: string;
  followerCount?: string;
  isLive?: number;
  isLoop?: number;
  isVertical?: number;
  lastShowTime?: number;
  nickName?: string;
  rid?: number;
  roomSrc?: string;
  roomType?: number;
  tag?: string;
  tid?: number;
  url?: string;
  videoSchemeUrl?: string;
  vipId?: number;
}

export interface TopicInfo {
  avatar?: string;
  discuss?: string;
  hotStr?: string;
  intro?: string;
  isAiTopic?: number;
  title?: string;
  topicId?: number;
  views?: string;
}
