import {
  MdxArticleData
} from '../interface';

import fs from 'fs';
import path from 'path';
import {
  getSlugPath,
  getFileName,
} from '../path';
import {
  getFileModifiedDate,
} from '../file';

import matter from 'gray-matter';
import yaml from 'js-yaml';

const {
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
  POSTS_DIR,
} = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: [''],
  DIR_INDEX_FILE: 'index.yaml',
};

export function getBlogPostData<T>(fullPath: string, includeContent: boolean): MdxArticleData<T> {
  const rawFileSource = fs.readFileSync(fullPath);
  const slug = getSlugPath(fullPath);
  const mtimeDate = getFileModifiedDate(fullPath);
  const fileName = getFileName(fullPath);
  const {content, data} = matter(rawFileSource);
  let {date, title} = data;
  date = date || mtimeDate;
  title = title || fileName;

  if (includeContent) {
    return {
      fileName,
      mtimeDate,
      metadata: {
        ...data as T,
        date,
        title,
        slug,
      },
      content,
    };
  } else {
    return {
      fileName,
      mtimeDate,
      metadata: {
        ...data as T,
        date,
        title,
        slug,
      },
    };
  }
}

export function getDirectoryMetadata(fullPath: string) {
  const dirName = path.basename(fullPath);
  const indexPath = path.join(fullPath, DIR_INDEX_FILE);
  const indexExists = fs.existsSync(indexPath);
  if (!indexExists) {
    return {
      title: dirName,
      date: getFileModifiedDate(fullPath),
      slug: getSlugPath(fullPath),
      description: null,
    };
  } else {
    const indexYaml = fs.readFileSync(indexPath, 'utf8');
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