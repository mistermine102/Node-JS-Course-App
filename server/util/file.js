const fs = require("fs");

exports.getContentFromFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, fileContent) => {
      if (err) {
        return reject(err);
      } else {
        resolve(JSON.parse(fileContent));
      }
    });
  });
};
