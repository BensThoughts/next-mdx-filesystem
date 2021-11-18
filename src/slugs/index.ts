import path from 'path';

import {
  Expand,
  StaticPath,
  SlugData,
} from '../interface';

import {getDirentData, readDir} from '../file';
import {
  getFullPathFromSlug,
  // getPathFromSlugArr,
  getSlugPath,
  slugArrayToString,
  slugPathToArray,
} from '../path';

const {
  POSTS_DIR,
} = {
  POSTS_DIR: path.resolve(process.cwd(), 'posts-mdx'),
};


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

function getAllSlugs({
  cwd,
  slugData,
}: {
  cwd: string;
  slugData: SlugData;
}): SlugData {
  const {directories, mdxArticles} = getSlugsInDir(cwd);
  slugData.directories.push(...directories);
  slugData.mdxArticles.push(...mdxArticles);
  directories.forEach(({params: {slug}}) => {
    const nextCwd = getFullPathFromSlug(slugArrayToString(slug));
    slugData = getAllSlugs({
      cwd: nextCwd,
      slugData,
    });
  });

  return slugData;
};

/**
 * *Exported Function
 * Get all of the slugs in POSTS_DIR recursively all
 * the way down the file system tree. Test
 */

export function getSlugs(): Expand<StaticPath>[] {
  const {directories, mdxArticles} = getAllSlugs({
    cwd: POSTS_DIR,
    slugData: {
      directories: [],
      mdxArticles: [],
    },
  });

  return [...directories, ...mdxArticles];
};