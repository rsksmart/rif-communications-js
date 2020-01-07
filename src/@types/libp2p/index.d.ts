declare module 'libp2p' {

  class Multiaddr {
    constructor(addr?: Multiaddr | null | string | Buffer)
  }

  class MultiaddrSet {
    public add: (a: Multiaddr) => {}
  }

  class PeerInfo {
    id: any;
    multiaddrs: MultiaddrSet;
    constructor (peerId: PeerId)
  }

  class PeerId {
    constructor(id: any, privKey: any, pubKey: any);
    toB58String: () => string;
  }

  export default class Libp2p {
    constructor(_options: any);
    dht: any;

    /**
     * Dials to the provided peer. If successful, the `PeerInfo` of the
     * peer will be added to the nodes `PeerBook`
     *
     * @param {PeerInfo|PeerId|Multiaddr|string} peer The peer to dial
     * @param {function(Error)} callback
     * @returns {void}
     */
    dial: (peer: PeerInfo | PeerId | Multiaddr | string, callback: any) => void;

    start: (callback: any) => void;
  }
}
