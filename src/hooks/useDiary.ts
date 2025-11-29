import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import type { DiaryEntry } from '../types/diary';

const useDiary = (id: string | undefined) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState<DiaryEntry | undefined>(undefined);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;

    const currentDiaryItem = data.find((item) => String(item.id) === String(id));

    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      setCurDiaryItem(undefined);
      nav('/', { replace: true });
      return;
    }

    setCurDiaryItem(currentDiaryItem);
  }, [data, id, nav]);

  return curDiaryItem;
};

export default useDiary;
