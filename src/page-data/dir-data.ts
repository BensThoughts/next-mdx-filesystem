import yaml from 'js-yaml';

import {
  getDirIndex,
  getFileName,
  getSlugFromFullPath,
} from '../path';

import {
  doesPathExist,
  readFile,
  getFileModifiedDate,
} from '../file';

export default function getDirectoryMetadata(fullPath: string) {
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
