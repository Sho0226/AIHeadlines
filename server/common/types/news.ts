export type newsProps = {
  articles?: {
    author: string;
    title: string;
    publishedAt: string;
    url: string;
    urlToImage: string;
  }[];
  title?: string;
  weatherNews?: {
    current: {
      temp: number;
      clouds: number;
      weather: {
        main: string;
        icon: string;
      }[];
    };
    daily: {
      dt: number;
      clouds: number;
      temp: {
        min: number;
        max: number;
      };
      weather: {
        id: number;
        icon: string;
      }[];
    }[];
  };
};
