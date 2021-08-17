# [webpack 시작하기](https://www.valentinog.com/blog/webpack/#webpacks-development-server)

## 프로젝트 셋업

| no  | 구분                                     | 설명     |
| --- | ---------------------------------------- | -------- |
| 1   | $ git init webpack_org && cd webpack_org |          |
| 2   | $ code .                                 |          |
| 3   | $ echo “node_modules” > .gitignore       |          |
| 4   | $ yarn init -y                           |          |
| 5   | $ touch package.json                     | update   |
|     | scripts                                  | start    |
| 6   | $ touch src/index.js                     | create   |
| 7   | $ yarn start                             | run      |
|     | Hello Project                            | terminal |
| 8   | $ touch dist/index.html                  | create   |

package.json

```tsx
...
 "scripts": {
    "dev": "webpack --mode development"
  },
...
```

src/index.js

```tsx
console.log('Hello Project');
```

dist/index.html

```tsx
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>
  <body>
    <div>
      <h1>Hello Webpack</h1>
    </div>
  </body>
</html>
```

| 번외         | 명령                                         | 설명   |
| ------------ | -------------------------------------------- | ------ |
| package.json | yarn config list                             | list   |
|              | yarn set init.author.name “\<your name>”     |        |
|              | yarn set init.author.email “you@example.com” |        |
|              | yarn set init.author.url “example.com”       |        |
|              | yarn set init.license “MIT”                  |        |
| index.js     | touch src/index.js                           |        |
|              | console.log(‘Hello Project’);                |        |
| node         | node src/index.js                            | run    |
|              | 터미널에서 ‘Hello Project’ 프린트            |        |
| package.json | scripts                                      | update |
|              | “start”: “node src/index.js”                 |        |
|              | yarn start                                   | run    |

## webpack 셋업

| no  | 구분                                                                                                                                       | 설명    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| 1   | $ yarn add -D webpack webpack-dev-server webpack-cli                                                                                       | install |
| 2   | $ touch package.json                                                                                                                       | update  |
|     | scripts: start: “webpack serve \--config ./webpack.config.js \--mode development”                                                          | modify  |
| 3   | $ touch webpack.config.js                                                                                                                  | create  |
|     | > entry: ‘./src/index.js’ – 번들하는 entry point 이다. 만약, index.js 가 다른 자바스크립트 파일들을 import 하고 있으면, 그것들도 번들한다. | entry   |
|     | > output: 번들링된 소스 코드 파일들이 /dist 폴더의 bundle.js 파일로 될 것이다.                                                             | output  |
|     | > devServer: contentBase – /dist 폴더가 우리의 앱을 브라우저에 serve 하는데 사용될 것이다.                                                 |         |
| 4   | $ touch webpack.config.js                                                                                                                  | update  |
|     | > 전체 os 의 paths 를 정확하게 표현                                                                                                        |         |
| 5   | $ yarn start                                                                                                                               |         |
| 6   | $ touch dist/index.html                                                                                                                    | update  |
|     | \<script src=“./bundle.js”>                                                                                                                | add     |
| 7   | $ yarn start                                                                                                                               | run     |
| 8   | localhost:8080                                                                                                                             | check   |

package.json

```json
{
  ...
  "scripts": {
    "start": "webpack serve --config ./webpack.config.js --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  ...
}
```

webpack.config.js

```tsx
module.exports = {
  // 1
  entry: './src/index.js',
  // 2
  output: {
    path: '/dist',
    filename: 'bundle.js',
  },
  // 3
  devServer: {
    contentBase: './dist',
  },
};
```

```tsx
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
```

dist/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>

  <body>
    <div>
      <h1>Hello Webpack!!!</h1>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

## Babel로 webpack 5 하기

Babel 을 사용하면, 대부분 브라우저에서 아직 지원하지 않는 자바스크립트 기능들로 코드를 작성할 수 있다.

| no  | 구분                                        | 설명    |
| --- | ------------------------------------------- | ------- |
| 1   | $ yarn add -D @babel/core @babel/preset-env | install |
| 2   | $ yarn add -D babel-loader                  | install |
| 3   | $ touch .babelrc                            | create  |
|     | > babel 속성을 추가한다.                    |         |
|     | > .babelrc 로도 설정할 수 있다.             | create  |
| 4   | $ touch webpack.config.js                   | update  |
|     | module                                      | add     |
| 5   | $ yarn start                                | run     |
| 6   | localhost:8080                              | check   |

.babelrc

```json
{
  "presets": ["@babel/preset-env"]
}
```

webpack.config.js

```tsx
...
	module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
...
```

## React 셋업

Babel 은 React 코드를 vanilla JavaSript 로 transpile 한다.

| no  | 구분                              | 설명    |
| --- | --------------------------------- | ------- |
| 1   | $ yarn add -D @babel/preset-react | install |
| 2   | $ touch .babelrc                  | update  |
|     | presets: @babel/preset-react      | add     |
| 3   | $ touch webpack.config.js         | update  |
|     | module: rules: test (jsx)         | add     |
|     | resolve: extensions: [.jsx]       | add     |
| 4   | $ yarn add react react-dom        | install |
| 5   | $ touch src/index.js              | update  |
| 6   | $ touch dist/index.html           | update  |
| 7   | $ yarn start                      |         |

.babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

webpack.config.js

```tsx
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
```

src/index.js

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'React with Webpack and Babel';

ReactDOM.render(
  <div>
    <h1>{title}</h1>
  </div>,
  document.getElementById('app'),
);
```

dist/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack</title>
  </head>

  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

**<u>HOT Module Replacement in React</u>**

react-hot-loader 를 사용하면, 개발을 용이하게 할 수 있다.

| no  | 구분                                              | 설명    |
| --- | ------------------------------------------------- | ------- |
| 1   | $ yarn add -D react-hot-loader                    | install |
| 2   | $ touch webpack.config.js                         | update  |
|     | webpack                                           | import  |
|     | plugins: new webpack.HotModuleReplacementPlugin() | add     |
|     | devServer: hot: true                              | add     |
| 3   | $ touch src/index.js                              | update  |
|     | module.hot.accept();                              | add     |
| 4   | $ yarn start                                      | run     |
| 5   | $ touch src/index.js                              | update  |
| 6   | $ touch src/App.js                                | create  |

webpack.config.js

```tsx
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
  },
};
```

src/index.js

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'React with Webpack and Babel';

ReactDOM.render(
  <div>
    <h1>{title}</h1>
  </div>,
  document.getElementById('app'),
);

module.hot.accept();
```

src/index.js

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const title = 'React with Webpack and Babel';

ReactDOM.render(<App title={title} />, document.getElementById('app'));

module.hot.accept();
```

src/App.js

```tsx
import React from 'react';

const App = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

export default App;
```

## ESLint

| no  | 구분                                                      | 설명    |
| --- | --------------------------------------------------------- | ------- |
| 0   | $ yarn global add eslint                                  | install |
| 1   | VSCode - ESLint extension                                 | install |
| 2   | $ yarn add -D eslint eslint-loader babel-eslint           | install |
| 3   | $ touch webpack.config.js                                 | update  |
|     | module: rules: use: eslint-loader                         | add     |
| 4   | $ touch .eslintrc                                         | create  |
|     | parser: babel-eslint                                      | add     |
|     | > webpack 에서 사용하기 위해서는 parser 를 설정하여야 함. |         |
|     | rules: {}                                                 | add     |
| 5   | $ yarn start                                              | run     |
| 6   | $ touch .eslintrc                                         | update  |
|     | rules: max-len                                            | add     |
| 7   | $ npx install-peerdeps -D eslint-config-airbnb            | install |
|     | > shareable ESLint configuration                          |         |
| 7   | $ touch .eslintrc                                         | update  |
|     | extends: airbnb                                           | add     |

.eslintrc

- parser 의 역할은 JavaScript ES6 구문인 import 또는 export 와 같은 Babel enabled JavaScript 를 파싱 한다.
- max-len 은 코드에서 한 라인의 문자 길이를 체크한다. 70자 보다 크면,

```json
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "rules": {
    "max-len": [1, 70, 2, { "ignoreComments": true }]
  }
}
```

## Prettier

| no  | 구분                                            | 설명    |
| --- | ----------------------------------------------- | ------- |
| 1   | $ yarn global add prettier                      | install |
| 2   | VSCode extension : Prettier                     | install |
|     | User’s setting/preferences as JSON              |         |
|     | > “editor.formatOnSave”: false                  |         |
|     | > “[javascript”: { “editor.formatOnSave”: true} |         |
| 3   | $ touch .prettierrc                             | create  |
|     | > semi, trailingComma, singleQuote, printWidth  | add     |

## Prettier and ESLint

| no  | 구분                                                                         | 설명    |
| --- | ---------------------------------------------------------------------------- | ------- |
| 1   | $ yarn global prettier eslint                                                | install |
|     | > eslint \--init                                                             | 참조    |
| 2   | $ yarn add -D eslint-config-prettier eslint-plugin-prettier                  | install |
|     | > eslint-config-prettier: Prettier 와 conflict 하는 ESLint rules 를 turn-off |         |
|     | > eslint-plugin-prettier: Prettier rules 를 ESLint rules 로 통합             |         |
| 3   | $ touch .eslintrc                                                            | update  |
|     | extends: prettier                                                            | modify  |
|     | plugins: prettier                                                            | add     |
|     | rules: prettier/prettier: error                                              | modify  |
| 4   | $ touch .eslintignore                                                        | create  |
|     | node_modules                                                                 |         |
| 5   | $ touch .eslintrc                                                            | update  |
|     | extends: airbnb                                                              | add     |
|     | > 만약 airbnb 와 별도의 rule 을 만들려면, rules 속성에 add 하면 된다.        |         |

[번외:](https://velog.io/@pks787/CRA-%EC%97%86%EC%9D%B4-eslint-prettier-%EC%A0%81%EC%9A%A9)

| no  | 구분                                                                                                      | 설명    |
| --- | --------------------------------------------------------------------------------------------------------- | ------- |
| 1   | $ yarn add -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react | install |
|     | > eslint, airbnb 구성 및 필수 패키지 설치                                                                 |         |
| 2   | $ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier babel-eslint                         | install |
|     | > prettier 그리고 eslint와의 충돌방지 패키지 설치                                                         |         |
| 3   | $ touch .eslintrc                                                                                         | create  |
| 4   | $ touch .prettierrc                                                                                       |         |
| 5   | $ yarn add -D husky                                                                                       | install |
|     | > 제대로 된 코드 아니면, git commit 막기                                                                  |         |
|     | $ yarn add -D lint-staged                                                                                 | install |
|     | > staged 코드들만 검사                                                                                    |         |
|     | $ touch package.json                                                                                      |         |
|     | > “lint-staged”: { “\*.js”: [“eslint . \--fix”, “prettier \--wirte” ]},                                   |         |
|     | > “husky”: { “hooks”: { “pre-commit”: “eslint . \--fix && prettier \--write”}},                           | add     |
|     |                                                                                                           |         |
|     | $ yarn add -D lint-staged                                                                                 | install |
|     | > staged 코드들만 검사                                                                                    |         |
| 6   | $ yarn add -D prettier-eslint                                                                             | install |
|     | > eslint와 prettier 를 연동                                                                               |         |
|     | touch VSCode settings.json                                                                                | update  |
| 7   | $ yarn add -D eslint-config-airbnb                                                                        | install |
|     | > airbnb 스타일 추가                                                                                      |         |
| 8   | $ touch .eslintrc                                                                                         | update  |
| 9   | $ touch .eslintignore                                                                                     | create  |

.eslintrc

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["airbnb", "prettier", "prettier/react"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "plugins": ["react", "prettier"],
  "rules": {
    "react/prop-types": 0,
    "no-underscore-dangle": 0,
    "import/imports-first": ["error", "absolute-first"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "import/newline-after-import": "error",
    "import/prefer-default-export": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "linebreak-style": 0,
    "no-unused-vars": 0

    // ❗️error off : 0 , warning 1,❗️
  }
}
```

.prettierrc

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 120,
  "arrowParens": "avoid"
}
```

VSCode settings.json : 추가사항

```json
 // eslint와 prettier 연동
"editor.formatOnSave": true,
"javascript.format.enable": false,
"prettier.eslintIntegration": true
```

.eslintrc(airbnb 스타일 적용)

```json
{
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": ["react", "jsx-a11y", "import"],
  "rules": {
    "react/jsx-filename-extension": 0
  },
  "env": {
    "browser": true,
    "node": true
  }
}
```

.eslintignore

```json
node_modules
webpack.config.js
dist/bundle.js
```

## [Advanced Webpack 5](https://www.robinwieruch.de/webpack-advanced-setup-tutorial)

지금까지 webpack 은 당신의 모든 JavaScript 파일들을 bundle 하고, babel을 사용하여 새로운 JavaScript 기능들로 transpile 하였고, webpack의 Development Server 를 통해 development mode 에서 당신의 bundle 을 serve 하였다.

이제 production ready bundle을 어떻게 하고, 필요에 따라 어떻게 configure 하는지를 알아보자.

- 당신의 실제 web server 에 당신의 production 용 web application 을 deploy 할 수 있는 build 파일들을 가지길 바랄 것이다.
- webpack 은 모든 당신의 자바스크립트 소스 코드를 bundle.js 파일에 번들하고, 이 bundle.js 파일은 당신의 dist/index.html 에 link 된다.
- 이제, 이 bundle.js와 index.html 파일을 당신의 web server 에 있어야 한다.

| no  | 구분                                                                                                            | 설명   |
| --- | --------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | $ touch dist/index.html                                                                                         | check  |
| 2   | $ toucn package.json                                                                                            | update |
|     | build: webpack \--config ./webpack.config.js \--mode production                                                 | add    |
| 3   | $ yarn run build                                                                                                | run    |
|     | > dist/bundle.js bundle.js.LICENSE.txt 자동생성                                                                 |        |
| 4   | 이제 남은 일은 web server 에 당신의 dist/ 폴더를 upload 하는 일만 남았다.                                       |        |
|     | > remote web server 에서 당신 앱을 실행하는데 피요한 모든 것이 dist/folder 에 있는지를 로컬에서 체크할 수 있다. |        |
|     | > npx http-server dist                                                                                          |        |
|     | > 브라우저에서 url 을 방문하여 확인                                                                             |        |

dist/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello Webpack bundled JavaScript Project</title>
  </head>
  <body>
    <div id="app">
      <h1>Hello Webpack bundled JavaScript Project</h1>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

**<u>webpack build 폴더를 관리하기</u>**

yarn run build를 할 때마다, webpack 이 새로운 번들 자바스크립트 소스 코드의 버전을 dist/bundle.js 파일로 만드는 것을 볼 것이다.

- 사실상 당신의 webpack build pipeline 이 더 복잡해지고, dist/ 폴더에서 2개 이상의 파일들이 생길 것이다.
- 갑자기 이 폴더가 엉망이 된다. 어떤 파일들이 recent build 에 속하는지 모르기 때문이다.
- 가장 좋은 해법은 모든 webpack build 할 때마다 empty dist/ 폴더로 시작하는 것이다.

매번 webpack이 build 할 때마다 dist/ 폴더를 깨끗이 비워야 한다.

| no  | 구분                               | 설명    |
| --- | ---------------------------------- | ------- |
| 1   | $ yarn add -D html-webpack-plugin  | install |
| 2   | $ touch webpack.config.js          | update  |
|     | HtmlWebpackPluing                  | import  |
|     | plugins: [new HtmlWebpackPlugin()] | add     |
| 3   | $ yarn run build                   | run     |
| 4   | $ yarn add -D clean-webpack-plugin | install |
| 5   | $ touch webpack.config.js          | update  |
|     | {CleanWebpackPlugin}               | import  |
|     | plugins: new CleanWebpackPlugin()  | add     |
| 6   | $ touch src/index.html             | create  |
| 7   | $ touch .gitignore                 | update  |
|     | > dist/                            | add     |
| 8   | $ yarn run build                   | run     |

webpack.config.js

```tsx
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello Webpack bundled JavaScript Project',
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  ...
};
```

src/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div>
      <h1><%= htmlWebpackPlugin.options.title %></h1>

      <div id="app">
    </div>
  </body>
</html>
```

**<u>webpack source maps</u>**

| no  | 구분                      | 설명   |
| --- | ------------------------- | ------ |
| 1   | $ touch webpack.config.js | update |
|     | devtool: ‘source-map’,    | add    |
|     | > 에러 추적 가능          |        |

**<u>webpack development/build configuration</u>**

지금까지는 하나의 공통 webpack configuration 을 사용하였다.

- 하지만, 각 모드에 대한 configuration을 도입할 수도 있다.

| no  | 구분                                                                                                                                                     | 설명   |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | $ touch package.json                                                                                                                                     | update |
|     | start: webpack serve \--config ./webpack.dev.js                                                                                                          | modify |
|     | build: webpack \--config ./webpack.prod.js                                                                                                               | modify |
| 2   | $ touch webpack.dev.js                                                                                                                                   | create |
|     | mode: ‘development’                                                                                                                                      | add    |
| 3   | $ touch webpack.prod.js                                                                                                                                  | create |
|     | mode: ‘production’                                                                                                                                       | add    |
| 4   | 지금은 webpack.config.js, webpack.dev.js, webpack.prod.js 내용이 모두 같지만, 향후 개발과 프로덕션 모드에서 변경하는 것을 따로 관리하는 것이 가능해진다. |        |
| 5   | $ touch webpack.dev.js                                                                                                                                   | update |
|     | > devtool: ‘eval-source-map’,                                                                                                                            | modify |
| 6   | 이제 yarn run start (개발) 및 yarn run build – npx http-server dist (프로덕션 로컬 체크) 에 따라 다른 webpack 을 사용할 수 있다.                         |        |

package.json

```json
{
  ...
  "scripts": {
    "start": "webpack serve --config ./webpack.dev.js",
    "build": "webpack --config ./webpack.prod.js",
    "test": "echo \"Error: no test specified\" && exit 0"
  },
  ...
}
```

webpack.dev.js

```tsx
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello Webpack bundled JavaScript Project',
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
  },
};
```

webpack.prod.js

```tsx
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello Webpack bundled JavaScript Project',
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
  },
};
```

**<u>webpack merge configuration</u>**

현재 webpack.dev.js와 webpack.prod.js 는 많은 부분을 공유하고 있다.

- 이것을 common 하게 줄여보자.

| no  | 구분                                                                                        | 설명    |
| --- | ------------------------------------------------------------------------------------------- | ------- |
| 1   | $ yarn add -D webpack-merge                                                                 | install |
| 1   | $ touch package.json                                                                        | update  |
|     | > start: “webpack serve \--config build-utils/webpack.config.js \--env env=dev”             |         |
|     | > build: “webpack \--config build-utils/webpack.config.js \--env env=prod”                  |         |
| 2   | $ mkdir build-utils                                                                         | create  |
| 3   | $ touch build-utils/webpack.config.js                                                       | create  |
| 4   | $ touch build-utils/webpack.common.js                                                       | create  |
|     | ‘..’ : 상대 path 주의 요함                                                                  |         |
| 5   | $ touch build-utils/webpack.dev.js                                                          | create  |
| 6   | $ touch build-utils/webpack.prod.js                                                         | create  |
| 7   | $ rm -rf webpack.config.js webpack.prod.js webpack.dev.js                                   | remove  |
| 8   | 이제 yarn run start(개발) 또는 yarn run build - npx http-server dist (프로덕트) 확인이 가능 |         |

build-utils/webpack.config.js

```tsx
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);
  return merge(commonConfig, envConfig);
};
```

build-utils/webpack.common.js

```tsx
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello Webpack bundled JavaScript Project',
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '..', './dist'),
    hot: true,
  },
};
```

build-utils/webpack.dev.js

```tsx
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
};
```

build-utils/webpack.prod.js

```tsx
module.exports = {
  mode: 'production',
  devtool: 'source-map',
};
```

**<u>webpack environment variables: .env</u>**

| no  | 구분                                                                                                                                                                                                            | 설명    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | $ yarn add -D dotenv-webpack                                                                                                                                                                                    | install |
| 2   | $ touch env.development                                                                                                                                                                                         | create  |
|     | NODE_ENV=development                                                                                                                                                                                            | add     |
| 3   | $ touch env.production                                                                                                                                                                                          | create  |
|     | NODE_ENV=production                                                                                                                                                                                             | add     |
| 4   | $ touch .gitignore                                                                                                                                                                                              | update  |
|     | env.development env.production                                                                                                                                                                                  | add     |
| 5   | $ touch build-utils/webpack.dev.js                                                                                                                                                                              | update  |
| 6   | $ touch build-utils/webpack.prod.js                                                                                                                                                                             | update  |
| 7   | 이제 IP adresses, account credentials, API keys/secrets 등 보안요구되는 환경변수들을 .env.development와 .env.production 에 구분하여 사용할 수 있게 된다. – .gitignore 에 포함하여 git 에 올라가지 못하도록 주의 |         |

build-utils/webpack.dev.js

```tsx
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.development'),
    }),
  ],
  devtool: 'eval-source-map',
};
```

build-utils/webpack.prod.js

```tsx
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.production'),
    }),
  ],
  devtool: 'source-map',
};
```

**<u>webpack addons</u>**

webpack 은 수많은 plugins 를 지원한다.

- 예를 들면, 당신의 webpack 번들을 분석하고 시각화하는 addons 를 도입할 수 있다.

| no  | 구분                                                                       | 설명    |
| --- | -------------------------------------------------------------------------- | ------- |
| 1   | $ yarn add -D webpack-bundle-analyzer                                      | install |
| 2   | $ touch package.json                                                       | update  |
|     | scripts: “build:analyze”: “yarn run build \-- \--env addon=bundleanalyze”, | add     |
| 3   | $ touch build-utils/webpack.config.js                                      | update  |
|     | const getAddons = (addonsArgs) => {…}                                      | add     |
| 4   | $ touch build-utils/addons/webpack.bundleanalyze.js                        | create  |
| 5   | $ yarn run build:analyze                                                   | run     |
|     | > npx http-server dist                                                     | check   |

build-utils/webpack.config.js

```tsx
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const getAddons = addonsArgs => {
  const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

  return addons.filter(Boolean).map(name => require(`./addons/webpack.${name}.js`));
};

module.exports = ({ env, addon }) => {
  const envConfig = require(`./webpack.${env}.js`);
  return merge(commonConfig, envConfig, ...getAddons(addon));
};
```

build-utils/addons/webpack.bundleanalyze.js

```tsx
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, '..', '..', './dist/report.html'),
      openAnalyzer: false,
    }),
  ],
};
```
