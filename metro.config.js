const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 配置重定向，将 Node 模块指向对应的浏览器/RN兼容实现
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules, // 这一行很关键
  buffer: require.resolve("buffer"),
  assert: require.resolve("assert/"),
  util: require.resolve("util/"),
  stream: require.resolve("stream-browserify"),
  buffer: require.resolve("buffer/"),
  process: require.resolve("process/browser"),
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
