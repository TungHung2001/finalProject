export interface IPaginationParams {
  pageNumber: number,
  pageSize: number,
}

export interface IPaginationResponse<T> {
  totalItem: number;
  items: T[];
}
