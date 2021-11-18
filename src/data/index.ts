import {
  IMdxArticleData,
} from '../interface';

import {
  getSlugPath,
  getFileName,
  getDirIndex,
} from '../path';

import {
  doesFileExist,
  getFileModifiedDate,
  readFile,
} from '../file';

import matter from 'gray-matter';
import yaml from 'js-yaml';


export function getBlogPostData<T>(
    fullPath: string,
    includeContent: boolean,
): IMdxArticleData<T> {
  const rawFileSource = readFile(fullPath);
  const slug = getSlugPath(fullPath);
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
      ...data as T,
      date,
      title,
      slug,
    },
    content: includeContent ? content : undefined,
  };
}

export function getDirectoryMetadata(fullPath: string) {
  const dirName = getFileName(fullPath);
  const indexPath = getDirIndex(fullPath);
  const indexExists = doesFileExist(indexPath);
  if (!indexExists) {
    return {
      title: dirName,
      date: getFileModifiedDate(fullPath),
      slug: getSlugPath(fullPath),
      description: null,
    };
  } else {
    const indexYaml = readFile(indexPath);
    const parsedYaml = yaml.load(indexYaml) as {
      title: string,
      date: string,
      description: string,
    };
    return {
      title: parsedYaml.title ? parsedYaml.title : dirName,
      date: parsedYaml.date ? parsedYaml.date : getFileModifiedDate(fullPath),
      slug: getSlugPath(fullPath),
      description: parsedYaml.description ? parsedYaml.description : null,
    };
  }
}
