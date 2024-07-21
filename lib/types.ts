export interface StoriesProps {
  id: string;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants: number;
}

export interface PaginationProps {
  totalStories: number;
  storiesPerPage: number;
  currentPage: number | any;
  onPageChange: any;
  className?: string;
}
