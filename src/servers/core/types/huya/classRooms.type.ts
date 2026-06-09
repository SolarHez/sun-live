export interface ClassRoomsResponseDto {
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
  sGameFullName?: SGameFullName;
  sGameHostName?: SGameHostName;
  iBussType?: number;
  lLiveId?: number;
  lChannel?: number;
  lLiveChannel?: number;
  lUserCount?: number;
  lTotalCount?: number;
  sRoomName?: string;
  sIntroduction?: string;
  sPreviewUrl?: string;
  iLiveSourceType?: number;
  iScreenType?: number;
  sScreenshot?: string;
  iIsSecret?: number;
  iCameraOpen?: number;
  iIsBluRay?: number;
  sBluRayMBitRate?: SBluRayMBitRate;
  iBitRate?: number;
  lLiveCompatibleFlag?: number;
  iRecommendStatus?: number;
  sRecommendTagName?: SRecommendTagName;
  iIsRoomPay?: number;
  sRoomPayTag?: string;
  iIsWatchTogetherVip?: number;
  iStartTime?: number;
  iTime?: number;
  iUpdateCacheTime?: number;
  mpCorner?: MpCorner;
  tImgRecInfo?: null;
  iIsGaming?: number;
}

export interface MpCorner {
  ListPos1?: ListPos;
  ListPos2?: ListPos;
}

export interface ListPos {
  sContent?: SRecommendTagName;
  sIcon?: string;
  sBackImage?: string;
}

export enum SRecommendTagName {
  Empty = "",
  乡野鱼获 = "乡野鱼获",
  战争冲突 = "战争冲突",
  热门作品 = "热门作品",
  白金偶像 = "白金偶像",
  白金精选 = "白金精选",
  虎牙官方 = "虎牙官方",
  视频美女 = "视频美女",
  魅力新星 = "魅力新星",
}

export enum SBluRayMBitRate {
  Empty = "",
  The10M = "10M",
  The14M = "14M",
  The4M = "4M",
  The6M = "6M",
  The8M = "8M",
}

export enum SGameFullName {
  户外 = "户外",
}

export enum SGameHostName {
  Huwai = "huwai",
}
