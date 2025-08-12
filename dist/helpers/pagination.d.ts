interface ObjectPagination {
    currentPage: number;
    limitItems: number;
    skip: number;
    totalPage?: number;
}
declare const paginationHelper: (objectPagination: ObjectPagination, query: Record<string, any>, countRecords: number) => ObjectPagination;
export default paginationHelper;
