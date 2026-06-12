import followSql, { PlayerData } from "@/sql/sqliteFollow";

export const useFollowSql = () => {
  const handleAddFollow = async (item: PlayerData) => {
    if (!item.rid) {
      console.error("主播ID不能为空");
    }
    return await followSql.addFollow(item);
  };

  const handleRemoveFollow = async (item: PlayerData) => {
    if (!item.rid) {
      console.error("主播ID不能为空");
    }
    return await followSql.removeFollow(item);
  };

  const handleIsFollow = async (item: PlayerData) => {
    if (!item.rid) {
      console.error("主播ID不能为空");
    }
    return await followSql.isFollow(item);
  };

  const handleGetAllFollows = async () => {
    return await followSql.getAllFollows();
  };

  const handleAsyncSyncToSQL = async (freshList: PlayerData[]) => {
    return await followSql.asyncSyncToSQL(freshList);
  };

  return {
    handleAddFollow,
    handleRemoveFollow,
    handleIsFollow,
    handleGetAllFollows,
    handleAsyncSyncToSQL,
  };
};
