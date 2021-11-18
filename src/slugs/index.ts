
import {
  Expand,
  ISlugData,
} from '../interface';

import {getDirentData, readDir} from '../file';
import {
  getFullPathFromSlug,
  getSlugPath,
  slugArrayToString,
  slugPathToArray,
} from '../path';

import {
  POSTS_DIR,
} from '../config';

// const {
//   POSTS_DIR,
// } = {
//   POSTS_DIR: getPath('posts-mdx'),
// };


function getSlugsInDir(cwd: string):Expand<ISlugData> {
  const slugData: ISlugData = {
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
      // slugPath,
    } = getDirentData(cwd, dirent);
    const slugPath = getSlugPath(fullPath);
    if (!isDirectory && isMdx) {
      slugData.mdxArticles.push({
        params: {
          slug: slugPathToArray(slugPath),
        },
      });
    } else if (isDirectory && !isExcludedPath) {
      slugData.directories.push({
        params: {
          slug: slugPathToArray(slugPath),
        },
      });
    };
  });

  return slugData;
}

export function getAllSlugs(
    cwd = POSTS_DIR,
    slugData:ISlugData = {
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
