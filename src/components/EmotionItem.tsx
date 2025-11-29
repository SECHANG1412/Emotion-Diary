import './EmotionItem.css';
import type { Emotion } from '../types/diary';
import { getEmotionImage } from '../util/get-emotion-image';

interface EmotionItemProps extends Emotion {
  isSelected?: boolean;
  onClick?: () => void;
}

const EmotionItem = ({ emotionId, emotionName, isSelected = false, onClick }: EmotionItemProps) => {
  return (
    <div onClick={onClick} className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ''}`}>
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
