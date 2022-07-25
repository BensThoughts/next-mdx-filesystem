- **Notice:**

  - Please file any issues on the github repo. I am actively maintaining this and would like to ensure it remains cross compatible and functional.
  - Please DM me on twitter [@bensthoughts](https://twitter.com/bensthoughts) if
    you find this software useful, have a suggestion for improvement, or any
    other feedback about the project. I need a little motivation to continue
    working on this and your thoughts are important to me.

  ***

# next-mdx-filesystem

### Unit Test Coverage With Jest:

![statements](https://img.shields.io/badge/statements-100%25-brightgreen)
![branch](https://img.shields.io/badge/branch-100%25-brightgreen)
![functions](https://img.shields.io/badge/functions-100%25-brightgreen)
![lines](https://img.shields.io/badge/lines-100%25-brightgreen)

### Latest Version Works With:

- Latest Version: ![semver](https://img.shields.io/badge/semver-0.1.0--beta.8-blue)
- Tested With: ![nextjs
version](https://img.shields.io/badge/next.js-12.0.4-blue) - Should work on most versions
- Works On:
  ![Linux](https://img.shields.io/badge/Linux--brightgreen?logoColor=white&logo=linux)
  ![Mac](https://img.shields.io/badge/Mac--brightgreen?logo=apple) ![Windows](https://img.shields.io/badge/Windows--brightgreen?logo=windows)

Do you want to strongly type the shape of you mdx front matter data in your
next.js project? This package is for you. Do you want to organize your .mdx
articles into folders that represent categories but don't want to write an
algorithm that will correctly walk through them all recursively and give you
back all of the mdx and directory metadata? This package is for you.

This package provides 2 functions that read the contents of a directory and give
you back the data in a format that is easy for react components to consume.
While this could be used outside of a next.js project it was designed to be used
inside of next.js `getStaticProps()` and `getStaticPaths()`.

> **IMPORTANT NOTE:** The directory and .mdx file names become a part of the slug
> path. They need to use a slug friendly separator such as hyphens. Example:
> 'react-articles' is _good_ 'react articles' is _bad_.
> 'my-first-react-article.mdx' is _good_ 'my first react article.mdx' is _bad_

---

## Table of Contents

- Getting Started
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Importing With Typescript](#how-to-import-and-typescript-configuration)
- [Function `getSlugs()`](#function---getslugs)
- Function `getPageData()`
  - [Function Overview](#function---getpagedata)
  - [Argurments & Options](#arguments-and-options---getpagedata)
  - [Calling](#calling---getpagedata)
  - [Return Data Structures](#return-data-structures---getpagedata)
    - [MdxFileData](#mdxfiledata)
    - [DirectoryTree](#directorytree)
    - [DirectoryData](#directorydata)
- Complete Example
  - [Setup](#setup)
  - [File Structure](#file-structure)
  - [File to Route Mapping](#file-to-route-mapping)
  - [Example Files](#example-files)

---

## Installation

```bash
npm install --save next-mdx-filesystem
```

---

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

`dirIndexFile` is the name of a special file you can place into any
directory to specify the metadata for it. It is a great way to organize your
files by category using directories. Currently supported metadata
is YAML and includes these fields.

```yaml
title: string
date: string
description: string | undefined
```

By default `title` and `date` will always be included in the metadata of a
directory. If there is no index file in a directory the name of the directory
and the last modified date will be used for `title` and `date` respectively. Last modified `date` will take the form _yyyy-mm-dd_.

#### **Example** `index.yaml`:

```yaml
title: "Design Articles"
date: "2021-11-07"
description: "Articles about web design."
```

---

## How to import and Typescript configuration

next-mdx-filesystem allows you to type the metadata that you have within your
mdx front matter. To use either of the 2 functions next-mdx-filesystem provides
you will need to import it like this...

```ts
interface MyFrontMatterShape {
  slug: string;
  title: string;
  date: string;
  description?: string;
  readTime?: number;
}

import { MdxFilesystem } from "next-mdx-filesystem";
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>();
```

The type you place into `MdxFilesystem` defines the shape of your mdx front
matter data. By default your mdx metadata will always include `title`, `date`,
and `slug`. If an mdx file fails to provide any of them in its front matter,
sensible defaults will be given back to you.

- `title` will become the name of the file if none is given.
- `date` will become the files last modified date as (_yyyy-mm-dd_) if none is given.
- `slug` is unique in that it cannot be set manually within your front matter
  and will always be given to you based on the filesystem path to the file.

> **IMPORTANT NOTE:** If you give a file a date string it should be in the
> form _yyyy-mm-dd_. The order of your .mdx files in the output of
> `getPageData()` is most recent article first, and based on dates in the form
> _yyyy-mm-dd_. There are plans to allow for custom date formatting in the
> future but as of now dates are always _yyyy-mm-dd_.

---

## Function - `getSlugs`

> `getSlugs()` should be called from within `getStaticPaths()` inside of `[...slug].tsx`

`getSlugs()` is used to tell next.js about all of the routes that exist based on
the file structure of your mdx directory. Your mdx directory is the directory
you set `postsDir` to in your `mdx-filesystem.config.json` file or the default
of `./mdx-posts` in the root directory of your project.

`getSlugs()` can be used inside of a next.js catch all route. Specifically it
should be used inside of a page named `[...slug].tsx`. You can read more about
catch all routes in the next.js docs
[here](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes).

**Example** use in `./pages/blog/[...slug].tsx` ([goto complete example](#blog-article-page)):

```ts
import { MdxFilesystem } from "next-mdx-filesystem";
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
  };
}
```

---

## Function - `getPageData`

This is the meat and potatoes of next-mdx-filesystem. It is the function that
will give you all of the data for a directory or mdx file in an easy to
consume package for your react components.

When a user navigates to a route that is dynamic next.js will give you the
slug for that route within `getStaticProps()`. Given that there is no way to
know if a slug points to a directory or an mdx file prior to calling the
function it returns `isDirectory: boolean` as a property of the returned object.

You can use `isDirectory` within your react components or pages to conditionally
render an .mdx file or a listing of directory contents, depending if the route
pointed to a directory or .mdx file. See [Return Data
Structures](#return-data-structures---getpagedata) for more information.

### Arguments and Options - `getPageData`

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

`slugArray`: is the current path. If called in an `index.tsx` page you can leave
this option out. If called in a `[...slug].tsx` page `{params.slug}` can be
handed directly to `slugArray` to request data for that route. `{params.slug}`
is given to you by next.js and will be the slug array for the current route. See
examples in Calling `getPageData()`.

`dirOptions`:

- `returnType`: Choose the data structure you want to get back when the route is a directory. Valid options are `'tree'` or `'array'`. _Default is_ `'tree'`.

- `shallow`: When `true` the function returns just the files and directories in the current directory path. When `false` the function recursively gives you back all directories, sub-directories, and mdx file metadata all the way down the filesystem tree starting at the current directory path. _Default is_ `false`.

- `reSortArray`: When `returnType` is array this will resort the array of directories alphabetically based on the `title`. _Default is_ `true`.

---

### Calling - `getPageData`

> `getPageData()` should be called from within `getStaticProps()`.

If you are calling it from within an `index.tsx`, for example
`./pages/blog/index.tsx`, you can call it without the `slugArray` property and
it will give you back the `directory` property that contains all of the metadata
for the root directory of your mdx files.

_Note:_ The root directory for your .mdx files is the directory configured by
`postsDir` in the configuration file, `mdx-filesystem.config.json`, or the
default `./mdx-posts`.

#### **Example** use in `./pages/blog/index.tsx` ([goto complete example](#blog-article-list-page)):

```ts
import { MdxFilesystem } from "next-mdx-filesystem";
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>();

export const getStaticProps: GetStaticProps = async () => {
  const { directory } = await mdxFilesystem.getPageData({
    dirOptions: {
      returnType: "array",
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

#### **Example** use in `./pages/blog/[...slug].tsx` ([goto complete example](#blog-article-page)):

```ts
import { serialize } from "next-mdx-remote/serialize";
import { MdxFilesystem } from "next-mdx-filesystem";
const mdxFilesystem = new MdxFilesystem<MyFrontMatterShape>();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params!.slug as string[];
  const { isDirectory, directory, mdxFile } = await mdxFilesystem.getPageData({
    slugArray,
    dirOptions: {
      returnType: "tree",
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
    const mdxSource = await serialize(mdxFile?.content || "");
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

> **Note:** The example above uses `next-mdx-remote/serialize` to serialize the
> mdx file into something that can be rendered by next.js but you are free to do
> whatever you want with the data.

---

### Return Data Structures - `getPageData`

The object returned by `getPageData()` is...

```ts
{
  isDirectory: boolean,
  directory: DirectoryTree<T> | DirectoryData<T>[],
  mdxFile: MdxFileData<T>
}
```

`isDirectory`: will be `true` if the current route points to a
directory and will be `false` if it points to an .mdx file.

`directory`: If the current route points to a directory path `directory` will
contain either a [`DirectoryTree<T>`](#DirectoryTree) or a
[`DirectoryData<T>[]`](#DirectoryData) array depending on the `returnType`
that you set in the `dirOption` object when calling `getPageData()`. The default is `'tree'`.

`mdxFile`: If the route points to an .mdx file `mdxFile` will contain an
[`MdxFileData<T>`](#MdxFileData) object with the files content and metadata.

`T`: is the shape of _your_ mdx metadata as given when you imported and
created the MdxFilesystem class.

Listed below are the 3 main data structures that may be returned by
`getPageData()`.

#### MdxFileData

If the route points to an mdx file `isDirectory` will be `false` and the `mdxFile` property will contain...

```ts
interface MdxFileData<T> {
  fileName: string;
  mtimeDate: string;
  content: string | null;
  metadata: MdxMetadata<T>;
}

type MdxMetadata<T> = {
  slug: string;
  title: string;
  date: string;
} & Partial<T>;
```

If `title` is not in the mdx front matter it will be equal to the `fileName`.

If `date` is not in the mdx front matter it will be equal to the `mtimeDate` as
_yyyy-mm-dd_.

`slug`: is always equal to the slug path and cannot be manually set in mdx front
matter.

`T`: is the shape of _your_ metadata as you defined when you imported `next-mdx-filesystem`

#### DirectoryTree

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
  };
  mdxFiles: MdxFileData<T>[]; // all of the mdx files in the current dir
  directories: DirectoryTree<T>[]; // all of the directories in the current dir
};
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

`mdxFiles`: an array of every .mdx file that is stored in this directory.

`directories`: an array of `DirectoryTree<T>`s that are sub-directories within
the current directory.

#### DirectoryData

When the route points to a directory and `returnType` is set to `array`
`getPageData()` will return `DirectoryData<T>[]`, an array of data objects
representing directories and the .mdx files they hold.

It is convenient for displaying a long list of all directories with links to the
.mdx files they hold. You may want to use this return type on your main /blog
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
  };
  mdxFiles: MdxFileData<T>[];
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

`mdxFiles` an array of every .mdx file that is stored in this directory.

---

## Complete Examples

### Setup

#### 1. Start a New next.js Project With Typescript

- Check out the
  [next.js install guide](https://nextjs.org/docs/basic-features/typescript) for more details.

```bash
 npx create-next-app@latest --ts
```

#### 2. Install next-mdx-remote

This will be used to convert the .mdx file `content` property from a string to
react components. Check out the
[next-mdx-remote](https://www.npmjs.com/package/next-mdx-remote) package for
more details. You can use any MDX converter to convert the `content` from a
string to components, but I have found next-mdx-remote to be simple and
effective.

- In a terminal at the root of the next.js project

```bash
npm i --save next-mdx-remote
```

#### 3. Install next-mdx-filesystem

- In a terminal at the root of the next.js project

```bash
npm i --save next-mdx-filesystem
```

#### 4. Create a Directory to Hold .mdx Files/Folders

You can place your .mdx files into this directory. You can also create
sub-directories in here to hold .mdx files as well.

- In a terminal at the root of your next.js project

```bash
mkdir mdx-posts
```

#### 5. Create Directory Index Files (Optional)

If you would like custom metadata about each directory to be returned from
`getPageData()` you can place an `index.yaml` file into each directory. Check
out the [configuration](#configuration) section for more details.

- In a terminal inside one of your `mdx-posts` directories

```bash
touch index.yaml
```

- Open your favorite editor and edit `index.yaml` to look like

```yaml
title: "Design Articles"
date: "2021-11-07"
description: "Articles about web design."
```

#### 6. Create a Custom Config File (Optional)

If you would like to set some custom options for next-mdx-filesystem you can
create a config file. Check out the [configuration](#configuration) section for
more details.

- In a terminal at the root of your next.js project

```bash
touch mdx-filesystem.config.json
```

- Open your favorite editor and edit `mdx-filesystem.config.json` to look like

```json
{
  "postsDir": "./my-custom-folder",
  "excludedProdDirs": ["drafts"],
  "dirIndexFile": "index.yaml"
}
```

---

### File Structure

After setting up a fresh next.js project I have...

- Created some basic .mdx files and folders in `./mdx-posts`
- Added some `index.yaml` files to the folders to store the metadata for each folder.
- Created `./interfaces/index.ts`, `./pages/blog/index.tsx`, and
  `./pages/blog/[...slug].tsx`.

The folder structure should look similar to the following:

```bash
├── interfaces
│   └── index.ts
├── mdx-posts
│   ├── design
│   │   ├── design-article-1.mdx
│   │   ├── design-article-2.mdx
│   │   └── index.yaml
│   ├── drafts
│   │   ├── draft-1.mdx
│   │   ├── draft-2.mdx
│   │   ├── index.yaml
│   │   └── second-level
│   │       ├── second-level-article.mdx
│   │       ├── index.yaml
│   │       └── third-level
│   │           ├── index.yaml
│   │           └── third-level-article.mdx
│   ├── react-articles
│   │   ├── index.yaml
│   │   ├── react-article-1.mdx
│   │   ├── react-article-2.mdx
│   │   └── react-article-3.mdx
│   └── index.yaml
│   └── root-article-1.mdx
│   └── root-article-2.mdx
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── pages
│   ├── _app.tsx
│   ├── blog
│   │   ├── index.tsx
│   │   └── [...slug].tsx
│   └── index.tsx
├── public
│   ├── favicon.ico
│   └── vercel.svg
├── README.md
├── styles
│   ├── globals.css
│   └── Home.module.css
└── tsconfig.json
```

### File To Route Mapping

Directories and .mdx files will map to next.js routes like below...

- `./mdx-posts/` --> `http://localhost:3000/blog`
- `./mdx-posts/root-article-1.mdx` --> `http://localhost:3000/blog/root-article-1`
- `./mdx-posts/drafts` --> `http://localhost:3000/blog/drafts`
- `./mdx-posts/drafts/draft-1.mdx` -->
  `http://localhost:3000/blog/drafts/draft-1`

---

### Example Files

After filling in the code for `./interfaces/index.ts`,
`./pages/blog/index.tsx`, and `./pages/blog/[...slug].tsx` you will be able to
run `npm run dev` and navigate to http://localhost:3000/blog to see a list of
every article all the way down the directory tree.

You will also be able to navigate to a specific article or directory. For
example the article at http://localhost:3000/blog/react-articles/react-article-1
or the directory at http://localhost:3000/blog/drafts/second-level

The following shows the code for some of the files that have been added to the
starter next.js project.

#### Interface

In `./interfaces/index.ts` I have:

```ts
export interface BlogArticleMetaData {
  slug: string;
  title: string;
  date: string;
  description?: string;
  readTime?: number;
  tags?: string[];
}
```

Take note that `description`, `readTime`, and `tags` are possibly undefined.
All user given metadata is returned to you as a Partial so that you are aware of
the fact that it is possible to forget to include a piece of metadata in an .mdx
file. This is to help prevent rendering errors. `slug`, `title`, and `date` are
the only metadata guaranteed to exist because sensible defaults will be filled
in when they are missing.

#### Blog Article List Page

In `./pages/blog/index.tsx` I have:

```tsx
import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { BlogArticleMetaData } from "../../interfaces";

import { MdxFilesystem, DirectoryData } from "next-mdx-filesystem";
const mdxFilesystem = new MdxFilesystem<BlogArticleMetaData>();

export const getStaticProps: GetStaticProps = async () => {
  const { directory } = await mdxFilesystem.getPageData({
    dirOptions: {
      returnType: "array",
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

interface BlogArticleListProps {
  directory: DirectoryData<BlogArticleMetaData>[];
}

export default function BlogArticleListPage({
  directory,
}: BlogArticleListProps) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1>Array of DirectoryData:</h1>
      {directory.map((dir) => (
        <React.Fragment key={dir.dirMetadata.title}>
          <h2>
            <span className="text-icon-secondary">[&nbsp;</span>
            {dir.dirMetadata.title}
            <span className="text-icon-secondary">&nbsp;]</span>
          </h2>
          <div>
            {dir.mdxFiles.map((mdxFile) => (
              <div key={mdxFile.fileName}>
                <span style={{ color: "blue", textDecoration: "underline" }}>
                  <Link href={`/blog/${mdxFile.metadata.slug}`}>
                    {mdxFile.metadata.title}
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
```

#### Blog Article Page

In `./pages/blog/[...slug].tsx` I have:

```tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { BlogArticleMetaData } from "../../interfaces";
import { MdxFilesystem, DirectoryTree, MdxMetadata } from "next-mdx-filesystem";
const mdxFilesystem = new MdxFilesystem<BlogArticleMetaData>();

export const getStaticPaths: GetStaticPaths = (params) => {
  const slugs = mdxFilesystem.getSlugs();
  return {
    paths: slugs,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    throw new Error(`No params in getStaticProps: ${params}`);
  }

  if (!params.slug) {
    throw new Error(`No slug on params object: ${params.slug}`);
  }

  const slugArray = params.slug as string[];
  const { isDirectory, directory, mdxFile } = await mdxFilesystem.getPageData({
    slugArray,
    dirOptions: {
      returnType: "tree",
      shallow: true,
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
    const mdxSource = await serialize(mdxFile?.content ? mdxFile.content : "");
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

interface BlogArticlePageProps {
  isDirectory: boolean;
  directory?: DirectoryTree<BlogArticleMetaData>;
  mdxFile?: {
    content: MDXRemoteSerializeResult;
    metadata: MdxMetadata<BlogArticleMetaData>;
  };
}

export default function BlogArticlePage({
  isDirectory,
  directory,
  mdxFile,
}: BlogArticlePageProps) {
  if (isDirectory && directory) {
    const { dirMetadata, directories, mdxFiles } = directory;
    return (
      <section>
        <h2>Current Directory Metadata:</h2>
        <ul>
          <li>Dir Name: {directory.dirName}</li>
          <li>Dir Modified Date: {directory.dirMtimeDate}</li>
          <li>index.yaml title: {dirMetadata.title}</li>
          <li>index.yaml date: {dirMetadata.date}</li>
          {dirMetadata.description && (
            <li>index.yaml description: {dirMetadata.description}</li>
          )}
        </ul>
        <h2>Directories Under This Directory:</h2>
        <ol>
          {directories.map((dir) => (
            <li key={dir.dirName}>
              <span style={{ color: "blue", textDecoration: "underline" }}>
                <Link href={`/blog/${dir.dirMetadata.slug}`}>
                  {dir.dirMetadata.title}
                </Link>
              </span>
              {dir.dirMetadata.description && (
                <span>&nbsp;-&nbsp;{dir.dirMetadata.description}</span>
              )}
            </li>
          ))}
        </ol>
        <h2>Mdx Files:</h2>
        <ul>
          {mdxFiles.map((mdxFile) => (
            <li key={mdxFile.fileName}>
              <span style={{ color: "blue", textDecoration: "underline" }}>
                <Link href={`/blog/${mdxFile.metadata.slug}`}>
                  {mdxFile.metadata.title}
                </Link>
              </span>
              {mdxFile.metadata.description && (
                <span>&nbsp;-&nbsp;{mdxFile.metadata.description}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  } else if (mdxFile) {
    const { content, metadata } = mdxFile;
    return (
      <article>
        <h1>Current Article Metadata</h1>
        <ul>
          <li>Title: {metadata.title}</li>
          <li>Date: {metadata.date}</li>
          {metadata.readTime && <li>Read Time: {metadata.readTime}</li>}
          {metadata.description && <li>Description: {metadata.description}</li>}
          {metadata.tags && (
            <li>
              Tags:{" "}
              <ul>
                {metadata.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
        <hr />
        <MDXRemote {...content} />
      </article>
    );
  }
}
```

#### Example .mdx File

An example of a .mdx file `./mdx-posts/root-article-1.mdx` is

```mdx
---
title: "The Ultimate Perfect Dark Solution"
description: "Create the ultimate perfect dark mode in Next.js with Typescript"
date: "2021-08-29"
readTime: 30
tags:
  - "styled"
  - "react"
  - "@emotion"
  - "css"
  - "Typescript"
---

## The ultimate perfect dark solution

Setting out to build the ultimate dark mode was a...
```
