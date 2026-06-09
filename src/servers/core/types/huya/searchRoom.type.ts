export interface SearchRoomResponseDto {
  response?: { [key: string]: any[] | ResponseClass };
  responseHeader?: ResponseHeader;
}

export interface ResponseClass {
  docs?: Doc[];
  numFound?: number;
  start?: number;
}

export interface Doc {
  aid?: number;
  gameLiveOn?: boolean;
  game_activityCount?: number;
  game_avatarUrl180?: string;
  game_avatarUrl52?: string;
  game_channel?: number;
  game_id?: number;
  game_level?: number;
  game_liveLink?: string;
  game_longChannel?: number;
  game_name?: string;
  game_nick?: string;
  game_profileLink?: string;
  game_recommendStatus?: number;
  game_subChannel?: number;
  live_intro?: string;
  rec_game_name?: string;
  rec_live_time?: number;
  recommended_text?: string;
  room_id?: number;
  sTagName?: string;
  screen_type?: number;
  uid?: number;
  yyid?: number;
  gameId?: number;
  gameName?: string;
  game_imgUrl?: string;
  game_introduction?: string;
  game_privateHost?: string;
  game_roomName?: string;
  game_screenshot?: string;
  game_shortChannel?: number;
  game_total_count?: number;
  liveSourceType?: string;
  tag_name?: string;
  cover?: string;
  play_sum?: number;
  title?: string;
  uptime?: string;
  url?: string;
  user_avatar?: string;
  user_id?: number;
  user_nickname?: string;
  vid?: number;
  guild_id?: number;
  guild_name?: string;
}

export interface ResponseHeader {
  QTime?: number;
  status?: number;
}
