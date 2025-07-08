#!/bin/bash

# Portfolio-site リポジトリでgit revert HEADを実行するスクリプト
# 現在のコミット: b376944118e61a7fb49d0217cb6e624d6c90d318 (ESDintErrorを修正)
# この変更を取り消す新しいコミットを作成します（履歴は保持されます）

echo "=== 現在のGitステータスを確認 ==="
git status

echo ""
echo "=== 現在のコミットを表示 ==="
git log --oneline -3

echo ""
echo "=== 現在のコミットの変更内容を確認 ==="
git show --stat HEAD

echo ""
echo "INFO: git revert HEAD を実行します。"
echo "これにより現在のコミット(b376944 - ESDintErrorを修正)の変更を取り消す新しいコミットが作成されます。"
echo "元のコミットは履歴に残ります。"
echo ""
echo "続行しますか? (y/N): "
read -r confirmation

if [[ $confirmation =~ ^[Yy]$ ]]; then
    echo ""
    echo "=== git revert HEAD を実行中... ==="
    
    # revert実行（エディタを開かずに自動でコミットメッセージを作成）
    git revert HEAD --no-edit
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "=== revert完了! 現在の状況を確認 ==="
        git log --oneline -4
        git status
        
        echo ""
        echo "✅ 正常にrevertが完了しました。"
        echo "新しいコミットが作成され、前のコミットの変更が取り消されました。"
    else
        echo ""
        echo "❌ revert中にエラーが発生しました。"
        echo "コンフリクトが発生している可能性があります。"
        echo "手動で解決するか、git revert --abort でrevertをキャンセルしてください。"
    fi
else
    echo "操作をキャンセルしました。"
fi
