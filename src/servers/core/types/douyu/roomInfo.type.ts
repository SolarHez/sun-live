export interface RoomInfoResponseDto {
  room_gg?: RoomGg;
  video_links?: VideoLink[];
  is_newbie?: number;
  near_show_time?: NearShowTime;
  launch_remind?: LaunchRemind;
  cache_time?: number;
  black?: any[];
  can_send_gift?: string;
  video_title?: string;
  game?: GameClass;
  room?: Room;
  page_url?: string;
  cate_id?: number;
  share_swf_url?: string;
  qqLotterySwitch?: boolean;
  home_ad_info?: any[];
  VoddUploadUrl?: string;
  faceList?: string;
  swf_url?: string;
  ranking?: string;
  defaultRankName?: string;
  seo_info?: SEOInfo;
  isWeekListFristThree?: string;
  leftRecommend?: { [key: string]: string };
  hotCate?: any[];
  leftNav?: any[];
  hot_post_status?: string;
  hot_post_list?: PostList[];
  column?: Column;
  child_cate?: ChildCate;
  qqgroup?: Qqgroup;
  post_list?: PostList[];
  h5_guardJS?: any[];
  h5_default?: number;
  room_args?: RoomArgs;
  colligate?: Colligate;
  bind_vodCateUrl?: string;
  yzpk_cate2_id_list?: number[];
  var_is_yz?: boolean;
  var_yz_pk_name?: string;
  barrage_praise?: number;
  serviceSwitch?: ServiceSwitch;
  player_barrage?: number;
  staticWebconfHash?: StaticWebconfHash;
  barrage_timeout_downgrade?: number;
}

export interface ChildCate {
  url?: string;
  name?: string;
}

export interface Colligate {
  madelConfig?: { [key: string]: MadelConfig };
  activitySwitch?: ActivitySwitch;
  athena_switch?: { [key: string]: number };
  barrage_link?: BarrageLink;
  NobleSuspend?: number;
  userLevelSwitch?: number;
  gift_rocket_id?: number;
  pay_url?: string;
  show_ban_keywords?: number;
  webstarshow?: number;
}

export interface ActivitySwitch {
  alienPrivilege?: number;
  shark_kings?: number;
  doritos?: number;
  super_charge?: number;
  xmas_switch?: number;
  fishball_switch?: number;
  noble_one_year?: NobleOneYear;
  rangePromotion?: number;
  clubFightSwitch?: number;
  noble_newfeature_switch?: number;
}

export interface NobleOneYear {
  activity_switch?: number;
  recharge_switch?: number;
  pendant_switch?: number;
  remain_days?: number;
}

export interface BarrageLink {
  switch?: number;
  link_pre?: { [key: string]: string };
}

export interface MadelConfig {
  id?: string;
  mobile_img?: string;
  web_img?: string;
  name?: string;
  desc?: null | string;
  link?: string;
  act_ext?: number;
}

export interface Column {
  cate_id?: string;
  cate_name?: string;
  short_name?: string;
  orderdisplay?: string;
  is_relate?: string;
  is_del?: string;
  push_ios?: string;
  push_show?: string;
  push_vertical_screen?: string;
  push_nearby?: string;
  is_show_rank_list?: string;
  is_mobile_game?: string;
  is_audio?: string;
  create_time?: string;
  update_time?: string;
}

export interface GameClass {
  tag_id?: string;
  short_name?: ShortName;
  tag_name?: Name;
  tag_introduce?: string;
  pic_name?: string;
  pic_name2?: string;
  icon_name?: string;
  small_icon_name?: string;
  orderdisplay?: string;
  rank_score?: string;
  night_rank_score?: string;
  nums?: string;
  push_ios?: string;
  push_home?: string;
  is_game_cate?: string;
  cate_id?: string;
  is_del?: string;
  is_relate?: string;
  push_vertical_screen?: string;
  push_nearby?: string;
  push_qqapp?: string;
  broadcast_limit?: string;
  vodd_cateids?: VoddCateids;
  open_full_screen?: string;
  is_audio?: string;
  is_hidden?: string;
  is_ct1_hidden?: string;
  pic_url?: string;
  pic_url2?: string;
  url?: URL;
  icon_url?: string;
  small_icon_url?: string;
  count?: number;
  count_ios?: number;
  square_icon_url_w?: string;
  square_icon_url_m?: string;
  cate_template?: string;
}

export enum ShortName {
  CounterStrike = "CounterStrike",
  Hw = "HW",
  Lol = "LOL",
  TVgame = "TVgame",
}

export enum Name {
  Cs2 = "CS2",
  主机游戏 = "主机游戏",
  户外 = "户外",
  英雄联盟 = "英雄联盟",
}

export enum URL {
  GCounterStrike = "/g_CounterStrike",
  GHW = "/g_HW",
  GLOL = "/g_LOL",
  GTVgame = "/g_TVgame",
}

export enum VoddCateids {
  Empty = "",
  The161520 = "16,15,20",
  The2111 = "21,11",
  The541 = "5,41",
}

export interface PostList {
  title?: string;
  url?: string;
}

export interface LaunchRemind {
  room_id?: string;
  user_operate?: string;
  user_operate_time?: string;
  admin_operate?: string;
  admin_operate_time?: string;
  admin?: string;
  system_operate?: string;
  system_operate_time?: string;
}

export interface NearShowTime {
  id?: string;
  title?: string;
  room_id?: string;
  owner_name?: string;
  add_type?: string;
  op_name?: string;
  dateline?: string;
  show_time?: string;
}

export interface Qqgroup {
  is_show?: number;
  qqgroup_num?: number;
  qqgroup_url?: string;
}

export interface Room {
  is_diy?: string;
  pwd?: boolean;
  show_status?: number;
  room_src?: string;
  cate1_id?: string;
  is_multibit?: string;
  rst?: number;
  room_id?: number;
  status?: string;
  chat_level?: boolean;
  show_details?: string;
  avatar?: Avatar;
  wmt?: string;
  chat_cd_factor?: boolean;
  nickname?: string;
  owner_uid?: number;
  chat_age_limit?: boolean;
  cate2_id?: string;
  show_time?: number;
  cq?: boolean;
  show_id?: number;
  rs1?: string;
  chat_group?: boolean;
  room_name?: string;
  cate3_id?: string;
  live_url?: boolean;
  end_time?: string;
  cate_id?: number;
  child_id?: string;
  is_vr?: number;
  tags?: string;
  bgimg_src?: string;
  icon_id?: string;
  icon_start_time?: string;
  icon_end_time?: string;
  ver?: string;
  e_url?: string;
  fans_bn?: string;
  did?: string;
  client_sys?: string;
  close_notice?: string;
  close_notice_ctime?: string;
  close_notice_always?: string;
  live_client_type?: string;
  avatar_mid?: string;
  avatar_small?: string;
  iol?: number;
  cityname?: string;
  isvertival?: number;
  videoLoop?: number;
  share?: Share;
  speakSet?: SpeakSet;
  detailsData?: DetailsData;
  room_pic?: string;
  owner_name?: string;
  room_url?: string;
  isVertical?: number;
  is_video_high_quality_time?: number;
  video_high_quality_resolution?: string;
  video_high_quality_num?: string;
  can_send_gift?: string;
  yuba_jump_url?: string;
  room_label_right_flag?: number;
  is_set_fans_badge?: number;
  eticket?: any[];
  effectInfo?: any[];
  wab?: DetailsData;
  category_id?: string;
  giftActivity?: GiftActivity;
  isNzRoom?: number;
  cfmGiftList?: any[];
  isPubgmRoom?: number;
  rankActivity?: any[];
  nowtime?: number;
  nobleConfig?: { [key: string]: NobleConfig };
  second_lvl_name?: Name;
  stsign_room?: StsignRoom;
  emperorPush?: any[];
  levelInfo?: LevelInfo;
  is_show_rank_list?: string;
  giftTempId?: number;
  music?: Music;
  up_id?: string;
  ban_display?: number;
  vipId?: number;
  multirates?: Multirate[];
  is_password?: number;
  p2p_setting?: P2PSetting;
  is_high_game?: number;
  open_full_screen?: number;
  cate_limit?: CateLimit;
  defaultSrc?: string;
  coverSrc?: string;
  owner_avatar?: string;
  isDefaultAvatar?: number;
  room_idle?: RoomIdle;
  wsproxy?: any[];
  h5wsproxy?: any[];
  videop?: string;
  room_plugin?: string;
  officialAnchor?: OfficialAnchor;
  authInfo?: AuthInfo;
  authVersion?: string;
  officialCerts?: any[];
  isVip?: number;
  room_biz_all?: RoomBizAll;
  st?: number;
  simplifyBulletScreen?: SimplifyBulletScreen;
}

export interface AuthInfo {
  type?: number;
}

export interface Avatar {
  big?: string;
  middle?: string;
  small?: string;
}

export interface CateLimit {
  limit_type?: number;
  limit_num?: number;
  limit_threshold?: number;
  limit_time?: number;
}

export interface DetailsData {}

export interface GiftActivity {
  fold?: { [key: string]: null | string }[];
  unfold?: { [key: string]: null | string }[];
}

export interface LevelInfo {
  level?: string;
  upgrade_exp?: string;
  min_exp?: number;
  experience?: number;
  keep_exp?: string;
  exp_distance?: number;
  end_time?: string;
  exp_inc?: number;
  failed_cost_exp?: number;
  isMaxed?: boolean;
  next_level?: number;
  progress?: number;
  keep_progress?: number;
  isKeepTaskComp?: boolean;
}

export interface Multirate {
  name?: string;
  type?: number;
}

export interface Music {
  dm_st?: number;
  dm_um?: number;
  dm_sp?: number;
}

export interface NobleConfig {
  noble_name?: string;
  link_mike?: number;
  noble_gift?: number;
  noble_barrage?: number;
  into_room_hide?: number;
  top_list_hide?: number;
  avoid_ban_speaking?: number;
  super_admin_helper?: number;
  customize_gift?: number;
  recommend_anchor?: number;
  symbol?: Symbol;
}

export interface Symbol {
  name?: string;
  hover_tips?: string;
  web_symbol_pic1?: string;
  web_symbol_pic2?: string;
  web_symbol_pic4?: string;
}

export interface OfficialAnchor {
  ioa?: number;
}

export interface P2PSetting {
  plan_id?: number;
  name_id?: number;
  w_dm?: number;
  m_dm?: number;
  player?: number;
  online_limit?: number;
}

export interface RoomBizAll {
  clubOrgmask?: string;
  clubOrgName?: string;
  tencentIdent?: number;
  hot?: string;
  isvertical?: number;
  cityname?: string;
  anchorFriendTotal?: number;
  clubRoomLabel?: string;
  videoLoop?: number;
  anchorVisibleHonorScore?: number;
}

export interface RoomIdle {
  active?: number;
  minute_limit?: number;
}

export interface Share {
  video?: string;
  flash?: string;
  common?: string;
}

export interface SimplifyBulletScreen {
  condition?: Condition;
  rule?: Rule;
  levList?: LevList[];
}

export interface Condition {
  minNum?: number;
}

export interface LevList {
  level?: number;
  percent?: number;
}

export interface Rule {
  level?: number;
  percent?: number;
  maxNum?: number;
  modelMaxNum?: number;
}

export interface SpeakSet {
  speaklimit?: number;
  speakLv?: boolean;
  onlyAdmin?: boolean;
  speakCd?: boolean;
}

export interface StsignRoom {
  state?: State;
  ctime?: string;
}

export interface State {
  mobile?: number;
  yzxx?: number;
}

export interface RoomArgs {
  rpc_switch?: number;
  no_home?: number;
  no_home_time?: string;
  live_url?: number;
  res_path?: string;
  server_config?: string;
  swf_url?: string;
}

export interface RoomGg {
  show?: string;
  status?: number;
  pass?: boolean;
  verify?: string;
}

export interface SEOInfo {
  seo_title?: string;
  seo_keyword?: string;
  seo_description?: string;
}

export interface ServiceSwitch {
  fastBarrage?: number;
  barrageReply?: number;
  offLineFriendRec?: number;
  barrageFeed?: number;
}

export interface StaticWebconfHash {
  wenxue?: string;
}

export interface VideoLink {
  id?: string;
  video_name?: string;
  cate_id?: string;
  pic_path?: string;
  link_url?: string;
  room_id?: string;
  pubdate?: string;
  dateline?: string;
  op_uid?: string;
  recommend?: string;
  pic_url?: string;
  game?: any[] | GameClass;
}
