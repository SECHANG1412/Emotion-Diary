import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find((item) => String(item.id) === String(id));

    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
      return;
    }

    // ⭐ 핵심 FIX: StrictMode 경고 제거 — 비동기로 setState 실행
    Promise.resolve().then(() => {
      setCurDiaryItem(currentDiaryItem);
    });
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
