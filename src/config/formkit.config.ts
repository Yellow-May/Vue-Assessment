// formkit.config.ts
import { defaultConfig } from "@formkit/vue";
import { genesisIcons } from "@formkit/icons";
import { rootClasses } from "../../formkit.theme";

const file_size_rule = function (node: any) {
  return node.value[0].file.size <= 2048 * 1000;
};

export default defaultConfig({
  config: {
    rootClasses,
  },
  icons: genesisIcons,
  plugins: [],
  rules: { file_size_rule },
});
