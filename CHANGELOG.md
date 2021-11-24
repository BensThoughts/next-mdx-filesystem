# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.1.0-beta.0] - 2021-11-23

### Changed
- **IMPORTANT:** `mdxArticle` is now `mdxFile` throughout. It is more accurate,
  as mdx files do not have to be articles. This means the data returned for an
  mdx file with `getPageData()` now includes the property `mdxFile` instead of
  `mdxArticle`.
- Tree now sorts the directories alphabetically descending instead of ascending
  (A to Z) starting with A.
- Refactored the recursive tree algorithm.
- Separated integration and unit tests for tree and array modules.
- Updated tests. Moved the test-setup folder out of src. It contains the test
  blog directory structure and is not source code that should every be altered,
  only potentially added to for additional tests.
### Added
- Extracted an interface for MdxMetadata so that others can import it into
  their projects in the case they do not want to use any additional user defined
  metadata
- Extracted an interface for DirMetadata.
- Added more unit tests for mdx-data and dir-metadata modules.
- Added default empty object for T (user defined MdxMetadata) so that users can
  use DirectoryTree\<T>, DirectoryData\<T>, MdxFileData\<T>, and MdxMetadata\<T>
  without defining their own type.

## [0.0.9-beta.4] - 2021-11-22
### Changed
- Updated the README.md.
### Added
- Added tests for file, path, slugs, tree, dir-data, and mdx-data.

## [0.0.9-beta.3] - 2021-11-21
### Changed
- Reorganized the structure of the project to simplify data structures and
  modules.
- Filled in most of README.md. It now included basic examples of how to setup
  the library.
## [0.0.9-beta.2] - 2021-11-20
First release.