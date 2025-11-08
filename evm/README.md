# vanity/evm

**This folder will generate wallets for all EVM-compatible chains. This includes ETH, BNB, POLY, SEI and more.**

> [!NOTE]
>
> Evm wallets addresses, are in lowercase. So, vanity will become case insensitve on your inputs, here.
>
> Vanity is limited to generating private keys here, skipping mnemonics entirely for maximum speed.

> [!IMPORTANT]
>
> Wallets with prefixes or suffixes containing characters beyond f (i.e., g to z) are impossible because EVM addresses are strictly hexadecimal. (0-9, a-f chars only)
>
> Vanity will flag such inputs before it begins grinding endlessly.
