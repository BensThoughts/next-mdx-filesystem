
import {
  Expand,
  SlugData,
} from '../interface.js';

import {readDir} from '../file/index.js';
import {
  getFullPathFromSlug,
  getSlugFromFullPath,
  slugArrayToString,
  slugToArray,
  getDirentData,
} from '../path/index.js';

import {
  POSTS_DIR,
} from '../config/index.js';


function getSlugsInDir(cwd: string):Expand<SlugData> {
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
      fullPath,
    } = getDirentData(cwd, dirent);
    const slugPath = getSlugFromFullPath(fullPath);
    if (!isDirectory && isMdx) {
      slugData.mdxArticles.push({
        params: {
          slug: slugToArray(slugPath),
        },
      });
    } else if (isDirectory && !isExcludedPath) {
      slugData.directories.push({
        params: {
          slug: slugToArray(slugPath),
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
