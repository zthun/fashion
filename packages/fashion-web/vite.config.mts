import {
  ZViteConfigBuilder,
  ZViteServerBuilder,
} from "@zthun/janitor-build-config/vite";
import { defineConfig } from "vite";

const server = new ZViteServerBuilder().dev().build();
const config = new ZViteConfigBuilder().react().server(server).build();

config.resolve = {
  alias: {
    lodash: "lodash-es",
  },
};

export default defineConfig(config);
