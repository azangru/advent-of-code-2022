import { createFileTree, type Directory } from './fileTree';

const main = (input: string) => {
  const fileTree = createFileTree(input.trim());
  const allDirectories = getAllDirectories(fileTree.root);
  const smallDirectories = allDirectories.filter(directory => directory.getSize() <= 100_000);
  return smallDirectories.reduce((acc, dir) => acc + dir.getSize(), 0);
};

const getAllDirectories = (directory: Directory): Directory[] => {
  return [
    directory, 
    ...directory.childrenDirectories.flatMap(getAllDirectories)
  ];
};


export default main;