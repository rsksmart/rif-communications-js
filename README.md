# RIF Communication lib.js

[![CircleCI](https://flat.badgen.net/circleci/github/rsksmart/rif-communications-js)](https://circleci.com/gh/rsksmart/rif-communications-js/)
[![Dependency Status](https://david-dm.org/rsksmart/rif-communications.svg?style=flat-square)](https://david-dm.org/rsksmart/rif-communications-js)
[![](https://img.shields.io/badge/made%20by-IOVLabs-blue.svg?style=flat-square)](http://iovlabs.org)
[![](https://img.shields.io/badge/project-RIF%20Storage-blue.svg?style=flat-square)](https://www.rifos.org/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Managed by tAsEgir](https://img.shields.io/badge/%20managed%20by-tasegir-brightgreen?style=flat-square)](https://github.com/auhau/tasegir)
![](https://img.shields.io/badge/npm-%3E%3D6.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D10.0.0-orange.svg?style=flat-square)

> Library for decentralized communication build as part of RIF OS

## Table of Contents

- [Install](#install)
  - [npm](#npm)
  - [Use in a browser with browserify, webpack or any other bundler](#use-in-a-browser-with-browserify-webpack-or-any-other-bundler)
- [Usage](#usage)
- [API](#api)
- [CLI](#cli)
- [Contribute](#contribute)
- [License](#license)

## Install

### npm

```sh
> npm install @rsksmart/rif-communications
```

## Usage

### Import the library

```js
var RifCommunications = require('@rsksmart/rif-communications');
```

### Initialization

```js
// Create a key or load from a secure storage to skip this step
var key = await RifCommunications.createKey();

// Create peer id
var peerId = await RifCommunications.createPeerIdFromJSON(key);

// Create peer information
var peerInfo = await RifCommunications.createPeerInfo(peerId);

// Create your peer node
var node = RifCommunications.createNode(peerInfo, host, port, sendMsgFunc);

// Connect to a bootnode using a multiaddress string
await RifCommunications.connectToNode(node, BOOTNODE_ADDRESS);
```

### Send a message to another peer

```js
// Create recipient from their public key (<recipientID>)
var recipient = await RifCommunications.createPeerIdFromPublicKey(recipientID);

// Send a message
await RifCommunications.sendMsg(node, recipient, message, msgNonce);
```


## API

## Contribute

There are some ways you can make this module better:

- Consult our [open issues](https://github.com/rsksmart/rif-communications-js/issues) and take on one of them
- Help our tests reach 100% coverage!


## License

[MIT](./LICENSE)
