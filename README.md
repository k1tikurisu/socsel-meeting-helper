## Setup
node.js 18以上が必要です

```sh
# pnpmコマンドが利用可能でない場合
$ corepack prepare pnpm@8.10.3 --activate 
# モジュールのインストール
$ pnpm install
# 開発コマンド
$ pnpm build
```

`build/chrome-mv3-prod`が生成されるので、`chrome://extensions`にアクセスして、デベロッパーモードをオンにして、パッケージ化されていない拡張機能を読み込む、で読み込んでください。
