const fs = require("fs");
const path = require("path");

// Function to generate random data
function generateRandomData(length) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Write random data to a file
function writeRandomDataToFile(filePath, dataLength) {
  const data = generateRandomData(dataLength);
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("Data written to file", filePath);
    }
  });
}

// Define the file path and data length
const filePath = path.join(__dirname, "/generated/randomData.txt");
const dataLength = 100; // Change this to desired length of random data

// Write random data to file every 10 seconds
setInterval(() => {
  writeRandomDataToFile(filePath, dataLength);
}, 10000); // 10000 ms = 10 seconds

// Keep the script running
console.log(
  "Node.js app is running and writing random data to randomData.txt every 10 seconds."
);

// https://hub.docker.com/r/100xdevs/write-random

/*
  docker run 100xdevs/write-random

  docker exec -it container_id /bin/bash
  cat randomData.txt

  Volumes in docker

  If you want to persist data across container stops and starts, you can use Volumes in Docker

  Bind mounts
  Replace the mount on the left with a folder on your own machine
  docker run -v /Users/harkiratsingh/Projects/100x/mount:/usr/src/app/generated 100xdevs/write-random
  
  Volume Mounts
  Create a volume
  docker volume create hello
  
  Mount data to volume
  docker run -v hello:/usr/src/app/generated 100xdevs/write-random
   
  If you stop the container in either case, the randomFile.txt file persists
*/
