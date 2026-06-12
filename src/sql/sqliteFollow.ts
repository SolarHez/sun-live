import * as SQLite from "expo-sqlite";

export interface PlayerData {
  name?: string;
  rid?: number;
  title?: string;
  avatar?: string;
  pic?: string;
  hot?: number;
  cat?: string;
  label?: string;
  platform?: string;
  isLoop?: boolean;
  isLive?: boolean;
}

let dbInstance: any = null;
// 打开或创建数据库
async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("app_follow.db");
  }
  return dbInstance;
}

// 初始化表结构
async function initializeDatabase() {
  const db = await getDatabase();

  // 创建关注表（如果不存在的话）
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS follows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rid INTEGER UNIQUE NOT NULL, -- UNIQUE 确保同个主播不会被重复关注
      title TEXT NOT NULL,
      avatar TEXT,
      pic TEXT,
      hot INTEGER,
      cat TEXT,
      platform TEXT,
      isLoop BOOLEAN,
      isLive BOOLEAN,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("关注数据库初始化成功");
}

/**
 * 1. 添加关注
 */
async function addFollow(item: PlayerData) {
  const db = await getDatabase();
  try {
    if (!item.rid) {
      throw new Error("主播ID不能为空");
    }

    const result = await db.runAsync(
      `INSERT INTO follows (
            name, rid, title, avatar, pic, hot, cat, platform, isLoop, isLive
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(rid) DO UPDATE SET
            name = excluded.name,
            title = excluded.title,
            avatar = excluded.avatar,
            pic = excluded.pic,
            hot = excluded.hot,
            cat = excluded.cat,
            platform = excluded.platform,
            isLoop = excluded.isLoop,
            isLive = excluded.isLive;`, // 当 rid 冲突时，更新除 rid 以外的所有字段
      [
        item.name || "",
        item.rid || 0,
        item.title || "",
        item.avatar || "",
        item.pic || "",
        item.hot || 0,
        item.cat || "",
        item.platform || "",
        item.isLoop || false,
        item.isLive || false,
      ],
    );
    return result.lastInsertRowId; // 返回新插入行的 ID
  } catch (error) {
    console.error("添加关注失败:", error);
    throw error;
  }
}

/**
 * 2. 取消关注（根据 rid 删除）
 */
async function removeFollow(item: PlayerData) {
  const db = await getDatabase();
  try {
    if (!item.rid) {
      throw new Error("主播ID不能为空");
    }
    await db.runAsync("DELETE FROM follows WHERE rid = ?;", [item.rid]);
    return true;
  } catch (error) {
    console.error("取消收藏失败:", error);
    throw error;
  }
}

/**
 * 3. 检查某个内容是否已被关注
 * 用于前端 UI 切换“空心爱心”和“实心爱心”
 */
async function isFollow(item: PlayerData) {
  const db = await getDatabase();
  try {
    if (!item.rid) {
      throw new Error("主播ID不能为空");
    }
    const row = await db.getFirstAsync(
      "SELECT id FROM follows WHERE rid = ?;",
      [item.rid],
    );
    return row !== null; // 如果能查到数据，说明已收藏
  } catch (error) {
    console.error("检查收藏状态失败:", error);
    return false;
  }
}

/**
 * 4. 获取用户的所有关注列表
 */
async function getAllFollows() {
  const db = await getDatabase();
  try {
    const allRows = await db.getAllAsync(
      "SELECT * FROM follows ORDER BY created_at DESC;",
    );
    return allRows; // 返回一个包含所有收藏对象的数组
  } catch (error) {
    console.error("获取收藏列表失败:", error);
    return [];
  }
}

async function asyncSyncToSQL(freshList: any[]) {
  if (!freshList || !freshList.length) return;
  const db = await getDatabase();
  // 💡 不使用 async/await，不 return Promise
  // 让它作为火狐/谷歌引擎的后台微任务默默运行，绝对不卡顿前端 UI
  db.withTransactionAsync(async () => {
    for (const item of freshList) {
      if (!item.rid) continue; // 安全检查

      await db.runAsync(
        `INSERT INTO follows (
            name, rid, title, avatar, pic, hot, cat, platform, isLoop, isLive
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(rid) DO UPDATE SET
            name = excluded.name,
            title = excluded.title,
            avatar = excluded.avatar,
            pic = excluded.pic,
            hot = excluded.hot,
            cat = excluded.cat,
            platform = excluded.platform,
            isLoop = excluded.isLoop,
            isLive = excluded.isLive;`,
        [
          item.name || "",
          item.rid || "", // 💡 注意：房间号通常建议存 String，防大数溢出
          item.title || "",
          item.avatar || "",
          item.pic || "",
          Number(item.hot) || 0, // 💡 确保转成数字
          item.cat || "",
          item.platform || "",
          item.isLoop ? 1 : 0, // 💡 SQLite 避坑：布尔值处理
          item.isLive ? 1 : 0, // 💡 SQLite 避坑：布尔值处理
        ],
      );
    }
    console.log(`✨ 成功后台同步了 ${freshList.length} 条主播状态到 SQL`);
  }).catch((error: any) => {
    console.error("❌ 后台同步 SQL 事务失败:", error);
  });
}

const followSql = {
  initializeDatabase,
  addFollow,
  removeFollow,
  isFollow,
  getAllFollows,
  asyncSyncToSQL,
};

export default followSql;
