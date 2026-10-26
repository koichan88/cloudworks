# cloudworks

## 無料LLM API (mnfst/awesome-free-llm-apis, CC0)

- `docs/free-llm-apis.md`: 人が読む一覧
- `data/free-llm-apis.json`: 元データ(上流の data.json をそのまま保存。ライセンスは `data/LICENSE-free-llm-apis.CC0.txt`)
- `src/free-llm-apis/`: TypeScriptのプロバイダ定義とOpenAI互換クライアント(`chat`, `chatWithFallback`)
- `.env.example`: 各社のAPIキー用環境変数(`npm run env:llm` で再生成)

使い方:

    npm install
    cp .env.example .env   # キー不要: ovhcloud-ai-endpoints, llm7-io, kilo-code。他は使うキーだけ設定
    npm run example:llm

更新: `npm run sync:llm` で上流の最新データを取得。無料枠は頻繁に変わるため、利用前に公式ドキュメントで確認すること。
