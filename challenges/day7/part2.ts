import { createFileTree, type Directory } from './fileTree';

const AVAILABLE_DISK_SPACE = 70_000_000;
const MIN_REQUIRED_SPACE = 30_000_000;

const main = (input: string) => {
  const fileTree = createFileTree(input.trim());
  const allDirectories = getAllDirectories(fileTree.root);
  const rootDirectorySize = fileTree.root.getSize();
  const remainingSpace = AVAILABLE_DISK_SPACE - rootDirectorySize;
  const requiredSpace = MIN_REQUIRED_SPACE - remainingSpace;

  const allDirectorySizes = allDirectories.map(directory => directory.getSize());
  allDirectorySizes.sort((a, b) => a - b);

  return allDirectorySizes.find(size => size >= requiredSpace);
};

const getAllDirectories = (directory: Directory): Directory[] => {
  return [
    directory, 
    ...directory.childrenDirectories.flatMap(getAllDirectories)
  ];
};


export default main;