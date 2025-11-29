import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Header from '../components/Header';
import { DiaryDispatchContext } from '../App';
import useDiary from '../hooks/useDiary';
import usePageTitle from '../hooks/usePageTitle';
import type { DiaryEditorInput } from '../types/diary';

const Edit = () => {
  const params = useParams<{ id: string }>();
  const nav = useNavigate();
  const diaryDispatch = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);
  const diaryId = Number(params.id);
  const hasValidDiaryId = Number.isFinite(diaryId);

  usePageTitle(params.id ? `${params.id}번 일기 수정` : '일기 수정');

  if (!diaryDispatch) {
    throw new Error('Diary dispatch context is not available');
  }

  const { onDelete, onUpdate } = diaryDispatch;

  const onClickDelete = () => {
    if (!hasValidDiaryId) return;

    if (window.confirm('일기를 정말 삭제할까요? 삭제 시 복구할 수 없어요.')) {
      onDelete(diaryId);
      nav('/', { replace: true });
    }
  };

  const onSubmit = (input: DiaryEditorInput) => {
    if (!hasValidDiaryId) return;

    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(diaryId, input.createdDate.getTime(), input.emotionId, input.content);
      nav('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로 가기'} />}
        rightChild={<Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />}
      />
      <Editor initData={curDiaryItem ?? null} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
