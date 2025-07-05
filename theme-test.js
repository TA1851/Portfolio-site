#!/usr/bin/env node

/**
 * テーマ切り替え動作確認用スクリプト
 */

console.log('=== テーマ切り替え動作確認 ===');
console.log('');

console.log('1. ブラウザで http://localhost:3003 を開く');
console.log('2. ヘッダーのテーマ切り替えボタンをクリック');
console.log('3. 背景色とテキスト色が切り替わることを確認');
console.log('4. Developer Toolsのコンソールでテーマ切り替えログを確認');
console.log('');

console.log('期待される動作:');
console.log('- ライトモード: 白い背景、黒いテキスト');
console.log('- ダークモード: 黒い背景、白いテキスト');
console.log('- ボタンアイコン: 太陽（ライト）↔ 月（ダーク）');
console.log('');

console.log('トラブルシューティング:');
console.log('- テーマが切り替わらない場合は、ブラウザのキャッシュをクリア');
console.log('- LocalStorageに"theme"キーが保存されているか確認');
console.log('- HTMLのclass属性に"dark"が追加/削除されているか確認');
console.log('');

console.log('現在のTailwind CSS設定:');
console.log('- バージョン: v3 (安定版)');
console.log('- darkMode: "class" (クラスベース切り替え)');
console.log('- next-themes: 0.4.6');
console.log('');

console.log('=== 確認完了 ===');
