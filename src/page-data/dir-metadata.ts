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
import {DirMetadata} from 'interface';

export default function getDirectoryMetadata(fullPath: string): DirMetadata {
  const dirName = getFileName(fullPath);
  const dirMtimeDate = getFileModifiedDate(fullPath);
  const slug = getSlugFromFullPath(fullPath);
  const indexPath = getDirIndex(fullPath);
  const indexExists = doesPathExist(indexPath);
  if (!indexExists) {
    return {
      dirName,
      dirMtimeDate,
      dirMetadata: {
        title: dirName,
        date: dirMtimeDate,
        slug,
        description: null,
      },
    };
  } else {
    const indexYaml = readFile(indexPath);

    // TODO: parsedYaml is possible undefined if file is empty
    // TODO: typescript ignored the intersection here. fix?
    const parsedYaml = yaml.load(indexYaml) as {
      title?: string;
      date?: string;
      description?: string;
    } | undefined;

    if (parsedYaml) {
      return {
        dirName,
        dirMtimeDate,
        dirMetadata: {
          title: parsedYaml.title ? parsedYaml.title : dirName,
          date: parsedYaml.date ?
            parsedYaml.date :
            getFileModifiedDate(fullPath),
          slug,
          description: parsedYaml.description ? parsedYaml.description : null,
        },
      };
    } else {
      return {
        dirName,
        dirMtimeDate,
        dirMetadata: {
          title: dirName,
          date: getFileModifiedDate(fullPath),
          slug,
          description: null,
        },
      };
    }
  }
}
