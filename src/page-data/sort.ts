import {DirectoryData, MdxFileData} from '../interface';

export function sortDirsByTitle<T>(arr: DirectoryData<T>[]) {
  return arr
      .sort((a, b) => a.dirMetadata.title.localeCompare(b.dirMetadata.title));
}

export function sortMdxFilesByDate<T>(arr: MdxFileData<T>[]) {
  return arr.sort((a, b) => {
    const localeComparison = b.metadata.date.localeCompare(a.metadata.date);
    if (localeComparison === 0) {
      return a.metadata.title.localeCompare(b.metadata.title);
    } else {
      return localeComparison;
    }
  });
}
