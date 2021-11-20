# next-mdx-filesystem

Ever wanted to define the shape of you mdx front matter data in your next.js
project? This package is for you. Ever wanted to organize you articles into
folders that represent categories but don't want to write an algorithm that will
correctly walk through them all recursively and give you back all of them mdx
and directory metadata? This package is also for you.

This package provides 2 functions that read the contents of a directory and give
you back the data in a format that is easy for react components to consume.
While this could be used outside of a next.js project it was designed to be used
inside of next.js `getStaticProps()` and `getStaticPaths()`.

>#### Important Note: If you want a directory to have more than one word you should name it with a slug friendly separator such as hyphens. Example: 'react-articles' is *good* 'react articles' is *bad*.


## Configuration

configuration can be placed into `mdx-filesystem.config.json` at the root of a
project.

It should take the form of

```ts
{
  "postsDir": string, // Default "mdx-posts"
  "excludedProdDirs": Array<string>, // Default []
  "dirIndexFile": string, // Default "index.yaml"
}
```

`postDir` is the primary directory where all of your mdx files are stored. It
can be a relative path, absolute path, or just the name of the directory if the
directory is in the root of the project.

`excludedProdDirs` is an array of folder names that you would like to exclude
from your production build. For example `["drafts"]`

`dirIndexFile` is the name of a special file that you can place into any
directory to specify the metadata for a directory. Currently supported metadata
is YAML and includes these fields. It is a great way to organize your articles
by category.

```yaml
title: string
date: string
description: string | undefined
```

`date` should take the form yyyy-mm-dd. By default `title` and `date` will
always be included in the metadata of a directory.  If there is no index file in
a directory the name of the directory and the last modified date will be used for title and date respectively.


## How to import and Typescript configuration

next-mdx-filesystem allows you to type the metadata that you have within your
mdx front matter.  To use either of the 2 functions next-mdx-filesystem provides
you will need to import it like this...

```ts
interface MyFrontMatterShape {
  slug: string,
  title: string,
  date: string,
  description: string,
  readTime: number
}

import {MdxFilesystem} from 'next-mdx-filesystem'
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>()
```

The type you place into `MdxFilesystem` defines the shape of your mdx front
matter data. By default your mdx metadata will always include title, date, and
slug. If an mdx file fails to provide any of them or you just don't define them,
sensible defaults will be given back to you. `title` will become the name of the
file. `date` will become the files last modified date as (yyyy-mm-dd). `slug` is
unique in that it cannot be set manually within your front matter and will
always be given to you based on the filesystem path to the file.

## Function: `getSlugs()`

>`getSlugs()` should be called from within `getStaticPaths()`

`getSlugs()` is used to tell next.js about all of the routes that exist based on
the file structure of your mdx directory. Your mdx directory is the directory
you set `postsDir` to in your `mdx-filesystem.config.json` file.

This can be used inside of a catch all next route that uses slug. i.e. a page named `[...slug].tsx`.

```ts
import {MdxFilesystem} from 'next-mdx-filesystem';
const mdxFilesystem = new MdxFilesystem<BlogArticleMetaData>();

export const getStaticPaths: GetStaticPaths = async (params) => {
  const slugs = mdxFilesystem.getSlugs();
  return {
    paths: slugs,
    fallback: false,
  };
};
```

getSlugs returns an array of `StaticPath` objects. It can be used directly and
easily in getStaticPaths. It is the exact format that next.js expects for `paths`.

```ts
interface StaticPath {
  params: {
    slug: string[];
  }
}
```

## Function Overview: `getPageData()`

This is the meat and potatoes of next-mdx-filesystem. It is the function that
will give you all of the data for a directory or mdx article in an easy to
consume package for your react components.

When a user navigates to a route that is dynamic next.js will give you the
slug for that route within `getStaticProps()`. Given that there is no way to
know if a slug points to a directory or an mdx file prior to calling the
function it returns `isDirectory: boolean` as a property of the returned object.
If the route that the slug points to is a directory then the property
`directory` will exist along with all of the metadata about that directory and
the mdx articles in it. If the route that the slug points to is an mdx article
then the property `mdxArticle` will exist and it will contain all of the
metadata and content for that mdx file.

## Calling: `getPageData()`

>`getPageData()` should be called from within `getStaticProps()`.

If you are calling it from within an `index.tsx`, for example
`/pages/blog/index.tsx`, you can call it without the `slugArray` property and it
will give you back the `directory` property that contains all of the metadata
for the root directory of your mdx articles as configured by `postsDir` in the
configuration file `mdx-filesystem.config.json`.

If you are calling it from within `[...slug].tsx` for example `/pages/blog/[...slug].tsx` you can feed it `params.slug` as given by next.js and it
will give you back an object with `isDirectory` that will tell you if
that path was a directory or an mdx article. If it was a directory the property
`directory` will contain a well organized data structure that represents all of
the metadata for the directories and mdx articles that exist in that directory.
If the path was an mdx article the property `mdxArticle` will contain a well
organized data structure that contains the articles content and metadata.

## Arguments and Options: `getPageData()`

```ts
getPageData(args?: {
  slugArray?: string[],
  dirOptions?: {
    returnType?: 'tree' | 'array', // defaults to 'tree'
    shallow?: boolean, // defaults to false
    reSortArray?: boolean, // defaults to true
  },
})
```

`slugArray` is the current path. If in `[...slug].tsx` page `{params.slug}` as given
by next.js will be the slug array given for the current route. `{params.slug}`
can be used for `slugArray` to request data for that route. If in `index.tsx`
this can be left out.

`dirOptions`

- `shallow`: When true the function returns just the articles and directories in the current slugArray directory. When true the function recursively gives you back all directories and mdxArticle data all the way down the filesystem tree starting at the current slugArray path. 

- `reSortArray`: When returnType is array this will resort the array
  alphabetically based on the title of each directory.

- `returnType`: Choose the data structure you want to get back when the route is a directory.

## Return Data Structures: `getPageData()`

The general return structure of `getPageData()` is...

```ts
{
  isDirectory: boolean,
  directory: DirectoryTree<T> | DirectoryData<T>[],
  mdxArticle: MdxArticleData<T>
}
```

Where T is the shape of *your* mdx metadata as given when you imported and
created the MdxFilesystem class. `DirectoryTree<T>` and `DirectoryData<T>[]`

Listed below are the 3 main data structures that may be returned by
`getPageData()`.


### MdxArticle Route:

If the route was an mdx article `isDirectory` will be `false` and the `mdxArticle` property will contain...

```ts
interface MdxArticleData<T> {
  fileName: string;
  mtimeDate: string;
  content: string | null;
  metadata: {
    title: string;
    date: string;
    slug: string;
  } & T;
}
```

If `title` is not in the mdx front matter it will be equal to the `fileName`.

If `date` is not in the mdx front matter it will be equal to the `mtimeDate` as
yyyy-mm-dd.

`slug` is always equal to the slug path and cannot be manually set in mdx front
matter.

`T` is the shape of *your* metadata as you defined when you imported `next-mdx-filesystem`

### Directory Route:

If the route was a directory `isDirectory` will be `true` and the `directory`
property will contain one of 2 data structures depending on the `returnType`
option.

If `returnType` is 'tree' the `directory` property will contain...

```ts
type DirectoryTree<T> = {
  dirName: string;
  dirMtimeDate: string;
  dirMetadata: {
    title: string;
    date: string;
    slug: string;
    description: string | null;
  }
  mdxArticles: IMdxArticleData<T>[]; // all of the mdx articles in the current dir
  directories: DirectoryTree<T>[]; // all of the directories in the current dir
}
```

This is a recursive data structure. You can walk the entire directory tree with
it. Given a react component that displays a list of the `directories`
property and all of the slugs within them you can let your users click through
the directory tree or with the `shallow` option set to false you could display
an entire directory tree all at once.

If the `returnType` is 'array' the `directory` property will contain an array of
`DirectoryData`...

```ts
interface DirectoryData<T> {
    dirName: string;
    dirMtimeDate: string;
    dirMetadata: {
      title: string;
      date: string;
      slug: string;
      description: string | null;
    }
    mdxArticles: MdxArticleData<T>[]
}[]
```

This is convenient for displaying a list of all directories (categories in most
cases) and the mdx articles they hold. You may want to use this return type on
your main /blog route.


## Examples

### Array example:

Given the files in the pages directory `/pages/blog/index.tsx` and
`/pages/blog/[...slug].tsx`.

/pages/blog/index.tsx...

```tsx
import type {GetStaticProps} from 'next';
import {MdxFilesystem, DirectoryData} from 'next-mdx-filesystem';
const mdxFilesystem = new MdxFilesystem<BlogArticleMetaData>();

interface BlogArticleMetaData {
  slug: string,
  title: string,
  date: string,
  description: string,
  readTime: number,
}

export const getStaticProps: GetStaticProps = async () => {
  const {directory} = await mdxFilesystem.getPageData({
      dirOptions: {
        returnType: 'array'
      }
  });

  return {
    props: {
      directory,
    },
  };
};

interface BlogPageProps {
  directory: {
    data: DirectoryData<BlogArticleMetaData>[];
  };
}

export default function BlogPage({directory}: BlogPageProps) {
  return (
    <div>
      {directory.map((dir) => {
        if (dir.mdxArticles.length > 0) {
          return (
            <React.Fragment key={dir.dirMetadata.title}>
              <div>
                {dir.dirMetadata.title}
              </div>
              <ul>
                {dir.mdxArticles.map(({metadata}) => (
                  <li key={metadata.slug}>
                    <Link href={`/blog${metadata.slug}`}>
                      {metadata.title}
                    </Link>
                    <span>
                      {metadata.date}
                    </span>
                    <span>
                      {metadata.description}
                    </span>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          );
        }
      })}
    </div>
  )
};
```

/pages/blog/[...slug].tsx...

```tsx
import {GetStaticPaths, GetStaticProps} from 'next';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {MdxFilesystem, DirectoryData} from 'next-mdx-filesystem';
const mdxFilesystem = new MdxFilesystem<BlogArticleMetaData>();

interface BlogArticleMetaData {
  slug: string,
  title: string,
  date: string,
  description: string,
  readTime: number,
}

interface SlugPageProps {
  isDirectory: boolean;
  directory?: DirectoryData<BlogArticleMetaData>[],
  article?: {
    content: MDXRemoteSerializeResult,
    metadata: BlogArticleMetaData,
  }
}

export default function SlugPage({
  isDirectory,
  directory,
  article,
}: SlugPageProps) {
  const router = useRouter();
  const currentRoute = router.asPath;

  if (isDirectory && directory) {
    if (Array.isArray(directory)) {
      return (
        <BlogListLayoutArr
          dirArr={directory}
        />
      );
    } else {
      return (
        <BlogListLayout
          dirTree={directory}
        />
      );
    }
  } else if (article) {
    return (
      <BlogLayout
        content={article.content}
        url={`${seoConfig.openGraph.url}${currentRoute}`}
        metadata={article.metadata}
      />
    );
  }
};

```