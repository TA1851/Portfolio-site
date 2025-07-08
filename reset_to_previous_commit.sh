#!/bin/bash

# Portfolio-site リポジトリを一つ前のコミットに戻すスクリプト
# 現在のコミット: b376944118e61a7fb49d0217cb6e624d6c90d318 (ESDintErrorを修正)
# 戻り先コミット: 44d46bac223d1f349a5b3d3e45ca2f75b00ed0d5 (テーブルプラグインをCMSにインストール)

echo "=== 現在のGitステータスを確認 ==="
git status

echo ""
echo "=== 現在のコミットを表示 ==="
git log --oneline -3

echo ""
echo "WARNING: この操作により現在のコミット(b376944 - ESDintErrorを修正)の変更が失われます。"
echo "続行しますか? (y/N): "
read -r confirmation

if [[ $confirmation =~ ^[Yy]$ ]]; then
    echo ""
    echo "=== 一つ前のコミット(44d46bac)にハードリセット中... ==="
    git reset --hard 44d46bac223d1f349a5b3d3e45ca2f75b00ed0d5
    
    echo ""
    echo "=== リセット完了! 現在の状況を確認 ==="
    git log --oneline -3
    git status
    
    echo ""
    echo "✅ 正常に一つ前のコミットに戻りました。"
else
    echo "操作をキャンセルしました。"
fi
