export interface ClassOptionResponseDto {
  error?: number;
  msg?: string;
  data?: Data;
  redirectUrl?: null;
}

export interface Data {
  seoKeyword?: string;
  cate1Name?: string;
  wcAbVer?: string;
  leftNavV2?: LeftNavV2;
  activeCate1Id?: number;
  seoDescription?: string;
  isShowFirstCategory?: number;
  firstCategory?: FirstCategory[];
  baseRecommendCategory?: Category[];
  seoTitle?: string;
  listType?: string;
  myCategory?: Category[];
  leftNav?: LeftNav;
  currentCate1Name?: string;
  shortName?: string;
  shortCategory?: any[];
}

export interface Category {
  cate1Id?: number;
  cate2Id?: number;
  cate2Name?: string;
  cate2ShortName?: null;
  cate2Url?: string;
  cate2Icon?: string;
  hot?: number | null;
  isRec?: number;
  isDisplay?: number;
  isShowRec?: number | null;
  count?: number;
}

export interface FirstCategory {
  cate1Name?: string;
  secondCategory?: SecondCategory[];
  customClassId?: number;
  isHideZero?: number;
  shortName?: string;
  cate1Id?: number;
}

export interface SecondCategory {
  cate2Name?: string;
  cate2Icon?: string;
  cate2Url?: string;
  customClassId?: number;
  count?: number;
  dot?: Dot;
  hot?: number;
  cate1Id?: number;
  cate2Id?: number;
  isDisplay?: number;
}

export interface Dot {
  _rt_source?: string;
  _sub_rt?: string;
  _rpos?: string;
  _rt?: string;
  _rt_sub_source?: string;
}

export interface LeftNav {
  link?: Link;
  cateList?: LeftNavCateList[];
}

export interface LeftNavCateList {
  id?: number;
  name?: string;
  stn1?: string;
  cn1?: string;
  relId?: number;
  list?: PurpleList[];
}

export interface PurpleList {
  cid2?: number;
  cn2?: string;
  stn2?: string;
  url?: string;
  cid1?: string;
}

export interface Link {
  playlistUrl?: string;
  followUrl?: string;
  matchUrl?: string;
  cloudGameUrl?: string;
  rankUrl?: string;
  webGameUrl?: string;
}

export interface LeftNavV2 {
  cateList?: LeftNavV2CateList[];
  matchList?: MatchList[];
}

export interface LeftNavV2CateList {
  id?: number;
  stn1?: string;
  cn1?: string;
  relId?: number;
  isCate1?: number;
  list?: FluffyList[];
}

export interface FluffyList {
  cid2?: number;
  cn2?: string;
  stn2?: string;
  url?: string;
  cid1?: number;
}

export interface MatchList {
  leagueId?: number;
  matchName?: string;
  subTitle?: string;
  jumpRid?: number;
  matchStatus?: number;
  matchId?: number;
}
