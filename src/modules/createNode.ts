import libp2p from 'libp2p'
import { WebRTCDirectBundle } from './node'
import Multiaddr from 'multiaddr'
import { PeerInfo } from 'peer-info'

/**
 * Tries to connect to another peer in the network, establishes the connection.
 *
 * @param origin - an instance of Libp2p with a custom PeerInfo
 * @param destination - a multiaddr string
 */
export function connectToNode (origin: libp2p, destination: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    origin.dial(destination, (err: any, val: any) => {
      if (err) {
        throw err
      } else {
        setTimeout(() => {
          resolve()
        }, 300)
      }
    })
  })
}

/**
 * Sends a message without expecting an answer.
 *
 * @param client - an instance of Libp2p with a custom PeerInfo
 * @param recipient - a PeerInfo instance
 * @param message - message text
 * @param msgNonce - message nonce
 * @param partialAddressing - enable destination id obfuscation
 */
export function sendMsg (
  client: libp2p,
  recipient: PeerInfo,
  message: string,
  msgNonce: number,
  partialAddressing?: boolean
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    client.dht.sendMessage(
      recipient.id,
      message,
      msgNonce,
      partialAddressing !== undefined ? partialAddressing : false,
      (err: Error) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

/**
 * Start the libp2p Node.
 *
 * @param node - libp2p node
 */
function startNode (node: libp2p): Promise<libp2p> {
  return new Promise<libp2p>((resolve, reject) => {
    node.start((err: Error) => {
      if (err) {
        reject(err)
      } else {
        resolve(node)
      }
    })
  })
}

/**
 * Creates a node with a callback send function.
 *
 * @param peerInfo - a PeerInfo instance
 * @param host - public ip or localhost
 * @param port - port
 * @param sendMsgFunc - callback send function
 *
 * @returns Promise<libp2p>
 */
export function createNode (
  peerInfo: PeerInfo,
  host: string,
  port: number,
  sendMsgFunc: any
): Promise<libp2p> {
  const node = new WebRTCDirectBundle({
    peerInfo
  })

  peerInfo.multiaddrs.add(
    new Multiaddr(`/ip4/${host}/tcp/${port}/http/p2p-webrtc-direct`)
  )

  return new Promise<libp2p>((resolve, reject) => {
    node.dht.registerListener(
      'kad-msg-received',
      (kadMsg: any) => {
        sendMsgFunc(kadMsg)
      },
      () => {
        resolve(startNode(node))
      }
    )
  })
}
