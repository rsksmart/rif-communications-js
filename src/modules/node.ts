import { ConnectionMode } from '../types'

import libp2p from 'libp2p'
import KadDHT from 'libp2p-kad-dht'
import Mplex from 'libp2p-mplex'
import SECIO from 'libp2p-secio'
import WS from 'libp2p-websockets'
import Wstar from 'libp2p-webrtc-star'
import WebRTCDirect from 'libp2p-webrtc-direct'

import wrtc from 'wrtc'

/**
 * Represents a peer node.
 */
export class Node extends libp2p {
  /**
   * Creates a node.
   *
   * @param _options inherited options from libp2p
   * @param mode ConnectionMode for the node
   */
  constructor (_options: any, mode: ConnectionMode) {
    const upgrader = {
      upgradeInbound: (maConn: () => {}) => maConn,
      upgradeOutbound: (maConn: () => {}) => maConn
    }

    const ws = new WS({ upgrader })

    const transportOption = []

    if (mode === ConnectionMode.WebRTC) {
      transportOption.push(new Wstar({ wrtc: wrtc }))
    }

    if (mode === ConnectionMode.WebRTCDirect) {
      transportOption.push(new WebRTCDirect({upgrader: upgrader}))
    }

    const transport = [ws, ...transportOption]

    const config: any = {
      dht: {
        enabled: true,
        kBucketSize: 20
      },
      // Not needed to make explicit, but we can put webrtc discovery as disabled
      peerDiscovery: {
        autoDial: false
      }
    }

    if (mode !== ConnectionMode.WebRTCDirect) {
      config.peerDiscovery = {
        autoDial: false,
        webRTCStar: {
          enabled: false
        }
      }
    }

    const defaults = {
      modules: {
        transport: transport,
        streamMuxer: [Mplex], // Stream multiplexer, we can dial several times to a node and we'll only have one connection with the different
        // protocols being multiplexed, it should also be a bidirectional connection
        connEncryption: [SECIO], // TLS 1.3 "like" crypto channel, hasn't been audited yet, libp2p will
        // eventually move to true TLS 1.3 once the spec is finalized and an implementation available
        // we add the DHT module that will enable Peer and Content Routing
        // The connection will present a crypto challenge to the user to prove that it owns the private key
        // Corresponding to the peerID (H(PublicKey)) of the multiaddress
        // More info about secio: https://github.com/auditdrivencrypto/secure-channel/blob/master/prior-art.md#ipfss-secure-channel
        // peerDiscovery: [wrtcStar.discovery],
        dht: KadDHT // This also resolves Peer discovery (routing) via serendipity (Random Walk on the DHT)
      },
      config: config
    }

    super({ ..._options, ...defaults })
  }
}

/**
 * Shortcut for Node(options, ConnectionMode.Socket)
 *
 * @deprecated will be removed in the next minor release. Use Node class instead.
 */
export class WebSocketBundle extends Node {
  constructor (_options: any) {
    super(_options, ConnectionMode.Socket)
  }
}

/**
 * Shortcut for Node(options, ConnectionMode.WebRTC)
 *
 * @deprecated will be removed in the next minor release. Use Node class instead.
 */
export class WebRTCBundle extends Node {
  constructor (_options: any) {
    super(_options, ConnectionMode.WebRTC)
  }
}

/**
 * Shortcut for Node(options, ConnectionMode.WebRTCDirect)
 *
 * @deprecated will be removed in the next minor release. Use Node class instead.
 */
export class WebRTCDirectBundle extends Node {
  constructor (_options: any) {
    super(_options, ConnectionMode.WebRTCDirect)
  }
}
