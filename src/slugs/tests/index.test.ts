/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */

import getAllSlugs from '../index';

describe('getAllSlugs', () => {
  const {directories, mdxArticles} = getAllSlugs();
  test.concurrent('should get all of the slugs for directories', () => {
    expect(directories).toStrictEqual([
      {
        'params': {
          'slug': ['design'],
        },
      },
      {
        'params': {
          'slug': ['drafts'],
        },
      },
      {
        'params': {
          'slug': ['google-cloud-articles'],
        },
      },
      {
        'params': {
          'slug': ['react-articles'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'second-level'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'second-level', 'third-level'],
        },
      },
    ]);
  });
  test.concurrent('should get all of the slugs for mdxArticles', () => {
    expect(mdxArticles).toStrictEqual([
      {
        'params': {
          'slug': ['empty-article'],
        },
      },
      {
        'params': {
          'slug': ['no-frontmatter-article'],
        },
      },
      {
        'params': {
          'slug': ['root-article'],
        },
      },
      {
        'params': {
          'slug': ['design', 'design-article-1'],
        },
      },
      {
        'params': {
          'slug': ['design', 'design-article-2'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'draft-1'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'draft-2'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'second-level', 'second-level-article'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'second-level', 'third-level', 'third-level-article'],
        },
      },
      {
        'params': {
          'slug': ['google-cloud-articles', 'google-cloud-article-1'],
        },
      },
      {
        'params': {
          'slug': ['react-articles', 'react-article-1'],
        },
      },
      {
        'params': {
          'slug': ['react-articles', 'react-article-2'],
        },
      },
      {
        'params': {
          'slug': ['react-articles', 'react-article-3'],
        },
      },
    ]);
  });
});
