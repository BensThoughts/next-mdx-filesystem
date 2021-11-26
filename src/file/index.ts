import fs from 'fs';

export const readDir = (dir: string): fs.Dirent[] => {
  return fs.readdirSync(dir, {withFileTypes: true});
};

export const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf-8');
};

export const doesPathExist = (path: string): boolean => {
  return fs.existsSync(path);
};

export const isPathDir = (path: string): boolean => {
  return fs.statSync(path).isDirectory();
};

export const isPathFile = (path:string): boolean => {
  return fs.statSync(path).isFile();
};

export const getFileModifiedDate = (path: string): string => {
  const date = fs.statSync(path).mtime;
  return formatDate(date);
};

export const formatDate = (date: Date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}` +
    `-${date.getUTCDate()}`;
};
