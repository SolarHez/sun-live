export interface HomeRoomsResponseDto {
  tCacheInfo?: TCacheInfo;
  vList?: VList[];
  iPageNo?: number;
  iPageSize?: number;
  iTotalPage?: number;
  iTotal?: number;
}

export interface TCacheInfo {
  iSourceType?: number;
  iUpdateTime?: number;
  iCurrentTime?: number;
  iDiffTime?: number;
}

export interface VList {
  lUid?: number;
  lYyid?: number;
  sNick?: string;
  iSex?: number;
  iLevel?: number;
  sAvatar180?: string;
  lProfileRoom?: number;
  sPrivateHost?: string;
  sProfileHomeHost?: string;
  iIsPlatinum?: number;
  lActivityId?: number;
  lActivityCount?: number;
  iGid?: number;
  iGameId?: number;
  sGameFullName?: string;
  sGameHostName?: string;
  iBussType?: number;
  lLiveId?: number;
  lChannel?: number;
  lLiveChannel?: number;
  lUserCount?: number;
  lTotalCount?: number;
  sRoomName?: SRoomName;
  sIntroduction?: string;
  sPreviewUrl?: string;
  iLiveSourceType?: number;
  iScreenType?: number;
  sScreenshot?: string;
  iIsSecret?: number;
  iCameraOpen?: number;
  iIsBluRay?: number;
  sBluRayMBitRate?: string;
  iBitRate?: number;
  lLiveCompatibleFlag?: number;
  iRecommendStatus?: number;
  sRecommendTagName?: string;
  iIsRoomPay?: number;
  sRoomPayTag?: string;
  iIsWatchTogetherVip?: number;
  iStartTime?: number;
  iTime?: number;
  iUpdateCacheTime?: number;
  mpCorner?: MpCorner;
  tImgRecInfo?: TImgRecInfo | null;
  iIsGaming?: number;
}

export interface MpCorner {
  ListPos1?: ListPos;
  ListPos2?: ListPos;
}

export interface ListPos {
  sContent?: string;
  sIcon?: string;
  sBackImage?: string;
}

export enum SRoomName {
  Empty = "",
  Wwe2026年度盛宴巅峰付费大赛 = "WWE2026年度盛宴巅峰付费大赛",
  凯伦威尔逊VS斯坦穆迪2026斯诺克世锦赛 = "凯伦·威尔逊VS斯坦·穆迪  2026斯诺克世锦赛",
  分享好音乐Ღ好音质 = "分享♬好音乐ღ好音质",
  吴宜泽Vs瓦菲2026斯诺克世锦赛八强赛 = "吴宜泽vs瓦菲  2026斯诺克世锦赛八强赛",
  国服后羿百星局养猪流带粉教学 = "国服后羿百星局养猪流带粉教学",
  大家好我曾小咸又回来啦 = "大家好 我曾小咸又回来啦",
  斯诺克精彩回看 = "斯诺克精彩回看",
  欢迎来到我的直播间 = "欢迎来到我的直播间",
  预告1日17点IGVsLNG德杯半决赛 = "【预告】1日17点iG vs LNG 德杯半决赛",
}

export interface TImgRecInfo {
  sType?: string;
  sValue?: string;
  sTypeDesc?: string;
}
