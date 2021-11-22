
import {
  SlugData,
} from '../interface';

import {readDir} from '../file';
import {
  // getFullPathFromSlug,
  slugArrayToFullPath,
  slugToArray,
  getPathData,
} from '../path';

import {
  POSTS_DIR,
} from '../config';


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
    // const nextCwd = getFullPathFromSlug(slugArrayToPath(slug));
    const nextCwd = slugArrayToFullPath(slug);
    slugData = getAllSlugs(nextCwd, slugData);
  });

  return slugData;
}
