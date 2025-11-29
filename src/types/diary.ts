export interface Emotion {
  emotionId: number;
  emotionName: string;
}

export interface DiaryEntry {
  id: number;
  createdDate: number;
  emotionId: number;
  content: string;
}

export interface DiaryEditorInput {
  createdDate: Date;
  emotionId: number;
  content: string;
}

export type DiaryAction =
  | { type: 'INIT'; data: DiaryEntry[] }
  | { type: 'CREATE'; data: DiaryEntry }
  | { type: 'UPDATE'; data: DiaryEntry }
  | { type: 'DELETE'; id: number };

export interface DiaryDispatch {
  onCreate: (createdDate: number, emotionId: number, content: string) => void;
  onUpdate: (id: number, createdDate: number, emotionId: number, content: string) => void;
  onDelete: (id: number) => void;
}
