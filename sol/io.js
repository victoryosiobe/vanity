const readline = require("readline");
const V = require("./v.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const valid = (str) => /^[a-zA-Z0-9]*$/.test(str);

const ask = (query, callback) => {
  rl.question(query, (answer) => {
    answer = answer.trim();
    if (!valid(answer)) {
      console.log("[STD_IN] Only letters and numbers are allowed.\n");
      ask(query, callback); // ask again
    } else {
      callback(answer);
    }
  });
};

ask("What prefix for address? ", (prefix) => {
  ask("What suffix for address? ", (suffix) => {
    console.log(`Prefix: ${prefix}`);
    console.log(`Suffix: ${suffix}`);
    V(prefix, suffix);
    rl.close();
  });
});
