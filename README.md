# Vanity

<!-- [![CodeQL](https://github.com/victoryosiobe/vanity/actions/workflows/codeql.yml/badge.svg)](https://github.com/victoryosiobe/vanity/security/code-scanning) -->

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Vanity is a CLI tool that helps you generate wallet addresses with custom text at the beginning or end.

**Example of a generated address on Solana: `FEEA1JcrDkKGs1fxoj3bigVJN6oG7UjDjXkQQBQkctUJ`**

> **Currently:** supports only Solana. Other chains coming later.

## Installation

Install by running:

```shell
git clone https://github.com/victoryosiobe/vanity
cd vanity
```

As more chains are added, you will be able to clone the repo for their specific chains.

## Usage

```shell
cd sol # Move into specific blockchain folder
node .
```

When running the CLI, you will be prompted for the prefix and suffix of the address you want to generate.

If you only need a prefix, leave the suffix field empty (and vice versa).

If you need both, fill in both fields.

> [!NOTE]
>
> Generating addresses with a longer prefix or suffix will take a lot of time to find one. Both together is usually very slow.
>
> Non-alphanumeric characters are not accepted as input in the fields.
>
> Fields you fill are case sensitive.
>
> Vanity is optimized to use as many CPU cores as possible to find your vanity address.
>
> Generation of vanity addresses never requires network connections.

> [!IMPORTANT]
>
> Keys for the vanity addresses are only available to you on your computer. They are not stored anywhere after Node.js exits its processes.
>
> You MUST copy the keys and keep them safely. Vanity doesn't keep records of them after finding them. If lost, they are lost for good.
>
> Avoid saving these keys in files. If your device is compromised, they could be hijacked.
>
> No warranty, use at your own risk.

## You bored?

I did grind for a wallet that ends with `pump`. Stuff blew my mind.

Should do better on good hardware. This was run on a MediaTek Helio P35 (MT6765) SoC.

```console
✅ [Thread 6] Found Match!
| PublicKey: CsRTKpWUvLCTmBDkYa12rxXCyn2n3ifT5qiudWh8pump
| Secret: 3M3i71TmBZLpXBGrwdQQpSkz2[...REDACTED...]xUq4AF8ZBLMiFMBAaToSW
| Thread 6 Attempts: 359017
| Total Logged Attempts: 443413000
| Time Taken: 767.95 seconds.
```
