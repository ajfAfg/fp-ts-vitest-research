# GitHub Actions 上で Vitest を用いたテストを実行するとき，ある `fp-ts` のモジュールがインポートできずテストが落ちる問題の調査結果

## 発生していた問題

GitHub Actions (環境は `ubuntu-latest`) 上で Vitest を用いたテストを実行するとき，`fp-ts` のモジュール `fp-ts/String` がインポートできずテストが落ちていた[^1]．

なお，あるローカル環境ではテストが通っていた．また， `fp-ts/Option` モジュールのインポートは，ローカル環境と GitHub Actions の環境どちらでも成功していた[^2]．

[^1]: https://github.com/ajfAfg/fp-ts-vitest-research/actions/runs/5990107210/job/16247057602
[^2]: https://github.com/ajfAfg/fp-ts-vitest-research/actions/runs/5990457818/job/16247783428

## 問題の原因

インポートするモジュール名が `fp-ts/string` であるべきだったところ，`fp-ts/String` となっていた．

ローカル環境と GitHub Actions 環境でインポートの成否が異なった理由は，OS のファイルシステムの case sensitivity にあった．今回の場合，ローカル環境の OS (macOS) のファイルシステムは case-insensitive であるため，モジュール名が `fp-ts/string` でも `fp-ts/String` と書いてインポートに成功していた．一方で，GitHub Actions 環境の OS (Ubuntu) のファイルシステムは case-sensitive であるため，`fp-ts/String` ではインポートできず，正確に `fp-ts/string` と書く必要があった．

## 対策

[TypeScript のオプション `forceConsistentCasingInFileNames`](https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames) を `true` にする……だけでは，TypeScript v5.2.2 ではバグ[^3]の影響で今回の問題の対策にはならないようだった．このバグは既に解決済み[^4]とのことなので，v5.2.2 を超えるバージョンからこのオプションを用いた対策が可能になるのではないかと思われる．

[^3]: [`forceConsistentCasingInFileNames` doesn't work for modules in `node_modules`](https://github.com/microsoft/TypeScript/issues/49470)
[^4]: [On windows handle the long paths in realpathSync.native](https://github.com/microsoft/TypeScript/pull/50306)

## 余談

Docker コンテナがマウントする macOS 側のファイルは，そのコンテナのイメージが Ubuntu でも case-insensitive になるらしい[^5]．これが原因で，今回の問題をローカルの Docker 環境で再現できなくて大変だった……

[^5]: [Docker Desktop for Mac でホスト側をマウントしたディレクトリはファイル名が case-insensitive](https://please-sleep.cou929.nu/afps-and-docker-for-mac-fs-case-sensitivity.html)

## まとめ

- ファイルシステムの case sensitivity によって，モジュールのインポートの成否が異なる場合がある
- TypeScript のオプション `forceConsistentCasingInFileNames` を `true` にしておくと対策が可能
  - TypeScript v5.2.2 では外部ライブラリのモジュール対してこのオプションが機能しないバグが存在する（2022 年 8 月 16 日時点で既に解決はされている）ため，正確には v5.2.2 を超えるバージョンから対策が可能になると思われる
