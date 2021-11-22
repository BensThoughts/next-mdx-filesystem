import {
  MdxArticleData,
} from '../interface';

import {
  getSlugFromFullPath,
  getFileName,
  getDirIndex,
} from '../path';

import {
  doesPathExist,
  getFileModifiedDate,
  readFile,
} from '../file';

import matter from 'gray-matter';
import yaml from 'js-yaml';


export function getMdxData<T>(
    fullPath: string,
    includeContent: boolean,
): MdxArticleData<T> {
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
      ...data as T,
      date,
      title,
      slug,
    },
    content: includeContent ? content : null,
  };
}

export function getDirectoryMetadata(fullPath: string) {
  const dirName = getFileName(fullPath);
  const indexPath = getDirIndex(fullPath);
  const indexExists = doesPathExist(indexPath);
  if (!indexExists) {
    return {
      title: dirName,
      date: getFileModifiedDate(fullPath),
      slug: getSlugFromFullPath(fullPath),
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
      slug: getSlugFromFullPath(fullPath),
      description: parsedYaml.description ? parsedYaml.description : null,
    };
  }
}
