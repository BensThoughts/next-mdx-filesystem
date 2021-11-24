# next-mdx-filesystem

Do you want to strongly type the shape of you mdx front matter data in your
next.js project? This package is for you. Do you want to organize your articles
into folders that represent categories but don't want to write an algorithm that
will correctly walk through them all recursively and give you back all of the
mdx and directory metadata? This package is for you.

This package provides 2 functions that read the contents of a directory and give
you back the data in a format that is easy for react components to consume.
While this could be used outside of a next.js project it was designed to be used
inside of next.js `getStaticProps()` and `getStaticPaths()`.

>#### Important Note: The directory and .mdx file names become a part of the slug path. They need to use a slug friendly separator such as hyphens. Example: 'react-articles' is *good* 'react articles' is *bad*. 'react-article.mdx' is *good* 'react article.mdx' is *bad*


## Configuration

Configuration can be placed into `mdx-filesystem.config.json` at the root of a
project.

It should take the form of

```ts
{
  "postsDir": string, // Default "mdx-posts"
  "excludedProdDirs": Array<string>, // Default []
  "dirIndexFile": string, // Default "index.yaml"
}
```

`postsDir` is the primary directory where all of your mdx files are stored. It
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

`date` should take the form *yyyy-mm-dd*. By default `title` and `date` will
always be included in the metadata of a directory.  If there is no index file in
a directory the name of the directory and the last modified date will be used
for `title` and `date` respectively.

> Note: There are plans to allow for custom date formatting in the future but as
> of now dates are always *yyyy-mm-dd*. The order of your posts in the output is
> based on this assumption.


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
matter data. By default your mdx metadata will always include `title`, `date`,
and `slug`. If an mdx file fails to provide any of them in its front matter,
sensible defaults will be given back to you. `title` will become the name of the
file. `date` will become the files last modified date as (*yyyy-mm-dd*). `slug`
is unique in that it cannot be set manually within your front matter and will
always be given to you based on the filesystem path to the file.

## Function: `getSlugs()`

>`getSlugs()` should be called from within `getStaticPaths()` inside of `[...slug].tsx`

`getSlugs()` is used to tell next.js about all of the routes that exist based on
the file structure of your mdx directory. Your mdx directory is the directory
you set `postsDir` to in your `mdx-filesystem.config.json` file.

`getSlugs()` can be used inside of a next.js catch all route. Specifically it
should be used inside of a page named `[...slug].tsx`.  You can read more about
catch all routes in the next.js docs [here](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes).

**Example** use in `/pages/blog/[...slug].tsx`:

```ts
import {MdxFilesystem} from 'next-mdx-filesystem';
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>();

export const getStaticPaths: GetStaticPaths = async (params) => {
  const slugs = mdxFilesystem.getSlugs();
  return {
    paths: slugs,
    fallback: false,
  };
};
```

getSlugs returns `StaticPath[]`, an array of `StaticPath` objects. It can be
used directly and easily in getStaticPaths. It is the exact format that next.js
expects for `paths`.

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

> **If the route that the slug points to is a directory** then `isDirectory`
> will be `true` and the property `directory` will exist. `directory` will
> contain all of the metadata about that directory and the mdx articles in it.

> **If the route that the slug points to is an mdx article** then `isDirectory`
> will be `false` and the property `mdxFile` will exist.  `mdxFile` will
> contain all of the metadata and content for that mdx file.

## Arguments and Options: `getPageData()`

```ts
mdxFilesystem.getPageData(args?: {
  slugArray?: string[],
  dirOptions?: {
    returnType?: 'tree' | 'array', // defaults to 'tree'
    shallow?: boolean, // defaults to false
    reSortArray?: boolean, // defaults to true
  },
})
```

`slugArray` is the current path. If called in an `index.tsx` page you can leave
this option out. If called in a `[...slug].tsx` page `{params.slug}` can be
handed directly to `slugArray` to request data for that route. `{params.slug}`
is given to you by next.js and will be the slug array for the current route. See
examples in Calling `getPageData()`.



`dirOptions`:

- `returnType (defaults to 'tree')`: Choose the data structure you want to get
   back when the route is a directory. Valid options are `'tree'` or `'array'`.

- `shallow (defaults to false)`: When `true` the function returns just the
  articles and directories in the current directory path. When `false` the
  function recursively gives you back all directories, sub-directories, and mdx
  file metadata all the way down the filesystem tree starting at the current
  directory path.

- `reSortArray (defaults to true)`: When returnType is array this will resort
  the array alphabetically based on the title of each directory.



## Calling: `getPageData()`

>`getPageData()` should be called from within `getStaticProps()`.

If you are calling it from within an `index.tsx`, for example
`/pages/blog/index.tsx`, you can call it without the `slugArray` property and it
will give you back the `directory` property that contains all of the metadata
for the root directory of your mdx articles as configured by `postsDir` in the
configuration file `mdx-filesystem.config.json`.

#### **Example** use in `/pages/blog/index.tsx`:

```ts
import {MdxFilesystem} from 'next-mdx-filesystem';
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>();

export const getStaticProps: GetStaticProps = async () => {
  const {directory} = await mdxFilesystem.getPageData({
    dirOptions: {
      returnType: 'array',
      shallow: false,
      reSortArray: true,
    },
  });

  return {
    props: {
      directory,
    },
  };
};
```

If you are calling `getPageData()` from within `[...slug].tsx` for example
`/pages/blog/[...slug].tsx` you can fill in `slugArray` with `params.slug` as
given by next.js.


#### **Example** use in `/pages/blog/[...slug].tsx`:

```ts
import {serialize} from 'next-mdx-remote/serialize';
import {MdxFilesystem} from 'next-mdx-filesystem';
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>();

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slugArray = params!.slug as string[];
  const {isDirectory, directory, mdxFile} =
    await mdxFilesystem.getPageData({
      slugArray,
      dirOptions: {
        returnType: 'tree',
        shallow: false,
      },
    });

  if (isDirectory) {
    return {
      props: {
        isDirectory,
        directory,
      },
    };
  } else {
    const mdxSource = await serialize(mdxFile?.content || '');
    const metadata = mdxFile?.metadata || null;
    return {
      props: {
        isDirectory,
        mdxFile: {
          content: mdxSource,
          metadata,
        },
      },
    };
  }
};

```

The example above uses `next-mdx-remote/serialize` to serialize the mdx file
into something that can be rendered by next.js but you are free to do whatever
you want with the data.


## Return Data Structures: `getPageData()`

The return structure of `getPageData()` is...

```ts
{
  isDirectory: boolean,
  directory: DirectoryTree<T> | DirectoryData<T>[],
  mdxFile: MdxFileData<T>
}
```

`isDirectory`: will be `true` if slug given to `slugArray` points to a directory
and will be `false` if the slug points to a .mdx file.  

`directory`: If the slug points to a directory path `directory` will contain
either a [`DirectoryTree<T>`](#DirectoryTree) or a
[`DirectoryData<T>[]`](#DirectoryData) array depending on the `returnType`
dirOption, the default is `'tree'`. See below for the structure of
these objects.

`mdxFile` If the slug points to an .mdx file `mdxFile` will contain an
[`MdxFileData<T>`](#MdxFileData) object with the articles content and metadata.

`T` is the shape of *your* mdx metadata as given when you imported and
created the MdxFilesystem class.

Listed below are the 3 main data structures that may be returned by
`getPageData()`.


#### MdxFileData:

If the route points to an mdx article `isDirectory` will be `false` and the `mdxFile` property will contain...

```ts
interface MdxFileData<T> {
  fileName: string;
  mtimeDate: string;
  content: string | null;
  metadata: MdxMetadata<T>
}

type MdxMetadata<T> = {
  slug: string;
  title: string;
  date: string;
} & T
```

If `title` is not in the mdx front matter it will be equal to the `fileName`.

If `date` is not in the mdx front matter it will be equal to the `mtimeDate` as
yyyy-mm-dd.

`slug` is always equal to the slug path and cannot be manually set in mdx front
matter.

`T` is the shape of *your* metadata as you defined when you imported `next-mdx-filesystem`

#### DirectoryTree:

If the route points to a directory and `returnType` is set to `tree` (which is
default) then `isDirectory` will be `true` and the `directory`
property will contain a `DirectoryTree<T>`.

This is a recursive data structure. You can walk the entire directory tree with
it. When `dirOptions` `shallow` is set to `false` (which is default) all
sub-directories all the way down the filesystem tree will be included. Otherwise
it will just include the first level of sub-directories in the current directory.

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
  mdxFiles: MdxFileData<T>[]; // all of the mdx articles in the current dir
  directories: DirectoryTree<T>[]; // all of the directories in the current dir
}
```

`dirName`: the name of the directory as on the filesystem

`dirMtimeDate`: the last modified date of the directory as on the filesystem

`title`: the title as given in the index.yaml file stored in the directory or
the same as `dirName` if no title or index.yaml is given.

`date`: the date as given in the index.yaml file stored in the directory or the
same as `dirMtimeDate` if no date or index.yaml is given.

`slug`: the slug as would be used on your website, can be used to create a link
to a page that displays the contents of the directory.

`description`: the description as given in the index.yaml file stored in the
directory or `null` if no description or index.yaml is given.

`mdxFiles`: an array of every .mdx article that is stored in this directory.

`directories`: an array of `DirectoryTree<T>`s that are sub-directories within
the current directory.


#### DirectoryData
When the route points to a directory and `returnType` is set to `array`
`getPageData()` will return `DirectoryData<T>[]`, an array of data objects
representing directories and the .mdx articles they hold.

It is convenient for displaying a long list of all directories with links to the
.mdx articles they hold. You may want to use this return type on your main /blog
route.

When the `dirOption` `shallow` is `false` (which is default) the array will
contain all directories and sub-directories below the current directory.
Otherwise it will be of length 1 and only include the current directory.

When the `dirOption` `reSortArray` is `true` (which is the default) the array of
directories is sorted alphabetically by directory name.

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
    mdxFiles: MdxFileData<T>[]
}
```

`dirName`: the name of the directory as on the filesystem

`dirMtimeDate`: the last modified date of the directory as on the filesystem

`title`: the title as given in the index.yaml file stored in the directory or
the same as `dirName` if no title or index.yaml is given.

`date` the date as given in the index.yaml file stored in the directory or the
same as `dirMtimeDate` if no date or index.yaml is given.

`slug` the slug as would be used on your website, can be used to create a link
to a page that displays the contents of the directory.

`description` the description as given in the index.yaml file stored in the
directory or `null` if no description or index.yaml is given.

`mdxFiles` an array of every .mdx article that is stored in this directory.
