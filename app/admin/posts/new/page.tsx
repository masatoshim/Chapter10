"use client";

import { useState, useEffect, useRef } from 'react';
import classes from '@/app/admin/_styles/AdminEdit.module.scss';
import { useRouter } from 'next/navigation';
import { useGetCategories } from '@/app/admin/_hooks/useGetCategories';
import { useCreatePost } from '@/app/admin/_hooks/useCreatePost';

export default function AdminCreatePage() {
  // 画面表示用フック
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // 記事情報操作用フック
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const { categories, fetched: catFetched } = useGetCategories();
  const { createPost, isCreating } = useCreatePost();
  
  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // カテゴリーのトグル処理
  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // カテゴリーの名称取得
  const selectedCategoryNames = categories
    .filter((c) => selectedCategoryIds.includes(c.id))
    .map((c) => c.name)
    .join(', ');

  // 登録処理
  const handleCreate = async () => {
    if (!title.trim()) return alert("タイトルを入力してください");
    if (!window.confirm("この記事を公開してもよろしいですか？")) return;
    const result = await createPost({
      title,
      content,
      thumbnailUrl,
      categoryIds: selectedCategoryIds,
    });
    if (result.success) {
      setToastMessage('記事を作成しました');
      setShowToast(true);
      setTimeout(() => {
        router.push('/admin/posts');
        router.refresh();
      }, 1500);
    } else {
      alert(`作成に失敗しました: ${result.error}`);
    }
  };

  // カテゴリー取得中のみローディング表示
  if (!catFetched) return <div>カテゴリー読み込み中...</div>;

  return (
    <div className={classes.adminContainer}>
      {showToast && <div className={classes.toast}>{toastMessage}</div>}
      
      <header className={classes.header}>
        <h1 className={classes.title}>記事新規作成</h1>
      </header>

      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
        <div className={classes.field}>
          <label>タイトル</label>
          <input 
            type="text" 
            placeholder="記事のタイトルを入力"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className={classes.field}>
          <label>サムネイルURL</label>
          <input 
            type="text" 
            placeholder="https://example.com/image.jpg"
            value={thumbnailUrl} 
            onChange={(e) => setThumbnailUrl(e.target.value)} 
          />
        </div>

        <div className={classes.field}>
          <label>内容</label>
          <textarea 
            rows={10} 
            placeholder="本文を入力してください"
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </div>

        <div className={classes.field}>
          <label>カテゴリー</label>
          <div className={classes.customSelect} ref={dropdownRef}>
            <div className={classes.selectDisplay} onClick={() => setIsOpen(!isOpen)}>
              {selectedCategoryNames || "カテゴリーを選択してください"}
              <span className={classes.arrow}>{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
              <ul className={classes.optionsList}>
                {categories.map((category) => {
                  const isChecked = selectedCategoryIds.includes(category.id);
                  return (
                    <li 
                      key={category.id} 
                      className={`${classes.optionItem} ${isChecked ? classes.selected : ''}`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <input type="checkbox" checked={isChecked} readOnly />
                      <span className={classes.optionName}>{category.name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
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