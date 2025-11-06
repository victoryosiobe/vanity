const { availableParallelism } = require("os");
const { Worker } = require("worker_threads");
const { performance } = require("node:perf_hooks");
const numWorkers = availableParallelism();
const prompt = require("../io");

(async () => {
  let { prefix, suffix } = await prompt();
  validateOrExit(prefix, suffix); // will exit if invalid
  prefix = prefix.toLowerCase(); //evm chains only lowercase pub key.
  suffix = suffix.toLowerCase();
  const start = performance.now();
  const numThreads = numWorkers - 1 || 1; //if only 1 as numberofWorkers maximum, use it. Else, use maximum - 1 core.
  let finished = false;
  let reportedProgress = 0;

  console.log(
    `[VANITY] Starting full-throttle grind on ${numThreads} threads...`,
  );

  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker("./worker.js", {
      workerData: { prefix, suffix, id: i + 1 },
    });

    worker.on("message", (msg) => {
      if (msg.progress) {
        reportedProgress += Number(msg.progress);
        console.log(`[T${msg.id}] Attempts: ${msg.progress}`);
      }
      if (msg.found && !finished) {
        finished = true;
        const duration = (performance.now() - start) / 1000;
        console.log(`\n✅ [Thread ${msg.id}] Found Match!`);
        console.log(` | PublicKey: ${msg.pub}`);
        console.log(` | Secret: ${msg.secret}`);
        console.log(` | Thread ${msg.id} Attempts: ${msg.attempts}`);
        console.log(` | Total Logged Attempts: ${reportedProgress}`);
        console.log(` | Time Taken: ${duration.toFixed(2)} seconds`);
        process.exit(0); // Kill all threads
      }
    });

    worker.on("error", (err) => {
      console.error(`❌ Worker ${i + 1} failed:`, err);
    });
  }
})();

function validateOrExit(prefix, suffix) {
  const hexRegex = /^[0-9a-f]*$/;

  if (!hexRegex.test(prefix) || !hexRegex.test(suffix)) {
    console.error(
      "[VANITY] ❌ Invalid prefix or suffix: must only contain hex characters 0-9 and a-f",
    );
    process.exit(1);
  }
}
