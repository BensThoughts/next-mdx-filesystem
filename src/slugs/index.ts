import {
  Expand,
  StaticPath,
} from '../interface';

import fs from 'fs';
import path from 'path';
import {
  SlugData,
} from '../interface';
import {getDirentData} from '../file';
import {
  getSlugPath,
  slugArrayToString,
  slugStringToArray,
} from '../path';

const {
  EXCLUDED_PROD_DIRS,
  DIR_INDEX_FILE,
  POSTS_DIR,
} = {
  POSTS_DIR: './',
  EXCLUDED_PROD_DIRS: [''],
  DIR_INDEX_FILE: 'index.yaml',
};


function getSlugsInDir(cwd: string): SlugData {
  const slugData: SlugData = {
    directories: [],
    mdxArticles: [],
  };
  const dirents = fs.readdirSync(cwd, {withFileTypes: true});
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
          slug: slugStringToArray(slugPath),
        },
      });
    } else if (isDirectory && !isExcludedPath) {
      slugData.directories.push({
        params: {
          slug: slugStringToArray(slugPath),
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
    const nextDir = path.parse(slugArrayToString(slug));
    const nextCwd = path.join(cwd, nextDir.name);
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
 * the way down the file system tree.
 * @returns {params: {slug: string[]}}[]
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