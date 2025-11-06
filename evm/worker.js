"use strict";

const { workerData, parentPort } = require("worker_threads");
const ethers = require("ethers");

const { prefix, suffix, id } = workerData;
const isPrefixAndSuffix = !!(prefix && suffix);
const isPrefix = !!(prefix && !suffix);
const isSuffix = !!(suffix && !prefix);

let check;
if (isPrefixAndSuffix) {
  check = (pub) => pub.slice(2).startsWith(prefix) && pub.endsWith(suffix); //slice is forr the 0x.
} else if (isPrefix) {
  check = (pub) => pub.slice(2).startsWith(prefix);
} else if (isSuffix) {
  check = (pub) => pub.endsWith(suffix);
} else {
  process.exit(0);
}

let attempts = 0;

console.log(
  `[T${id}] Grinding for ${isPrefixAndSuffix ? `prefix "${prefix}" and suffix "${suffix}"` : isPrefix ? `prefix "${prefix}"` : `suffix "${suffix}"...`}`,
);

while (true) {
  // Generate random keypair directly (headless, no mnemonic)
  const wallet = ethers.Wallet.createRandom();
  const pub = wallet.address;

  attempts++;

  if (check(pub)) {
    const privateKey = wallet.privateKey;
    const phrase = wallet.mnemonic.phrase;
    parentPort.postMessage({
      found: true,
      id,
      secret: `${phrase} || ${privateKey}`,
      pub,
      attempts,
    });
    break;
  }

  if (attempts % 1000 === 0) {
    parentPort.postMessage({ id, progress: attempts });
  }
}
