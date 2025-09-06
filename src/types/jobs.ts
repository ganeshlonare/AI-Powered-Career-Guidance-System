export interface JobItem {
  id: string;
  title: string;
  company: string;
  location?: string;
  type?: string;
  postedAt?: string;
  url?: string;
}

export interface JobsQuery {
  q?: string;
  location?: string;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
