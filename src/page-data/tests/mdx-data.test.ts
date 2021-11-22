/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import {POSTS_DIR} from '../../config';
import path from 'path';
import getMdxData from '../mdx-data';
import {BlogArticleMetadata} from '../../test-setup/BlogArticleMetadata';

describe('getMdxData', () => {
  test.concurrent('content should be null when includeContent=false', () => {
    const articlePath = path.join(POSTS_DIR, 'root-article.mdx');
    const mdxArticle = getMdxData(articlePath, false);
    expect(mdxArticle.content).toStrictEqual(null);
  });
  test.concurrent('content should be a string when includeContent=true', () => {
    const articlePath = path.join(POSTS_DIR, 'root-article.mdx');
    const mdxArticle = getMdxData(articlePath, true);
    expect(typeof mdxArticle.content).toBe('string');
  });
  test.concurrent('content should be a string when includeContent is left out', () => {
    const articlePath = path.join(POSTS_DIR, 'root-article.mdx');
    const mdxArticle = getMdxData(articlePath);
    expect(typeof mdxArticle.content).toBe('string');
  });


  describe('should get mdx data correctly with full front matter present', () => {
    const articlePath = path.join(POSTS_DIR, 'root-article.mdx');
    const mdxArticle = getMdxData<BlogArticleMetadata>(articlePath);
    const {metadata} = mdxArticle;
    describe('base data is correct', () => {
      test.concurrent('fileName is correct', () => {
        expect(mdxArticle.fileName).toStrictEqual('root-article.mdx');
      });
      test.concurrent('mtimeDate is correct', () => {
        expect(mdxArticle.mtimeDate).toStrictEqual('2021-11-22');
      });
      test.concurrent('content is correct', () => {
        expect(mdxArticle.content).toStrictEqual('This is the root article content.');
      });
    });
    describe('default metadata is correctly overwritten', () => {
      test.concurrent('title is correct', () => {
        expect(metadata.title).toStrictEqual('root article');
      });
      test.concurrent('date is correct', () => {
        expect(metadata.date).toStrictEqual('2021-08-24');
      });
      test.concurrent('slug is correct', () => {
        expect(metadata.slug).toStrictEqual('root-article');
      });
    });
    describe('extra metadata is correct', () => {
      test.concurrent('description is correct', () => {
        expect(metadata.description).toStrictEqual('this is the root article');
      });
      test.concurrent('readTime is correct', () => {
        expect(metadata.readTime).toStrictEqual(20);
      });
      test.concurrent('tags are correct', () => {
        expect(metadata.tags).toStrictEqual(['rootLevel', 'testing']);
      });
    });
  });


  describe('should get mdx data correctly for an article with no front matter', () => {
    const articlePath = path.join(POSTS_DIR, 'no-frontmatter-article.mdx');
    const mdxArticle = getMdxData<BlogArticleMetadata>(articlePath);
    const {metadata} = mdxArticle;
    describe('base data is correct', () => {
      test.concurrent('fileName is correct', () => {
        expect(mdxArticle.fileName).toStrictEqual('no-frontmatter-article.mdx');
      });
      test.concurrent('mtimeDate is correct', () => {
        expect(mdxArticle.mtimeDate).toStrictEqual('2021-11-22');
      });
      test.concurrent('content is an empty string', () => {
        expect(mdxArticle.content).toStrictEqual('This is an article with no front matter.');
      });
    });
    describe('default metadata is correctly overwritten', () => {
      test.concurrent('title is correct', () => {
        expect(metadata.title).toStrictEqual('no-frontmatter-article.mdx');
      });
      test.concurrent('date is correct', () => {
        expect(metadata.date).toStrictEqual('2021-11-22');
      });
      test.concurrent('slug is correct', () => {
        expect(metadata.slug).toStrictEqual('no-frontmatter-article');
      });
    });
  });


  describe('should get mdx data correctly for an empty article', () => {
    const articlePath = path.join(POSTS_DIR, 'empty-article.mdx');
    const mdxArticle = getMdxData<BlogArticleMetadata>(articlePath);
    const {metadata} = mdxArticle;
    describe('base data is correct', () => {
      test.concurrent('fileName is correct', () => {
        expect(mdxArticle.fileName).toStrictEqual('empty-article.mdx');
      });
      test.concurrent('mtimeDate is correct', () => {
        expect(mdxArticle.mtimeDate).toStrictEqual('2021-11-22');
      });
      test.concurrent('content is an empty string', () => {
        expect(mdxArticle.content).toStrictEqual('');
      });
    });
    describe('default metadata is correctly overwritten', () => {
      test.concurrent('title is correct', () => {
        expect(metadata.title).toStrictEqual('empty-article.mdx');
      });
      test.concurrent('date is correct', () => {
        expect(metadata.date).toStrictEqual('2021-11-22');
      });
      test.concurrent('slug is correct', () => {
        expect(metadata.slug).toStrictEqual('empty-article');
      });
    });
  });
});
