import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌟 1. 找到项目根目录下的 package.json
const pkgPath = path.resolve(__dirname, "../package.json");

if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

  // 将版本号最后一位加 1 (例如 1.4.1 -> 1.4.2)
  const versionParts = pkg.version.split(".").map(Number);
  versionParts[2] += 1;
  pkg.version = versionParts.join(".");

  // 同步修改 app.json (Expo 配置)
  const appJsonPath = path.resolve(__dirname, "../app.json");
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf-8"));
    if (appJson.expo) {
      appJson.expo.version = pkg.version;
      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + "\n");
      console.log(`⚙️ [Auto Bump] Expo app.json 已完美同步！`);
    }
  }
} else {
  console.error("❌ 未找到 package.json，请检查脚本放置的路径！");
}
