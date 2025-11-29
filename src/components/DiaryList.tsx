import { useMemo, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryList.css';
import type { DiaryEntry } from '../types/diary';
import Button from './Button';
import DiaryItem from './DiaryItem';

type SortType = 'latest' | 'oldest';

interface DiaryListProps {
  data: DiaryEntry[];
}

const DiaryList = ({ data }: DiaryListProps) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState<SortType>('latest');

  const onChangeSortType = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortType(value as SortType);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      }
      return Number(b.createdDate) - Number(a.createdDate);
    });
  }, [data, sortType]);

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button onClick={() => nav('/new')} text={'새 일기 쓰기'} type="POSITIVE" />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
