# Intra Lightning⚡

Intra Lightning is a new lightning node implementation with focus in have new experience for users and node runners. It is built using the [Bitcoin Development Kit](https://bitcoindevkit.org), [Lightning Development Kit](https://lightningdevkit.org) Bitcoin-js and Lighting-js

**WARNING**: This software is in beta

## Run client in Rust (WIP)

**Pre Requiste**

- Rust
- Cargo
- LDK and BDK

Create new Rust project

```rust
$ cargo new intra_lightning
$ cd intra_lightning
```

## Cargo

Now you can the package in your machine development

```cargo.toml

[dependencies]
intra-lightning = "1.0.0"
ldk = "0.0.115"
bdk = "0.28.0"
bitcoin = "0.31"
secp256k1 = { version = "0.13", features = ["rand"] }
```
## Run client in Javascript (Beta functional)

**Pre Requisite**

- Git
- NPM
- Node.js

```npm
npm install bitcoinjs-lib
npm install lightning
```
