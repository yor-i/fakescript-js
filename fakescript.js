const fs = require('fs');
const prompt = require('prompt-sync')();

// Checking arguments and reading file
if (process.argv.length < 3) {
    console.log("File path should be given as the first argument.");
    return;
}

fs.readFile(process.argv[2], "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Interpreter starts here
  let lines = data.split('\n');

  // Only variable used in FakeScript
  let input = "";

  // Matches label name with its location 
  let labels = {};

  for (let i = 0; i < lines.length; i++) {
    let vals = lines[i].replace('\r', '').split(' ')

    if (vals[0] == "!label") {
        labels[vals[1]] = i
    }
  }

  // Looping through every line of the file
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace('\r', '').split(' ');

    switch (line[0]) {
        case "input":
            input = prompt("> ", "hi");
            break;
        case "print":
            if (line[1] != "#input") {
                console.log(line[1]);
            } else {
                console.log(input);
            }
            break;
        case "if":
            if (line[1] == "#input") line[1] = input;
            if (line[2] == "#input") line[2] = input;

            if (line[1] == line[2]) {
                i = labels[line[3]];
            }
            break;
        case "goto":
            if (line[1] == "#input") line[1] = input;
            
            i = labels[line[1]];
            break;
        case "stop":
            process.exit()
        }
    }
  }
);