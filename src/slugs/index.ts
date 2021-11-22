
import {
  SlugData,
} from '../interface.js';

import {readDir} from '../file/index.js';
import {
  getFullPathFromSlug,
  slugArrayToString,
  slugToArray,
  getPathData,
} from '../path/index.js';

import {
  POSTS_DIR,
} from '../config/index.js';


function getSlugsInDir(cwd: string):SlugData {
  const slugData: SlugData = {
    directories: [],
    mdxArticles: [],
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
      slugData.mdxArticles.push({
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
      mdxArticles: [],
    },
) {
  const {directories, mdxArticles} = getSlugsInDir(cwd);
  slugData.directories.push(...directories);
  slugData.mdxArticles.push(...mdxArticles);
  directories.forEach(({params: {slug}}) => {
    const nextCwd = getFullPathFromSlug(slugArrayToString(slug));
    slugData = getAllSlugs(nextCwd, slugData);
  });

  return slugData;
}
