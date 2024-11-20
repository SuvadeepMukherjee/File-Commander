const fs = require("fs/promises");

(async () => {
  //commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      //we want to check whether we already have that file
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      //we already  have that file
      return console.log(`The file ${path} already exists`);
    } catch (e) {
      //we dont have that file , now we should create it
      const newFileHandle = await fs.open(path, "w");
      console.log("a new file was succesfully created");
      newFileHandle.close();
    }
  };
  const deleteFile = async (path) => {
    console.log(`Deleting ${path}`);
  };

  const renameFile = (oldPath, newPath) => {
    console.log(`Renaming ${oldPath} to ${newPath}`);
  };

  const addToFile = (path, content) => {
    console.log(`Adding to ${path}`);
    console.log(`Content:  ${content}`);
  };

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    //get the size of our file
    const size = (await commandFileHandler.stat()).size;

    //alocate our buffer with the size of the file
    const buff = Buffer.alloc(size);
    //the location at which we want to start filling our buffer
    const offset = 0;
    //how many bytes we want to read
    const length = buff.byteLength;
    //The posiion that we want to start reading the file from
    const position = 0;
    //we balways want to read the whole content(from begining all the way to the end)
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    //create a file

    //Create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    //delete a file
    //delete the file <path>
    if (command.inclues(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
    }

    //rename file
    // rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      renameFile(oldFilePath, newFilePath);
    }

    //add to file
    //add to the file <path> content :<content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content:");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);

      addToFile(filePath, content);
    }
  });

  //decoder 0011 => meaningful
  //encoder meaningful => 0011

  //watcher
  const watcher = fs.watch("./command.txt");

  for await (const event of watcher) {
    if (event.eventType === "change" && event.filename === "command.txt") {
      commandFileHandler.emit("change");
    }
  }
})();
