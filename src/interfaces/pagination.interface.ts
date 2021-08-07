export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationQuery {
  category?: string;
  title?: string | RegExp;
}
