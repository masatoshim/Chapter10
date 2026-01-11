"use client";

import { useState } from 'react';
import classes from '@/app/admin/_styles/AdminEdit.module.scss';
import { useRouter } from 'next/navigation';
import { useCreateCategory } from '@/app/admin/_hooks/useCreateCategory';

export default function CategoryCreatePage() {
  // 画面表示用フック
  const router = useRouter();
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  // カテゴリー操作用フック
  const { createCategory, isCreating } = useCreateCategory();

  // 登録処理
  const handleCreate = async () => {
    if (!name.trim()) return alert("カテゴリー名を入力してください");
    const result = await createCategory({ name });
    if (result.success) {
      setShowToast(true);
      setTimeout(() => {
        router.push('/admin/categories');
        router.refresh();
      }, 1500);
    } else {
      alert(`エラー: ${result.error}`);
    }
  };

  return (
    <div className={classes.adminContainer}>
      {showToast && <div className={classes.toast}>カテゴリーを作成しました</div>}
      
      <header className={classes.header}>
        <h1 className={classes.title}>カテゴリー新規作成</h1>
      </header>

      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <div className={classes.field}>
          <label>カテゴリー名</label>
          <input 
            type="text" 
            placeholder="例: プログラミング, 日記など"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className={classes.actionButtons}>
          <button 
            type="button" 
            className={classes.updateBtn}
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? "作成中..." : "作成"}
          </button>
          <button 
            type="button" 
            className={classes.deleteBtn}
            onClick={() => router.back()}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}