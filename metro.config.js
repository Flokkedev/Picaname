const { getDefaultConfig } = require("@expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    ...defaultConfig.resolver,

    // Tar bort EventEmitter från blocklist och säkerställer rätt väg
    blockList: exclusionList([]),

    // Se till att rätt React Native-version används
    extraNodeModules: {
      "react-native": path.resolve(__dirname, "node_modules/react-native"),
      "react-native-svg-transformer": require.resolve(
        "react-native-svg-transformer"
      ),
    },

    // Lägg till stöd för extra filändelser
    assetExts: defaultConfig.resolver.assetExts.filter(
      (ext) => ext !== "svg"
    ),
    sourceExts: [
      ...defaultConfig.resolver.sourceExts,
      "svg",
      "ts",
      "tsx",
      "js",
      "jsx",
    ],
  },

  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve(
      "metro-react-native-babel-transformer"
    ),
  },
};

module.exports = config;
