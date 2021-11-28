import { Expand, PageData, StaticPath, PageDataOpts } from '../interface';
export declare class MdxFilesystem<T = {}> {
    /**
     *
     * @param {string} args.slugArray - The slug array for the current path..
     * @param {'tree' | 'array'} args.dirOptions.returnType - The return type of
     * directory when isDirectory is true. Can be 'tree' or 'array'
     * @param {boolean} args.dirOptions.shallow - true when you only want to
     * search and return data about the current directory. false when you want
     * all of the data in the sub-directories below it as well.
     * @param {boolean} args.dirOptions.reSortArray - when the returned directory
     * data is an array this states if it should be sorted alphabetically or not.
     *
     */
    getPageData<R extends 'tree' | 'array' = 'tree'>(args?: Expand<PageDataOpts<R>>): Promise<Expand<PageData<T, R>>>;
    getSlugs(): Expand<StaticPath>[];
}
