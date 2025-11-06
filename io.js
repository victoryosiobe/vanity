const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const valid = (str) => /^[a-zA-Z0-9]*$/.test(str);

function ask(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      answer = answer.trim();
      if (!valid(answer)) {
        console.log("[STD_IN] Only letters and numbers are allowed.\n");
        resolve(ask(query)); // re-ask if invalid
      } else {
        resolve(answer);
      }
    });
  });
}

async function prompt() {
  let prefix, suffix;

  while (true) {
    prefix = await ask("What prefix for address? ");
    suffix = await ask("What suffix for address? ");

    if (prefix === "" && suffix === "") {
      console.log("[STD_IN] Prefix and suffix cannot both be empty.\n");
      continue;
    }

    break;
  }

  console.log(`Prefix: ${prefix}`);
  console.log(`Suffix: ${suffix}`);

  rl.close();
  return { prefix, suffix };
}

module.exports = prompt;
