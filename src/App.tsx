import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';
import Notfound from './pages/Notfound';
import type { DiaryAction, DiaryDispatch, DiaryEntry } from './types/diary';

function reducer(state: DiaryEntry[], action: DiaryAction): DiaryEntry[] {
  let nextState: DiaryEntry[] = state;

  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE': {
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      nextState = state.map((item) => (item.id === action.data.id ? action.data : item));
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item) => item.id !== action.id);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext<DiaryEntry[]>([]);
export const DiaryDispatchContext = createContext<DiaryDispatch | null>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    try {
      const parsedData = JSON.parse(storedData) as unknown;
      if (!Array.isArray(parsedData)) {
        setIsLoading(false);
        return;
      }

      const normalizedData: DiaryEntry[] = parsedData
        .map((item) => ({
          id: Number(item.id),
          createdDate: Number(item.createdDate),
          emotionId: Number(item.emotionId),
          content: String(item.content ?? ''),
        }))
        .filter(
          (item) =>
            Number.isFinite(item.id) &&
            Number.isFinite(item.createdDate) &&
            Number.isFinite(item.emotionId) &&
            typeof item.content === 'string'
        );

      const maxId = normalizedData.reduce((max, item) => Math.max(max, item.id), 0);
      idRef.current = maxId + 1;

      dispatch({
        type: 'INIT',
        data: normalizedData,
      });
    } catch (error) {
      console.error('Failed to parse diary data', error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const onCreate: DiaryDispatch['onCreate'] = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate: DiaryDispatch['onUpdate'] = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete: DiaryDispatch['onDelete'] = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>;
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
