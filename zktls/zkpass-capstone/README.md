# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## 特定の Notion にアクセス権があるかどうかチェックするスキーマ

```json
{
  "issuer": "Notion",
  "desc": "A productivity and note-taking web application",
  "website": "https://www.notion.so/xxxxxx",
  "APIs": [
    {
      "host": "www.notion.so",
      "intercept": {
        "url": "api/v3/getUserAnalyticsSettings",
        "method": "POST"
      },
      "nullifier": "user_id"
    },
    {
      "host": "www.notion.so",
      "intercept": {
        "url": "api/v3/getPublicPageData",
        "method": "POST"
      },
      "assert": [
        {
          "key": "userHasExplicitAccess",
          "value": "true",
          "operation": "=",
          "verify": true
        }
      ]
    }
  ],
  "HRCondition": ["Notion Has Page Access"],
  "tips": {
    "message": "Login to your Notion Account and select any page you want to check you have access to. Wait for the page to fully load."
  }
}
```

## zkPass の X アカウントをフォローしているかチェックするスキーマ

```json
{
  "category": "Social",
  "issuer": "Twitter",
  "desc": "A free social networking site where users broadcast short posts known as tweets.",
  "breakWall": true,
  "website": "https://x.com/zkPass",
  "APIs": [
    {
      "host": "api.x.com",
      "intercept": {
        "url": "1.1/account/settings.json",
        "method": "GET",
        "query": [
          {
            "include_mention_filter": "true"
          },
          {
            "include_nsfw_user_flag": "true"
          }
        ]
      },
      "referred": ["screen_name"]
    },
    {
      "host": "x.com",
      "intercept": {
        "url": "i/api/graphql/?=?/UserByScreenName",
        "method": "GET"
      },
      "override": {
        "query": [
          {
            "variables": "%7B%22screen_name%22%3A%22@{=,0|0}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D",
            "verify": true
          }
        ],
        "header": [
          {
            "referer": "https://twitter.com/@{=,0|0}",
            "verify": true
          }
        ]
      },
      "nullifier": "data|user|result|rest_id"
    },
    {
      "host": "x.com",
      "intercept": {
        "url": "i/api/graphql/?=?/ProfileSpotlightsQuery",
        "method": "GET",
        "query": [
          {
            "variables": "%7B%22screen_name%22%3A%22zkPass%22%7D",
            "verify": true
          }
        ]
      },
      "assert": [
        {
          "key": "data|user_result_by_screen_name|result|legacy|following",
          "value": "true",
          "operation": "=",
          "tips": "You must follow @zkPass on Twitter."
        },
        {
          "key": "data|user_result_by_screen_name|result|rest_id",
          "value": "1506532533365886981",
          "operation": "=",
          "tips": "You must follow @zkPass on Twitter."
        }
      ]
    }
  ],
  "HRCondition": ["Please follow zkPass X account if you don't follow."],
  "tips": {
    "message": "When you successfully log in, please: <br/> 1. Open zkPass's official Twitter (https://twitter.com/zkPass).<br/> 2. Click \"Follow\" to follow zkPass's official Twitter.<br/> 3. Click the 'Start' button to initiate the verification process.<br/> If the start button remains disable for an extended period, please click the refresh button."
  },
  "id": "0xac32a86c7fc5469ba4da052dcc5d11fa"
}
```

## クライアント側で生成した ZKproof の一例

```json
{
  "taskId": "ff517f006e59401d947dc7fef8b41c0d",
  "publicFields": [],
  "allocatorAddress": "0x19a567b3b212a5b35bA0E3B600FbEd5c2eE9083d",
  "publicFieldsHash": "0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
  "allocatorSignature": "0xbfb55cb5fd6f9bbb9041a69bafc1b54da58711cbfa40cf20f4e43b9744cc9c8352c076a406458fe69d7d405430b7ef2632a8c9b7753213d8f1d90c4841d0187b1b",
  "uHash": "0xe8317c6bd033f26592b8d484ee279f1fe1062c77071811c1f8824682e62d5bb3",
  "validatorAddress": "0xb1C4C1E1Cdd5Cf69E27A3A08C8f51145c2E12C6a",
  "validatorSignature": "0xe0e0b0d8e028e3d3e658c9e0238aa8d816659f35db40e8a1f7422da2853b197818040c7b7a22814707c75b20e1bd1f8cfbe27f2556095aec0574d106da15bb831c",
  "recipient": "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072"
}
```
