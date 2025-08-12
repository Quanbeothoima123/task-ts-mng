interface ObjectSearch {
    keyword: string;
    regex?: RegExp;
}
declare const searchHelper: (query: Record<string, any>) => ObjectSearch;
export default searchHelper;
