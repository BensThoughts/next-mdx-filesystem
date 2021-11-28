/*eslint spaced-comment: ["off"] */
/*eslint max-len: ["off"] */
// import getDirectoryTree from '../tree';
// import {BlogArticleMetadata} from '../../test-interface';
describe('getDirectoryTree Integration', () => {
    describe('called with no options', () => {
        // const tree = getDirectoryTree<BlogArticleMetadata>();
        test.concurrent('should pass', () => {
        });
        // test.concurrent('tree should be complete', () => {
        //   expect(tree).toStrictEqual({
        //     dirName: 'blog-folder',
        //     dirMtimeDate: '2021-11-22',
        //     dirMetadata: {
        //       title: 'blog-folder',
        //       date: '2021-11-22',
        //       slug: '',
        //       description: null,
        //     },
        //     directories: [
        //       {
        //         dirName: 'google-cloud-articles',
        //         dirMtimeDate: '2021-11-22',
        //         dirMetadata: {
        //           title: 'a google cloud',
        //           date: '2021-11-22',
        //           slug: 'google-cloud-articles',
        //           description: 'articles about google cloud',
        //         },
        //         directories: [],
        //         mdxFiles: [
        //           {
        //             'fileName': 'google-cloud-article-1.mdx',
        //             'mtimeDate': '2021-11-22',
        //             'metadata': {
        //               'title': 'google cloud article 1',
        //               'description': 'the first google cloud article',
        //               'date': '2021-10-07',
        //               'tags': ['google-cloud', 'firstArticle', 'CSS'],
        //               'slug': 'google-cloud-articles/google-cloud-article-1',
        //             },
        //             'content': null,
        //           },
        //         ],
        //       },
        //       {
        //         dirName: 'design',
        //         dirMtimeDate: '2021-11-22',
        //         dirMetadata: {
        //           title: 'design',
        //           date: '2021-11-07',
        //           slug: 'design',
        //           description: 'articles about web design',
        //         },
        //         directories: [],
        //         mdxFiles: [
        //           {
        //             'fileName': 'design-article-2.mdx',
        //             'mtimeDate': '2021-11-23',
        //             'metadata': {
        //               'title': 'design article 2',
        //               'description': 'The second design article',
        //               'date': '2021-10-07',
        //               'tags': ['design', 'secondArticle', 'CSS'],
        //               'slug': 'design/design-article-2',
        //             },
        //             'content': null,
        //           },
        //           {
        //             'fileName':
        //             'design-article-1.mdx',
        //             'mtimeDate': '2021-11-23',
        //             'metadata': {
        //               'title': 'design article 1',
        //               'description': 'The first design article',
        //               'date': '2021-10-07',
        //               'tags': ['design', 'firstArticle', 'CSS'],
        //               'slug': 'design/design-article-1',
        //             },
        //             'content': null,
        //           },
        //         ],
        //       },
        //       {
        //         dirName: 'drafts',
        //         dirMtimeDate: '2021-11-22',
        //         dirMetadata: {
        //           title: 'drafts',
        //           date: '2021-05-01',
        //           slug: 'drafts',
        //           description: 'unfinished articles, these will not be included in the production build',
        //         },
        //         directories: [
        //           {
        //             dirName: 'second-level',
        //             dirMtimeDate: '2021-11-22',
        //             dirMetadata: {
        //               title: 'second-level',
        //               date: '2021-11-22',
        //               slug: 'drafts/second-level',
        //               description: null,
        //             },
        //             directories: [
        //               {
        //                 dirName: 'third-level',
        //                 dirMtimeDate: '2021-11-22',
        //                 dirMetadata: {
        //                   title: 'third level in yaml',
        //                   date: '2021-05-03',
        //                   slug: 'drafts/second-level/third-level',
        //                   description: 'these are third level articles',
        //                 },
        //                 directories: [],
        //                 mdxFiles: [
        //                   {
        //                     'fileName': 'third-level-article.mdx',
        //                     'mtimeDate': '2021-11-22',
        //                     'metadata': {
        //                       'title': 'first article in third level',
        //                       'description': 'a third level draft article',
        //                       'date': '2021-08-24',
        //                       'readTime': 20,
        //                       'tags': ['drafts', 'firstArticle', 'thirdLevel', 'CSS'],
        //                       'slug': 'drafts/second-level/third-level/third-level-article',
        //                     },
        //                     'content': null,
        //                   },
        //                 ],
        //               },
        //             ],
        //             mdxFiles: [
        //               {
        //                 'fileName': 'second-level-article.mdx',
        //                 'mtimeDate': '2021-11-22',
        //                 'metadata': {
        //                   'title': 'first article in second level',
        //                   'description': 'a second level draft article',
        //                   'date': '2021-08-24',
        //                   'readTime': 20,
        //                   'tags': ['drafts', 'firstArticle', 'secondLevel', 'CSS'],
        //                   'slug': 'drafts/second-level/second-level-article',
        //                 },
        //                 'content': null,
        //               },
        //             ],
        //           },
        //         ],
        //         mdxFiles: [
        //           {
        //             'fileName': 'draft-2.mdx',
        //             'mtimeDate': '2021-11-22',
        //             'metadata': {
        //               'title': 'draft article 2',
        //               'description': 'the second draft article',
        //               'date': '2021-10-07',
        //               'tags': ['drafts', 'secondArticle', 'CSS'],
        //               'slug': 'drafts/draft-2',
        //             },
        //             'content': null,
        //           },
        //           {
        //             'fileName': 'draft-1.mdx',
        //             'mtimeDate': '2021-11-22',
        //             'metadata': {
        //               'title': 'draft article 1',
        //               'description': 'the first draft article',
        //               'date': '2021-10-07',
        //               'tags': ['drafts', 'firstArticle', 'CSS'],
        //               'slug': 'drafts/draft-1',
        //             },
        //             'content': null,
        //           },
        //         ],
        //       },
        //       {
        //         dirName: 'react-articles',
        //         dirMtimeDate: '2021-11-22',
        //         dirMetadata: {
        //           title: 'react-articles',
        //           date: '2021-05-01',
        //           slug: 'react-articles',
        //           description: 'articles about react.',
        //         },
        //         directories: [],
        //         mdxFiles: [
        //           {
        //             'fileName': 'react-article-3.mdx',
        //             'mtimeDate': '2021-11-22',
        //             'metadata': {
        //               'title': 'react article 3',
        //               'description': 'the third react article',
        //               'date': '2021-10-07',
        //               'tags': ['react', 'thirdArticle', 'CSS'],
        //               'slug': 'react-articles/react-article-3',
        //             },
        //             'content': null,
        //           },
        //           {
        //             'fileName': 'react-article-2.mdx',
        //             'mtimeDate': '2021-11-22',
        //             'metadata': {
        //               'title': 'react article 2',
        //               'description': 'the second react article',
        //               'date': '2021-10-07',
        //               'tags': ['react', 'secondArticle', 'CSS'],
        //               'slug': 'react-articles/react-article-2',
        //             },
        //             'content': null,
        //           },
        //           {
        //             'fileName': 'react-article-1.mdx',
        //             'mtimeDate': '2021-11-22',
        //             'metadata': {
        //               'title': 'react article 1',
        //               'description': 'the first react article',
        //               'date': '2021-10-07',
        //               'tags': ['react', 'firstArticle', 'CSS'],
        //               'slug': 'react-articles/react-article-1',
        //             },
        //             'content': null,
        //           },
        //         ],
        //       },
        //     ],
        //     mdxFiles: [
        //       {
        //         'fileName': 'no-frontmatter-article.mdx',
        //         'mtimeDate': '2021-11-22',
        //         'metadata': {
        //           'date': '2021-11-22',
        //           'title': 'no-frontmatter-article.mdx',
        //           'slug': 'no-frontmatter-article',
        //         },
        //         'content': null,
        //       },
        //       {
        //         'fileName': 'empty-article.mdx',
        //         'mtimeDate': '2021-11-22',
        //         'metadata': {
        //           'date': '2021-11-22',
        //           'title': 'empty-article.mdx',
        //           'slug': 'empty-article',
        //         },
        //         'content': null,
        //       },
        //       {
        //         'fileName': 'root-article.mdx',
        //         'mtimeDate': '2021-11-22',
        //         'metadata': {
        //           'title': 'root article',
        //           'description': 'this is the root article',
        //           'date': '2021-08-24',
        //           'readTime': 20,
        //           'tags': ['rootLevel', 'testing'],
        //           'slug': 'root-article',
        //         },
        //         'content': null,
        //       },
        //     ],
        //   });
        // });
    });
});
