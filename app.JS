const fs = require("fs/promise");

(async () => {
  const watcher = fs.watch("./");

  for await (const event of watcher) {
    console.log(event);
  }
})();
