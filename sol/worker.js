"use strict";

const { workerData, parentPort } = require("worker_threads");
const { Keypair } = require("@solana/web3.js");
const bs58 = require("bs58");

const { prefix, suffix, id } = workerData;
const isPrefixAndSuffix = !!(prefix && suffix);
const isPrefix = !!(prefix && !suffix);
const isSuffix = !!(suffix && !prefix);

let check;
if (isPrefixAndSuffix) {
  check = (pub) => pub.startsWith(prefix) && pub.endsWith(suffix);
} else if (isPrefix) {
  check = (pub) => pub.startsWith(prefix);
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
  const keypair = Keypair.generate();
  const pub = keypair.publicKey.toBase58();

  attempts++;

  if (check(pub)) {
    const secretBase58 = bs58.encode(keypair.secretKey);
    parentPort.postMessage({
      found: true,
      id,
      secret: secretBase58,
      pub,
      attempts,
    });
    break;
  }

  if (attempts % 1000 === 0) {
    parentPort.postMessage({ id, progress: attempts });
  }
}
