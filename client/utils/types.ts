export interface NewsProps {
  query: string;
}

export interface ChatProps {
  setKeyword: (keyword: string) => void;
  resetChat: boolean;

  setResetChat: (reset: boolean) => void;
}
