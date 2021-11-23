import {DirectoryData, MdxArticleData} from '../interface';

export function sortDirsByTitle<T>(arr: DirectoryData<T>[]) {
  return arr
      .sort((a, b) => {
        return (
          a.dirMetadata.title.toLocaleLowerCase() >
          b.dirMetadata.title.toLocaleLowerCase()
        ) ? 1 : -1;
      });
}

export function sortMdxArticlesByDate<T>(arr: MdxArticleData<T>[]) {
  return arr.sort((a, b) => (a.metadata.date < b.metadata.date) ? 1 : -1);
}
