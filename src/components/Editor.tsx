import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';
import type { DiaryEditorInput, DiaryEntry } from '../types/diary';

interface EditorProps {
  onSubmit: (input: DiaryEditorInput) => void;
  initData?: DiaryEntry | null;
}

const Editor = ({ onSubmit, initData }: EditorProps) => {
  const [input, setInput] = useState<DiaryEditorInput>({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });
  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        createdDate: new Date(initData.createdDate),
        emotionId: initData.emotionId,
        content: initData.content,
      });
    }
  }, [initData]);

  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      createdDate: new Date(event.target.value),
    }));
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput((prev) => ({
      ...prev,
      content: event.target.value,
    }));
  };

  const onChangeEmotion = (emotionId: number) => {
    setInput((prev) => ({
      ...prev,
      emotionId,
    }));
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input name="createdDate" onChange={onChangeDate} value={getStringedDate(input.createdDate)} type="date" />
      </section>

      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => onChangeEmotion(item.emotionId)}
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea name="content" onChange={onChangeContent} placeholder="오늘은 어땠어요?" value={input.content} />
      </section>

      <section className="button_section">
        <Button onClick={() => nav(-1)} text="취소하기" />
        <Button onClick={onSubmitButtonClick} text="작성완료" type="POSITIVE" />
      </section>
    </div>
  );
};

export default Editor;
