"use client";

import { useState } from 'react';
import classes from '@/app/admin/_styles/AdminEdit.module.scss';
import { PostForm } from '@/app/admin/_components/PostForm';
import { useRouter } from 'next/navigation';
import { useGetCategories, useCreatePost } from '@/app/admin/_hooks';

export default function AdminCreatePage() {
  // 画面表示用フック
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // 記事情報操作用フック
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const { categories, fetched: catFetched } = useGetCategories();
  const { createPost, isCreating } = useCreatePost();

  // カテゴリーのトグル処理
  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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

      <PostForm
        mode="create"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        selectedCategoryIds={selectedCategoryIds}
        toggleCategory={toggleCategory}
        categories={categories}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />
    </div>
  );
}