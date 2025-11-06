# vanity/evm

**This folder will generate wallets for all EVM-compatible chains. This includes ETH, BNB, POLY, SEI and more.**

> [!NOTE]
>
> Evm wallets addresses, are in lowercase. So, vanity will become case insensitve on your inputs, here.
>
> Generation is currently slowed due to the PBKDF2 algorithm. I'll implement solutions to skip mnemonic generation.

> [!IMPORTANT]
>
> Wallets with prefixes or suffixes containing characters beyond f (i.e., g to z) are impossible because EVM addresses are strictly hexadecimal. (0-9, a-f chars only)
>
> Vanity will flag such inputs before it begins grinding endlessly.
