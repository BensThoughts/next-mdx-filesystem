/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import getDirectoryTree from '../tree';

import {BlogArticleMetadata} from '../../test-interface';
import {DirectoryTree, MdxFileData} from '../../interface';
import {POSTS_DIR} from '../../config';
import path from 'path';

describe('getDirectoryTree', () => {
  describe('called with no options', () => {
    const tree = getDirectoryTree<BlogArticleMetadata>();
    test.concurrent('directories should be sorted alphabetically descending', () => {
      const isSorted = (arr: DirectoryTree<BlogArticleMetadata>[]) =>
        arr.every((v, i, a) => !i || a[i-1].dirMetadata.title <= v.dirMetadata.title);
      expect(isSorted(tree.directories)).toStrictEqual(true);
    });

    test.concurrent('base directory mdxFiles should be sorted by their date with most current first', () => {
      const isSorted = (arr: MdxFileData<BlogArticleMetadata>[]) =>
        arr.every((v, i, a) => !i || a[i-1].metadata.date >= v.metadata.date);
      expect(isSorted(tree.mdxFiles)).toStrictEqual(true);
    });

    test.concurrent('lower level directory mdxFiles should be sorted by their date with most current first', () => {
      const isSorted = (arr: MdxFileData<BlogArticleMetadata>[]) =>
        arr.every((v, i, a) => !i || a[i-1].metadata.date >= v.metadata.date);
      expect(tree.directories.every((dir) => isSorted(dir.mdxFiles))).toStrictEqual(true);
    });
    test.concurrent('there should be 3 files in mdxFiles prop', () => {
      expect(tree.mdxFiles.length).toStrictEqual(3);
    });
    test.concurrent('there should be 4 directories in directories prop', () => {
      expect(tree.directories.length).toStrictEqual(4);
    });
  });

  describe('called with shallow=true from POSTS_DIR', () => {
    const tree = getDirectoryTree<BlogArticleMetadata>(POSTS_DIR, true);

    test.concurrent('the directories in the directories prop should have no mdxFiles in them', () => {
      expect(tree.directories.every((dir) => (dir.mdxFiles.length === 0))).toStrictEqual(true);
    });
    test.concurrent('the directories in the directories prop should have no directories in them', () => {
      expect(tree.directories.every((dir) => (dir.directories.length === 0))).toStrictEqual(true);
    });
    test.concurrent('directories should be sorted alphabetically descending', () => {
      const isSorted = (arr: DirectoryTree<BlogArticleMetadata>[]) =>
        arr.every((v, i, a) => !i || a[i-1].dirMetadata.title <= v.dirMetadata.title);
      expect(isSorted(tree.directories)).toStrictEqual(true);
    });

    test.concurrent('base directory mdxFiles should be sorted by their date with most current first', () => {
      const isSorted = (arr: MdxFileData<BlogArticleMetadata>[]) =>
        arr.every((v, i, a) => !i || a[i-1].metadata.date >= v.metadata.date);
      expect(isSorted(tree.mdxFiles)).toStrictEqual(true);
    });
  });

  describe('called with shallow=false from POSTS_DIR/drafts', () => {
    const tree = getDirectoryTree<BlogArticleMetadata>(path.join(POSTS_DIR, 'drafts'), false);
    test.concurrent('the first level dir should have 2 mdx article in it', () => {
      expect(tree.mdxFiles.length).toStrictEqual(2);
    });
    test.concurrent('the first level dir should have 1 directory in it', () => {
      expect(tree.directories.length).toStrictEqual(1);
    });
    test.concurrent('the second level dir should have 1 mdx article in it', () => {
      expect(tree.directories[0].mdxFiles.length).toStrictEqual(1);
    });
    test.concurrent('the second level dir should have 1 directory in it', () => {
      expect(tree.directories[0].directories.length).toStrictEqual(1);
    });
    test.concurrent('the third level dir should have 1 mdx article in it', () => {
      expect(tree.directories[0].directories[0].mdxFiles.length).toStrictEqual(1);
    });
    test.concurrent('the third level dir should have 0 directories in it', () => {
      expect(tree.directories[0].directories[0].directories.length).toStrictEqual(0);
    });
  });
});
