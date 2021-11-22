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
          'slug': ['design', 'using-overlays-for-elevation'],
        },
      },
      {
        'params': {
          'slug': ['design', 'why-not-to-use-a-component-library'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'ultimate-blog'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'ultimate-perfect-dark'],
        },
      },
      {
        'params': {
          'slug': ['drafts', 'second-level', 'second-level-article'],
        },
      },
      {
        'params': {
          'slug': [
            'drafts',
            'second-level',
            'third-level',
            'third-level-article',
          ],
        },
      },
      {
        'params': {
          'slug': ['google-cloud-articles', 'google-gke-cleanup'],
        },
      },
      {
        'params': {
          'slug': ['react-articles', 'headless-ui-drawer'],
        },
      },
      {
        'params': {
          'slug': ['react-articles', 'staggered-animation-2-ways'],
        },
      },
      {
        'params': {
          'slug': ['react-articles', 'stylish-typed-link-component'],
        },
      },
    ]);
  });
});
