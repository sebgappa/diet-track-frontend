export interface IPaged<T> {
    total: number;
    current: number;
    page: number;
    pageSize: number;
    data: T[];
}