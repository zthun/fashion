import {
  ZViteConfigBuilder,
  ZViteTestBuilder,
} from "@zthun/janitor-build-config/vite";
import { defineConfig } from "vite";

const test = new ZViteTestBuilder().browser().istanbul().monorepo().build();
export default defineConfig(new ZViteConfigBuilder().test(test).build());
