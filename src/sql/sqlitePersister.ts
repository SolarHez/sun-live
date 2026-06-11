// sqlitePersister.ts
import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { openDatabaseSync } from "expo-sqlite";

// 1. 初始化数据库
const db = openDatabaseSync("app_cache_v3.db");

// 2. 创建高性能单条缓存表
db.execSync(`
  CREATE TABLE IF NOT EXISTS react_query_cache (
    queryHash TEXT PRIMARY KEY,
    clientState TEXT,
    updatedAt INTEGER
  );
`);

export const createSQLitePersister = (): Persister => {
  return {
    // 写入缓存：注意这里需要通过 client.clientState.queries 来访问
    persistClient: async (client: PersistedClient) => {
      try {
        const timestamp = Date.now();
        const queries = client.clientState?.queries || [];

        // 开启 SQLite 事务进行高效批量写入
        db.withTransactionSync(() => {
          queries.forEach((query) => {
            const queryHash = query.queryHash;
            const clientState = JSON.stringify(query);

            db.runSync(
              `INSERT OR REPLACE INTO react_query_cache (queryHash, clientState, updatedAt) 
               VALUES (?, ?, ?);`,
              [queryHash, clientState, timestamp],
            );
          });
        });
      } catch (error) {
        console.error("❌ 持久化缓存到 SQLite 失败:", error);
      }
    },

    // 读取缓存：组装回完整的 PersistedClient 结构
    restoreClient: async () => {
      try {
        const rows = db.getAllSync<{ queryHash: string; clientState: string }>(
          "SELECT queryHash, clientState FROM react_query_cache;",
        );

        if (!rows || rows.length === 0) return undefined;

        // 还原单条的 queries
        const queries = rows.map((row) => JSON.parse(row.clientState));

        // 💡 严格遵循 PersistedClient 要求的格式返回
        return {
          timestamp: Date.now(),
          buster: "",
          clientState: {
            queries,
            mutations: [], // 如果没有实现离线 mutation，这里保持空数组即可
          },
        } as PersistedClient;
      } catch (error) {
        console.error("❌ 从 SQLite 恢复缓存失败:", error);
        return undefined;
      }
    },

    // 清除缓存
    removeClient: async () => {
      try {
        db.runSync("DELETE FROM react_query_cache;");
      } catch (error) {
        console.error("❌ 清空 SQLite 缓存失败:", error);
      }
    },
  };
};
