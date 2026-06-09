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

  // 写回 package.json（纯文件写入，不触发任何 npm/git 校验）
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`\n⚙️ [Auto Bump] package.json 已自动升级至: ${pkg.version}`);

  // 🌟 2. 同步修改 app.json (Expo 配置)
  const appJsonPath = path.resolve(__dirname, "../app.json");
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf-8"));
    if (appJson.expo) {
      appJson.expo.version = pkg.version;

      // 顺手让 Android 的 versionCode 和 iOS 的 buildNumber 自增
      if (
        appJson.expo.android &&
        typeof appJson.expo.android.versionCode === "number"
      ) {
        appJson.expo.android.versionCode += 1;
      }
      if (appJson.expo.ios && appJson.expo.ios.buildNumber) {
        appJson.expo.ios.buildNumber = (
          parseInt(appJson.expo.ios.buildNumber, 10) + 1
        ).toString();
      }

      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + "\n");
      console.log(`⚙️ [Auto Bump] Expo app.json 已完美同步！`);
    }
  }
} else {
  console.error("❌ 未找到 package.json，请检查脚本放置的路径！");
}
