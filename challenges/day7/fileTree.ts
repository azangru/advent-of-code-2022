class FileTree {
  root: Directory;

  constructor() {
    this.root = new Directory('/');
  }

  printTree() {
    this.printDirectory(this.root)
  }

  // for debugging purposes
  printDirectory(directory: Directory) {
    console.log('directory', directory.name);
    console.log('files of directory', directory.name);
    for (const file of directory.files) {
      console.log(file.name);
    }
    directory.childrenDirectories.forEach(childDirectory => {
      console.log('directory', childDirectory.name, 'inside', directory.name)
      this.printDirectory(childDirectory);
    });
  }
}

export class Directory {

  parentDirectory: Directory | null = null;
  childrenDirectories: Directory[] = [];
  files: MyFile[] = [];

  name: string;

  constructor(name: string, parentDirectory: Directory | null = null) {
    this.name = name;
    if (parentDirectory) {
      this.parentDirectory = parentDirectory;
    }
  }

  findChildDirectory(name: string) {
    const directory = this.childrenDirectories.find(directory => directory.name === name);
    if (!directory) {
      throw `Directory ${name} not found!`;
    }
    return directory;
  }

  addFile(file: MyFile) {
    this.files.push(file);
  }

  addDirectory(directory: Directory) {
    directory.parentDirectory = this;
    this.childrenDirectories.push(directory);
  }

  getSize(): number {
    const ownFilesSize = this.files.reduce((acc, file) => acc + file.size, 0);
    const childDirectoriesSize = this.childrenDirectories.reduce((acc, dir) => acc + dir.getSize(), 0);

    return ownFilesSize + childDirectoriesSize;
  }

}

class MyFile {

  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

}

/**
 * Can an instructions parser be a generator? Now, that's a thought...
 * 
 * Start with the file tree. Have root directory created
 * Skip ls lines? Or maybe use it to read output
 * If a line starts with dir, create a directory and append it to parent
 * If a line starts with number, create a file and append it to parent
 * 
 * When you see the cd command, then unless it's cd('/'):
 * - if followed by a letter, get this directory
 * - if followed by a '..', get parent directory
 */
export const createFileTree = (input: string) => {
  const fileTree = new FileTree();
  const parsedInstructions = createParsedInstructions(input);
  
  let currentDirectory: Directory | null = null;

  for (const instruction of parsedInstructions) {
    if (instruction.type === 'command' && instruction.command === 'cd') {
      if (instruction.argument === '/') {
        currentDirectory = fileTree.root;
      } else if (instruction.argument === '..') {
        currentDirectory = currentDirectory?.parentDirectory as Directory;
      } else {
        const directory = currentDirectory?.findChildDirectory(instruction.argument);
        currentDirectory = directory as Directory;
      }
    } else if (instruction.type === 'output') {
      const { output } = instruction;
      for (const item of output) {
        if (item.type === 'directory') {
          const newDirectory = new Directory(item.name);
          currentDirectory?.addDirectory(newDirectory);
        } else if (item.type === 'file') {
          const newFile = new MyFile(item.name, item.size);
          currentDirectory?.addFile(newFile);
        }
      }
    }
  }

  return fileTree;
};

export function* createParsedInstructions (input: string) {
  const lines = input.split('\n');
  let output: Array<{ type: 'directory', name: string } | { type: 'file', name: string, size: number }> = [];

  for (const line of lines) {
    if (line.startsWith('$')) {
      if (output.length) {
        yield { type: 'output' as const, output };
        output = [];
      }
      // interpret this as a command
      const [, command, argument] = line.split(' ');
      const message = { type: 'command' as const, command, argument };
      yield message;
    } else {
      if (line.startsWith('dir')) {
        const [, name] = line.split(' ');
        output.push({ type: 'directory', name });
      } else {
        const [size, name] = line.split(' ');
        output.push({ type: 'file', size: parseInt(size), name });
      }
    }
  }

  yield { type: 'output' as const, output };
}