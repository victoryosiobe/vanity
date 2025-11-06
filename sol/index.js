const { availableParallelism } = require("os");
const { Worker } = require("worker_threads");
const { performance } = require("node:perf_hooks");
const numWorkers = availableParallelism();
const prompt = require("../io");

(async () => {
  const { prefix, suffix } = await prompt();
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
