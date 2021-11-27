import {
  MdxFileData,
  MdxMetadata,
} from '../interface';

import {
  getSlugFromFullPath,
  getFileName,
} from '../path';

import {
  getFileModifiedDate,
  readFile,
} from '../file';

import matter from 'gray-matter';
import {Expand} from '..';

export default function getMdxData<T>(
    fullPath: string,
    includeContent = true,
): MdxFileData<T> {
  const rawFileSource = readFile(fullPath);
  const slug = getSlugFromFullPath(fullPath);
  const mtimeDate = getFileModifiedDate(fullPath);
  const fileName = getFileName(fullPath);
  const {content, data} = matter(rawFileSource);
  let {date, title} = data;
  date = date || mtimeDate;
  title = title || fileName;

  return {
    fileName,
    mtimeDate,
    metadata: {
      ...data as Expand<MdxMetadata<T>>,
      date,
      title,
      slug,
    },
    content: includeContent ? content : null,
  };
}
