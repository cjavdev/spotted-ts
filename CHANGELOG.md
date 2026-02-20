# Changelog

## 0.22.1 (2026-02-20)

Full Changelog: [v0.22.0...v0.22.1](https://github.com/cjavdev/spotted-ts/compare/v0.22.0...v0.22.1)

### Bug Fixes

* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([b604ad0](https://github.com/cjavdev/spotted-ts/commit/b604ad0fa7f96cfda6330f0afee5763e9f51d0e1))


### Chores

* **internal/client:** fix form-urlencoded requests ([818ad80](https://github.com/cjavdev/spotted-ts/commit/818ad80736f50ea28b5a51b5464d44b80276fe9d))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([e296ddf](https://github.com/cjavdev/spotted-ts/commit/e296ddf3287d38bd79f75d1e494d76b8b44a6375))
* **internal:** cache fetch instruction calls in MCP server ([3aa9991](https://github.com/cjavdev/spotted-ts/commit/3aa99915b010959d1b300c1410cce7189fcd5586))
* **internal:** improve layout of generated MCP server files ([d2ddbc1](https://github.com/cjavdev/spotted-ts/commit/d2ddbc1faaf192762cbd36ad5a96b9ac3d160d41))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([3e6b66f](https://github.com/cjavdev/spotted-ts/commit/3e6b66f4b5a8d4d153b7962891fb11d9812d3528))

## 0.22.0 (2026-02-14)

Full Changelog: [v0.21.0...v0.22.0](https://github.com/cjavdev/spotted-ts/compare/v0.21.0...v0.22.0)

### Features

* **api:** api update ([9241a8c](https://github.com/cjavdev/spotted-ts/commit/9241a8c3f0572bbe7d02774b05a29e03e6a61a7a))


### Chores

* **internal:** avoid type checking errors with ts-reset ([7dc964a](https://github.com/cjavdev/spotted-ts/commit/7dc964a5e37628c2ed41153590f66b2808d6a70a))

## 0.21.0 (2026-02-12)

Full Changelog: [v0.20.0...v0.21.0](https://github.com/cjavdev/spotted-ts/compare/v0.20.0...v0.21.0)

### Features

* **api:** api update ([d8b3d9f](https://github.com/cjavdev/spotted-ts/commit/d8b3d9f7499ea4853de40dbdd9efe51244c85d41))


### Chores

* **internal:** allow basic filtering of methods allowed for MCP code mode ([9876205](https://github.com/cjavdev/spotted-ts/commit/9876205501a7a205097eb764720507f662aece65))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([0abb6b8](https://github.com/cjavdev/spotted-ts/commit/0abb6b8e7f95762abdeb09eea0208d8bc3ca1a20))

## 0.20.0 (2026-02-10)

Full Changelog: [v0.19.0...v0.20.0](https://github.com/cjavdev/spotted-ts/compare/v0.19.0...v0.20.0)

### Features

* **api:** api update ([e100303](https://github.com/cjavdev/spotted-ts/commit/e100303edadf32a665800149fcaac98342d29c63))

## 0.19.0 (2026-02-08)

Full Changelog: [v0.18.1...v0.19.0](https://github.com/cjavdev/spotted-ts/compare/v0.18.1...v0.19.0)

### Features

* **api:** api update ([d2fdf9e](https://github.com/cjavdev/spotted-ts/commit/d2fdf9ee996ac0cbefaa08b9c6a3f3c010559117))


### Chores

* **internal:** add health check to MCP server when running in HTTP mode ([8c72cee](https://github.com/cjavdev/spotted-ts/commit/8c72cee038f2b2866e456385d0646f1d9a903966))

## 0.18.1 (2026-02-06)

Full Changelog: [v0.18.0...v0.18.1](https://github.com/cjavdev/spotted-ts/compare/v0.18.0...v0.18.1)

### Bug Fixes

* **client:** avoid removing abort listener too early ([165b23f](https://github.com/cjavdev/spotted-ts/commit/165b23f176c547d0c060d3fb145c0b8ab66ade58))


### Chores

* **internal:** fix pagination internals not accepting option promises ([934fc0d](https://github.com/cjavdev/spotted-ts/commit/934fc0d6b52b3bc5c09de31c173db68420a8cff7))

## 0.18.0 (2026-02-05)

Full Changelog: [v0.17.7...v0.18.0](https://github.com/cjavdev/spotted-ts/compare/v0.17.7...v0.18.0)

### Features

* **mcp:** add initial server instructions ([07226c0](https://github.com/cjavdev/spotted-ts/commit/07226c036c6967095684ab643589c02692a800dd))


### Chores

* **client:** do not parse responses with empty content-length ([dd4ae3c](https://github.com/cjavdev/spotted-ts/commit/dd4ae3ca6f389751be0c7faa84e28e03dc6b4d22))
* **client:** restructure abort controller binding ([a6395d8](https://github.com/cjavdev/spotted-ts/commit/a6395d8a02cbf2853c6a01df7dc6eda002d70454))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([fe33ba1](https://github.com/cjavdev/spotted-ts/commit/fe33ba190f7869df4cfb5d4037c2de50b3848246))
* **internal:** support oauth authorization code flow for MCP servers ([7a7405b](https://github.com/cjavdev/spotted-ts/commit/7a7405bb1b347b92b982e33243705bd6c0838128))

## 0.17.7 (2026-02-03)

Full Changelog: [v0.17.6...v0.17.7](https://github.com/cjavdev/spotted-ts/compare/v0.17.6...v0.17.7)

### Bug Fixes

* **client:** avoid memory leak with abort signals ([8227150](https://github.com/cjavdev/spotted-ts/commit/8227150b501efd3cf42be66069339104648b8794))


### Chores

* update SDK settings ([65d04af](https://github.com/cjavdev/spotted-ts/commit/65d04af8b9dd884a14ab25c8993f06bfbaf992c5))

## 0.17.6 (2026-01-29)

Full Changelog: [v0.17.5...v0.17.6](https://github.com/cjavdev/spotted-ts/compare/v0.17.5...v0.17.6)

### Chores

* **mcp:** up tsconfig lib version to es2022 ([9356873](https://github.com/cjavdev/spotted-ts/commit/93568736fcd87ae4835c334b590573ff02a6e6ca))

## 0.17.5 (2026-01-29)

Full Changelog: [v0.17.4...v0.17.5](https://github.com/cjavdev/spotted-ts/compare/v0.17.4...v0.17.5)

### Bug Fixes

* **docs:** fix mcp installation instructions for remote servers ([3b17492](https://github.com/cjavdev/spotted-ts/commit/3b17492ae7e3609b90a06c993bbdd6c3af601777))

## 0.17.4 (2026-01-28)

Full Changelog: [v0.17.3...v0.17.4](https://github.com/cjavdev/spotted-ts/compare/v0.17.3...v0.17.4)

### Bug Fixes

* **mcp:** allow falling back for required env variables ([a0acf48](https://github.com/cjavdev/spotted-ts/commit/a0acf487592cddbe44efdf61aa7b19d3b088c4a3))


### Chores

* **ci:** upgrade `actions/github-script` ([6d30f73](https://github.com/cjavdev/spotted-ts/commit/6d30f739d66dc9292373af8787c74349da9e34c7))
* **internal:** codegen related update ([5ba61ed](https://github.com/cjavdev/spotted-ts/commit/5ba61ed4965e19740281f2f80357288dfda13c58))
* **internal:** update lock file ([59ce718](https://github.com/cjavdev/spotted-ts/commit/59ce71808a6f2e1fc75377eee12919c2c049f357))

## 0.17.3 (2026-01-17)

Full Changelog: [v0.17.2...v0.17.3](https://github.com/cjavdev/spotted-ts/compare/v0.17.2...v0.17.3)

### Chores

* **internal:** update `actions/checkout` version ([fb6da0f](https://github.com/cjavdev/spotted-ts/commit/fb6da0f9312b2f624251f22c34c1d87dd3de7638))

## 0.17.2 (2026-01-15)

Full Changelog: [v0.17.1...v0.17.2](https://github.com/cjavdev/spotted-ts/compare/v0.17.1...v0.17.2)

### Chores

* **internal:** upgrade babel, qs, js-yaml ([0d9da9f](https://github.com/cjavdev/spotted-ts/commit/0d9da9f4fc521bafccacd5f38c418b0ebf41451d))
* **mcp:** add intent param to execute tool ([4143c6c](https://github.com/cjavdev/spotted-ts/commit/4143c6cd568ae0d818f04f6333b0609e9d501e3e))
* **mcp:** pass intent param to execute handler ([62022f2](https://github.com/cjavdev/spotted-ts/commit/62022f299044f4023df5c24cce3c68a72939cad1))
* **mcp:** upgrade dependencies ([996134e](https://github.com/cjavdev/spotted-ts/commit/996134e0d9ce714d11d267d8000ebbe9b0fbb9e1))

## 0.17.1 (2026-01-15)

Full Changelog: [v0.17.0...v0.17.1](https://github.com/cjavdev/spotted-ts/compare/v0.17.0...v0.17.1)

### Chores

* remove custom code ([b1197e1](https://github.com/cjavdev/spotted-ts/commit/b1197e118b583129c27f72add0764bccb633aaf1))

## 0.17.0 (2026-01-15)

Full Changelog: [v0.16.4...v0.17.0](https://github.com/cjavdev/spotted-ts/compare/v0.16.4...v0.17.0)

### Features

* **api:** manual updates ([1610def](https://github.com/cjavdev/spotted-ts/commit/1610defbe9d9185704c9c4958d9619224d824073))
* **api:** manual updates ([8000bff](https://github.com/cjavdev/spotted-ts/commit/8000bff3ef738918eb09ee4b9cd85d11ad036cae))
* **api:** turn off oauth ([ccdb333](https://github.com/cjavdev/spotted-ts/commit/ccdb33368994ef0fc76b17a934b54d126a199b7a))


### Chores

* **internal:** configure MCP Server hosting ([6ffaaca](https://github.com/cjavdev/spotted-ts/commit/6ffaaca715be2380f89269460d3cd746de88cc25))
* remove custom code ([eac0015](https://github.com/cjavdev/spotted-ts/commit/eac0015fe029cda8a07b68858429fb22a360b3cb))

## 0.16.4 (2026-01-14)

Full Changelog: [v0.16.3...v0.16.4](https://github.com/cjavdev/spotted-ts/compare/v0.16.3...v0.16.4)

### Chores

* **internal:** codegen related update ([867ed0c](https://github.com/cjavdev/spotted-ts/commit/867ed0c99a0e6f0b2a83e65f78c11b3c5c29ec2b))
* **internal:** codegen related update ([156c53d](https://github.com/cjavdev/spotted-ts/commit/156c53d8eb38fb88e5b14342ed1307c982b808b6))

## 0.16.3 (2026-01-12)

Full Changelog: [v0.16.2...v0.16.3](https://github.com/cjavdev/spotted-ts/compare/v0.16.2...v0.16.3)

### Chores

* **internal:** codegen related update ([4328cc4](https://github.com/cjavdev/spotted-ts/commit/4328cc43f656080d4b45f6cbdac746824fae1d19))
* **internal:** codegen related update ([7d746e2](https://github.com/cjavdev/spotted-ts/commit/7d746e2aa1a7c79c81807374aa18ab2a625ca1a4))

## 0.16.2 (2026-01-09)

Full Changelog: [v0.16.1...v0.16.2](https://github.com/cjavdev/spotted-ts/compare/v0.16.1...v0.16.2)

### Bug Fixes

* **mcp:** update code tool prompt ([4647d11](https://github.com/cjavdev/spotted-ts/commit/4647d11dd90d9f5a8c9bd98bbdf6fc2685e16429))

## 0.16.1 (2026-01-07)

Full Changelog: [v0.16.0...v0.16.1](https://github.com/cjavdev/spotted-ts/compare/v0.16.0...v0.16.1)

### Bug Fixes

* **mcp:** fix options parsing ([1caa121](https://github.com/cjavdev/spotted-ts/commit/1caa1219dea07c48e6fa457678e08e54af3d84f4))


### Chores

* break long lines in snippets into multiline ([1744e7b](https://github.com/cjavdev/spotted-ts/commit/1744e7bdb52576e8ca26309fddb5826909816f94))

## 0.16.0 (2026-01-06)

Full Changelog: [v0.15.1...v0.16.0](https://github.com/cjavdev/spotted-ts/compare/v0.15.1...v0.16.0)

### Features

* **api:** manual updates ([fd3d00d](https://github.com/cjavdev/spotted-ts/commit/fd3d00da9e65fbab5f45cced59c10cb155f3e72e))

## 0.15.1 (2026-01-06)

Full Changelog: [v0.15.0...v0.15.1](https://github.com/cjavdev/spotted-ts/compare/v0.15.0...v0.15.1)

### Bug Fixes

* **mcp:** correct code tool api output types ([b6c510d](https://github.com/cjavdev/spotted-ts/commit/b6c510dea8e3d89396b0be7fa5c0cf2ce76685e9))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([6c3a91d](https://github.com/cjavdev/spotted-ts/commit/6c3a91d524b25c73e579e7cc7a16e20a6b26ed54))

## 0.15.0 (2026-01-05)

Full Changelog: [v0.14.0...v0.15.0](https://github.com/cjavdev/spotted-ts/compare/v0.14.0...v0.15.0)

### Features

* **api:** manual updates ([90373b3](https://github.com/cjavdev/spotted-ts/commit/90373b3e273ed9ac3b29f92dda4b2aa758dad675))

## 0.14.0 (2025-12-19)

Full Changelog: [v0.13.0...v0.14.0](https://github.com/cjavdev/spotted-ts/compare/v0.13.0...v0.14.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** manual updates ([f3e043d](https://github.com/cjavdev/spotted-ts/commit/f3e043d7aa031d80788ce0e88ed61891e99e1011))


### Bug Fixes

* **publish-npm:** set npm registry explicitly for publishing ([6e46b49](https://github.com/cjavdev/spotted-ts/commit/6e46b49306efed2e43f8332bd8a39558f9e2c9a5))


### Chores

* **mcp:** remove deprecated tool schemes ([e289832](https://github.com/cjavdev/spotted-ts/commit/e289832afd694b242ee97d127841646ce0443f9f))

## 0.13.0 (2025-12-18)

Full Changelog: [v0.12.0...v0.13.0](https://github.com/cjavdev/spotted-ts/compare/v0.12.0...v0.13.0)

### Features

* **api:** manual updates ([189101a](https://github.com/cjavdev/spotted-ts/commit/189101ae58de41ca92f2c97d728337446e63d6be))

## 0.12.0 (2025-12-18)

Full Changelog: [v0.11.0...v0.12.0](https://github.com/cjavdev/spotted-ts/compare/v0.11.0...v0.12.0)

### Features

* **api:** release to npm again ([76b6f2c](https://github.com/cjavdev/spotted-ts/commit/76b6f2cae10d8e0f4407c5e2a4d257ce5da85314))

## 0.11.0 (2025-12-18)

Full Changelog: [v0.10.0...v0.11.0](https://github.com/cjavdev/spotted-ts/compare/v0.10.0...v0.11.0)

### Features

* **api:** manual updates ([5ae4fd5](https://github.com/cjavdev/spotted-ts/commit/5ae4fd5c1826bbcd56bd302f5186f8d70782d394))
* **api:** manual updates ([d2c63cc](https://github.com/cjavdev/spotted-ts/commit/d2c63cc58e4beb2e5852fee7887e990d8d29f46c))
* **api:** manual updates ([bb5a654](https://github.com/cjavdev/spotted-ts/commit/bb5a654c435a5afbc0d27c996b27dcc129d55816))
* **api:** manual updates ([76c1031](https://github.com/cjavdev/spotted-ts/commit/76c1031152658ec6a51eccf389c15b034d6911a6))
* **api:** manual updates ([c75d209](https://github.com/cjavdev/spotted-ts/commit/c75d20953089e150a4e56bda9ea73961f820d50b))


### Bug Fixes

* **mcp:** add client instantiation options to code tool ([7a7db44](https://github.com/cjavdev/spotted-ts/commit/7a7db4465e3b4b7f0a639acb7016f214fde0623e))
* **mcp:** pass base url to code tool ([395efa3](https://github.com/cjavdev/spotted-ts/commit/395efa3ed685bcf43358357558c0c9cd5fca2b1f))


### Chores

* **mcp:** update lockfile ([910e948](https://github.com/cjavdev/spotted-ts/commit/910e9485d1c3b388123c408b589c2f6142df94d6))

## 0.10.0 (2025-12-10)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/cjavdev/spotted-ts/compare/v0.9.0...v0.10.0)

### Features

* **api:** manual updates ([0d08e85](https://github.com/cjavdev/spotted-ts/commit/0d08e85c5a9cbd2adc2c258d996273f5c1cb4686))

## 0.9.0 (2025-12-10)

Full Changelog: [v0.8.1...v0.9.0](https://github.com/cjavdev/spotted-ts/compare/v0.8.1...v0.9.0)

### Features

* **api:** manual updates ([d79c271](https://github.com/cjavdev/spotted-ts/commit/d79c27125df9bb9fb14c03ee7942d98f891fe654))

## 0.8.1 (2025-12-06)

Full Changelog: [v0.8.0...v0.8.1](https://github.com/cjavdev/spotted-ts/compare/v0.8.0...v0.8.1)

### Bug Fixes

* **mcp:** correct code tool API endpoint ([089ba2b](https://github.com/cjavdev/spotted-ts/commit/089ba2bb69fd6dbdda2c58abca26ec66331c57a7))


### Chores

* **internal:** codegen related update ([47bb429](https://github.com/cjavdev/spotted-ts/commit/47bb4295cb8dd890d3251b3316ac716bfbb74d86))

## 0.8.0 (2025-12-06)

Full Changelog: [v0.7.1...v0.8.0](https://github.com/cjavdev/spotted-ts/compare/v0.7.1...v0.8.0)

### Features

* **mcp:** handle code mode calls in the Stainless API ([5eb8ef6](https://github.com/cjavdev/spotted-ts/commit/5eb8ef6254839b44e69536b656b41fca03d9d031))


### Bug Fixes

* **mcp:** return correct lines on typescript errors ([c67c3a2](https://github.com/cjavdev/spotted-ts/commit/c67c3a2f5e88912ff677c05ac4cf33f427e29b3f))


### Chores

* **internal:** codegen related update ([5a47a19](https://github.com/cjavdev/spotted-ts/commit/5a47a192e623290bbfe9aa21dd11bda1a56831f1))

## 0.7.1 (2025-12-05)

Full Changelog: [v0.7.0...v0.7.1](https://github.com/cjavdev/spotted-ts/compare/v0.7.0...v0.7.1)

## 0.7.0 (2025-12-05)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/cjavdev/spotted-ts/compare/v0.6.0...v0.7.0)

### Features

* **api:** manual updates ([a971049](https://github.com/cjavdev/spotted-ts/commit/a971049da614ea3a49e68aa2b81929f62ad898d4))
* **api:** manual updates ([78d664d](https://github.com/cjavdev/spotted-ts/commit/78d664d17a3034cca8fd74fe85671ce013eef7cf))
* **api:** manual updates ([33d023a](https://github.com/cjavdev/spotted-ts/commit/33d023a8e0ab3c3de8297628488ea81f20d0763d))

## 0.6.0 (2025-12-05)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/cjavdev/spotted-ts/compare/v0.5.0...v0.6.0)

### Features

* **api:** Update readme titles. ([58d0973](https://github.com/cjavdev/spotted-ts/commit/58d0973596a6ff3468c42316b7152131ebdf7b0a))

## 0.5.0 (2025-12-05)

Full Changelog: [v0.4.1...v0.5.0](https://github.com/cjavdev/spotted-ts/compare/v0.4.1...v0.5.0)

### Features

* **mcp:** add typescript check to code execution tool ([a15991f](https://github.com/cjavdev/spotted-ts/commit/a15991f17b277f49ca37345d214e2547fd396de8))
* **mcp:** return logs on code tool errors ([6d7038b](https://github.com/cjavdev/spotted-ts/commit/6d7038bee2ab8ae2da42e5572210b3207241ca85))


### Chores

* **internal:** upgrade eslint ([6bd6c86](https://github.com/cjavdev/spotted-ts/commit/6bd6c86a2f2e36fc3a8ca59885974842ebdb31ec))
* use latest @modelcontextprotocol/sdk ([38e7c22](https://github.com/cjavdev/spotted-ts/commit/38e7c22639a1c25a2da13060fb10491c447db3be))

## 0.4.1 (2025-12-02)

Full Changelog: [v0.4.0...v0.4.1](https://github.com/cjavdev/spotted-ts/compare/v0.4.0...v0.4.1)

### Bug Fixes

* **mcp:** return tool execution error on api error ([d5e8a31](https://github.com/cjavdev/spotted-ts/commit/d5e8a31bc7a41fd420f78acd4b059db11a151687))


### Chores

* **client:** fix logger property type ([d923c67](https://github.com/cjavdev/spotted-ts/commit/d923c679de528e603cafa78fa70b178782fa4def))

## 0.4.0 (2025-11-26)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/cjavdev/spotted-ts/compare/v0.3.0...v0.4.0)

### Features

* **api:** manual updates ([022e96a](https://github.com/cjavdev/spotted-ts/commit/022e96a326f59c13dc1b99f1fea3dff8e6818848))

## 0.3.0 (2025-11-26)

Full Changelog: [v0.2.1...v0.3.0](https://github.com/cjavdev/spotted-ts/compare/v0.2.1...v0.3.0)

### Features

* **api:** manual updates ([45c91c1](https://github.com/cjavdev/spotted-ts/commit/45c91c1d689dba68834cff2efab5f5c424ecfa91))
* **mcp:** add detail field to docs search tool ([b696c29](https://github.com/cjavdev/spotted-ts/commit/b696c290aab355821efbd5cab7cc4851bb1a9ba3))

## 0.2.1 (2025-11-18)

Full Changelog: [v0.1.0...v0.2.1](https://github.com/cjavdev/spotted-ts/compare/v0.1.0...v0.2.1)

### Features

* **api:** add mode constants ([d5397d7](https://github.com/cjavdev/spotted-ts/commit/d5397d77e8d4ea90df6f31409f7cb941ffbf5c9b))
* **api:** manual updates ([57223b2](https://github.com/cjavdev/spotted-ts/commit/57223b26c5593cf79b6a8f2c18b23bd9b9e9879c))
* **api:** manual updates ([edb39df](https://github.com/cjavdev/spotted-ts/commit/edb39dfdbbf84cad59c5f8b16f5d35bbbea108fd))
* **api:** manual updates ([4a66e3d](https://github.com/cjavdev/spotted-ts/commit/4a66e3d07575eca73ba093033a370b037f23f512))
* **api:** manual updates ([7be7d20](https://github.com/cjavdev/spotted-ts/commit/7be7d20f0eea32db29a069a545c90a561da28d46))
* **api:** manual updates ([11058c3](https://github.com/cjavdev/spotted-ts/commit/11058c3618718c727f14ad8e1c3098dd8ff92158))
* **api:** manual updates ([b475c9a](https://github.com/cjavdev/spotted-ts/commit/b475c9a2396e1b299e73ed5cbfdcb28d69655ec9))
* **api:** manual updates ([4acacab](https://github.com/cjavdev/spotted-ts/commit/4acacab8532531ff267bb531dda97cf57c009479))
* **api:** manual updates ([59bd362](https://github.com/cjavdev/spotted-ts/commit/59bd36288c0700dea4c8d9002b16b8b5ac9629e2))
* **api:** manual updates ([60575a0](https://github.com/cjavdev/spotted-ts/commit/60575a05854f8189fca754352887e1478f875c58))
* **api:** manual updates ([509e286](https://github.com/cjavdev/spotted-ts/commit/509e28612d490ec5c5816860f054fd50c77565f8))
* **api:** manual updates ([14253d0](https://github.com/cjavdev/spotted-ts/commit/14253d0516fe121fd0458884bcc13dfab5e08a1a))
* **api:** manual updates ([38dc01e](https://github.com/cjavdev/spotted-ts/commit/38dc01ecc1268c6d4c35f79bfd1d31644fc5bffc))
* **api:** manual updates ([d7e727b](https://github.com/cjavdev/spotted-ts/commit/d7e727b8c36db75feaba90a5b253664aeef88a4b))

### Bug Fixes

* **mcp:** return tool execution error on jq failure ([d2949ba](https://github.com/cjavdev/spotted-ts/commit/d2949ba11d9816649ae784237f6bc7c096572dd7))

### Chores

* **mcp:** clarify http auth error ([d712c39](https://github.com/cjavdev/spotted-ts/commit/d712c3904a06572caecc2ff5de80dc667510694d))
* **mcp:** upgrade jq-web ([e0779f2](https://github.com/cjavdev/spotted-ts/commit/e0779f2186faa20509478b79202930b9822f947b))

## 0.1.0 (2025-11-08)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/cjavdev/spotted-ts/compare/v0.0.1...v0.1.0)

### Features

* **api:** Adds custom helper for datetime conversion ([b63b0dc](https://github.com/cjavdev/spotted-ts/commit/b63b0dc8bc8c4557de2b75d7fa247d19724bc4fd))
* **api:** manual updates ([20c59be](https://github.com/cjavdev/spotted-ts/commit/20c59bee04c9cc89b2cc5b4fb1886066cdce0403))
* **api:** manual updates ([948d98b](https://github.com/cjavdev/spotted-ts/commit/948d98b2536653cdb4c84841ddacbc91fb8a959a))
* **api:** manual updates ([7cbfc22](https://github.com/cjavdev/spotted-ts/commit/7cbfc22199cf053ef690695dc082d0b0aa4674bb))
* **api:** manual updates ([932adba](https://github.com/cjavdev/spotted-ts/commit/932adba17745bf753bf76247d51248b8784766b3))
* **api:** manual updates ([e6519e9](https://github.com/cjavdev/spotted-ts/commit/e6519e9ef025e2d6282a056661d1298c8acddf35))
* **api:** manual updates ([983afc3](https://github.com/cjavdev/spotted-ts/commit/983afc3fb125aa7a507bebf314e891c96b31c1ff))
* **api:** manual updates ([2b85770](https://github.com/cjavdev/spotted-ts/commit/2b857707ebbb7629c7b28fc3a679fd74882ff268))
* **api:** manual updates ([61edbcf](https://github.com/cjavdev/spotted-ts/commit/61edbcfb35f51ca23fc345577c7e016b46b7400c))
* **api:** manual updates ([19e336d](https://github.com/cjavdev/spotted-ts/commit/19e336d223f41ed19ef57d7cd7a01b33b63a4b33))
* **api:** manual updates ([9d57fc9](https://github.com/cjavdev/spotted-ts/commit/9d57fc9df1ce7acce4987414f9dfa616a4e1910a))
* **api:** manual updates ([3541b08](https://github.com/cjavdev/spotted-ts/commit/3541b084e9dc52171c995e8e1c2cc91066cd52bc))
* **mcp:** enable optional code execution tool on http mcp servers ([cfdecd6](https://github.com/cjavdev/spotted-ts/commit/cfdecd6e2ed9bab084b115528fcc4224a93c2d0c))

### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([dd56c1b](https://github.com/cjavdev/spotted-ts/commit/dd56c1b5336fa87595939b2a2ca38ab192f035fe))

### Chores

* configure new SDK language ([5620e41](https://github.com/cjavdev/spotted-ts/commit/5620e41bc5353164285c802930c8ab5d23388c4c))
* configure new SDK language ([b8848b4](https://github.com/cjavdev/spotted-ts/commit/b8848b4ead6446c56dc19c1c88ffdfaadf6daf7f))
* **internal:** codegen related update ([d36ecc9](https://github.com/cjavdev/spotted-ts/commit/d36ecc953b64fc182dc3c860b6b1460b3c989f57))
* **internal:** codegen related update ([de66ea8](https://github.com/cjavdev/spotted-ts/commit/de66ea8b02f6b4393655174c8360d7a9d0d0fe6b))
* **internal:** grammar fix (it's -&gt; its) ([1161670](https://github.com/cjavdev/spotted-ts/commit/116167047e24a03f0770aadcf615ce7a4f4f2335))
* mcp code tool explicit error message when missing a run function ([8577054](https://github.com/cjavdev/spotted-ts/commit/85770546914b9cef9d71aac8b2075ede860c5bcc))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([63c46a9](https://github.com/cjavdev/spotted-ts/commit/63c46a9a065d5f6a8166d833e216e2dc152d0f82))
* **mcp:** add line numbers to code tool errors ([f967a1f](https://github.com/cjavdev/spotted-ts/commit/f967a1f24993f9a2288499bd89c1782c308cf7b1))
* update SDK settings ([d2044ac](https://github.com/cjavdev/spotted-ts/commit/d2044ac24d979b3e8f409fc5fe8c5c55318a0919))
* update SDK settings ([99fab32](https://github.com/cjavdev/spotted-ts/commit/99fab320b35ebc86e194d04376a9e227c41439a3))
* use structured error when code execution tool errors ([0626eeb](https://github.com/cjavdev/spotted-ts/commit/0626eebaa3a40773b5a4d2cc3a06f6e6be0b016f))

### Documentation

* **mcp:** add a README button for one-click add to Cursor ([5d6688e](https://github.com/cjavdev/spotted-ts/commit/5d6688eb58f89ceb27d930780aee512658986416))
* **mcp:** add a README link to add server to VS Code or Claude Code ([2ee3bcc](https://github.com/cjavdev/spotted-ts/commit/2ee3bcc62aaaf950083efcb4b99100a89f13d55d))
