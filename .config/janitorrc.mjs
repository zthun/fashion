import {
  ZJanitorOptionsBuilder,
  ZJanitorOptionsLintBuilder,
} from "@zthun/janitor-options";

const lint = new ZJanitorOptionsLintBuilder()
  .esFile("*.{js,cjs,mjs,ts,mts,tsx,jsx}")
  .esFile("packages/**/src/**/*.{js,cjs,mjs,ts,mts,tsx,jsx}")
  .esFile(".config/*.{js,cjs,mjs,ts,mts,tsx,jsx}")
  .markdownFile("*.md")
  .markdownFile("packages/**/*.md")
  .jsonFile("*.json")
  .jsonFile("packages/**/*.json")
  .jsonFile(".config/*.json")
  .yamlFile("*.yml")
  .yamlFile(".circleci/config.yml")
  .excludeAll("**/CHANGELOG.md")
  .excludeAll("packages/**/dist/**")
  .excludeAll("packages/**/docs/**")
  .excludeAll("node_modules/**")
  .excludeAll("packages/**/node_modules/**")
  .excludeAll("package-lock.json")
  .excludeAll(".yarnrc.yml")
  .excludeAll("lerna.json")
  .excludeAll(".config/cspell.json")
  .generatePrettyFiles()
  .generateSpellingFiles()
  .build();

export default new ZJanitorOptionsBuilder().lint(lint).build();
