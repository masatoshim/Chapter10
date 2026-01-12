"use client";

import classes from '@/app/admin/_styles/AdminEdit.module.scss';
import { useRouter } from 'next/navigation';

interface CategoryFormProps {
  mode: 'create' | 'edit';
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
  onDelete?: () => void;
  isLoading: boolean;
}

export const CategoryForm = (props: CategoryFormProps) => {
  const router = useRouter();

  return (
    <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
      <fieldset disabled={props.isLoading} className={classes.fieldset}>
        <div className={classes.field}>
          <label>カテゴリー名</label>
          <input
            type="text"
            placeholder={props.mode === 'create' ? "例: プログラミング, 日記など" : ""}
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
          />
        </div>

        <div className={classes.actionButtons}>
          <button
            type="button"
            className={classes.updateBtn}
            onClick={props.onSubmit}
          >
            {props.isLoading ? (props.mode === 'create' ? "作成中..." : "更新中...") : (props.mode === 'create' ? "作成" : "更新")}
          </button>

          {props.mode === 'edit' ? (
            <button 
              type="button" 
              className={classes.deleteBtn}
              onClick={props.onDelete}
            >
              削除
            </button>
          ) : (
            <button 
              type="button" 
              className={classes.deleteBtn}
              onClick={() => router.back()}
            >
              キャンセル
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
};