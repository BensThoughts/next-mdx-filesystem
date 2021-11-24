
import {
  SlugData,
} from '../interface';

import {readDir} from '../file';
import {
  slugToArray,
  slugArrayToFullPath,
  getPathData,
} from '../path';

import {
  POSTS_DIR,
} from '../config';


function getSlugsInDir(cwd: string):SlugData {
  const slugData: SlugData = {
    directories: [],
    mdxFiles: [],
  };
  const dirents = readDir(cwd);
  dirents.forEach((dirent) => {
    const {
      isDirectory,
      isMdx,
      isExcludedPath,
      slug,
    } = getPathData(cwd, dirent);
    if (!isDirectory && isMdx) {
      slugData.mdxFiles.push({
        params: {
          slug: slugToArray(slug),
        },
      });
    } else if (isDirectory && !isExcludedPath) {
      slugData.directories.push({
        params: {
          slug: slugToArray(slug),
        },
      });
    };
  });

  return slugData;
}

export default function getAllSlugs(
    cwd = POSTS_DIR,
    slugData:SlugData = {
      directories: [],
      mdxFiles: [],
    },
) {
  const {directories, mdxFiles} = getSlugsInDir(cwd);
  slugData.directories.push(...directories);
  slugData.mdxFiles.push(...mdxFiles);
  directories.forEach(({params: {slug}}) => {
    const nextCwd = slugArrayToFullPath(slug);
    slugData = getAllSlugs(nextCwd, slugData);
  });

  return slugData;
}
