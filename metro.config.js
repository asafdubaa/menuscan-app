const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Disable caching to prevent deserialization errors
config.cacheStores = [];

// Limit the number of files to watch to prevent EMFILE errors
config.watchFolders = [__dirname].filter(
  (folder) => !folder.includes("node_modules"),
);

// Add maxWorkers to prevent too many open files
config.maxWorkers = 2;

module.exports = withNativeWind(config, { input: "./global.css" });
