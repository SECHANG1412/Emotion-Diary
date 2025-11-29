import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Header from '../components/Header';
import { DiaryDispatchContext } from '../App';
import usePageTitle from '../hooks/usePageTitle';
import type { DiaryEditorInput } from '../types/diary';

const New = () => {
  const diaryDispatch = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  usePageTitle('새 일기 쓰기');

  if (!diaryDispatch) {
    throw new Error('Diary dispatch context is not available');
  }

  const { onCreate } = diaryDispatch;

  const onSubmit = (input: DiaryEditorInput) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header title={'새 일기 쓰기'} leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로 가기'} />} />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
