import fs from 'fs';


export function readDir(dir: string) {
  return fs.readdirSync(dir, {withFileTypes: true});
}

export const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf-8');
};

export const doesPathExist = (path: string): boolean => {
  return fs.existsSync(path);
};

export const isPathDir = (path: string) => {
  return fs.statSync(path).isDirectory();
};

export const isPathFile = (path:string) => {
  return fs.statSync(path).isFile();
};

export const getFileModifiedDate = (path: string) => {
  const fullDate = fs.statSync(path).mtime;
  const date = `${fullDate.getUTCFullYear()}-${fullDate.getUTCMonth() + 1}` +
    `-${fullDate.getUTCDate()}`;
  return date;
};
