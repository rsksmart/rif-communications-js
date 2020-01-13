import { create, createFromJSON, createFromPubKey, PeerId } from 'peer-id'
import { create as peerInfoCreate, PeerInfo } from 'peer-info'

/**
 * Creates a new PeerInfo instance from an existing PeerId.
 *
 * @param pId a PeerId
 *
 * @returns Promise<PeerInfo>
 */
export function createPeerInfo (pId: PeerId): Promise<PeerInfo> {
  return new Promise<PeerInfo>((resolve, reject) => {
    peerInfoCreate(pId, (err: Error, peer: PeerInfo) => {
      if (err) {
        reject(err)
      } else {
        resolve(peer)
      }
    })
  })
}

/**
 * Creates a PeerId from a JSON object.
 *
 * @param {object} keystoreJson - The JSON object that represents a keystore
 * @param {string} keystoreJson.id - The multihash encoded in base58
 * @param {string} keystoreJson.pubKey - The public key in protobuf format, encoded in base64
 * @param {string} keystoreJson.privKey - The private key in protobuf format, encoded in base64
 *
 * @returns Promise<PeerId>
 */
export function createPeerIdFromJSON (keystoreJson: any): Promise<PeerId> {
  return new Promise<PeerId>((resolve, reject) => {
    createFromJSON(keystoreJson, (err: Error, peerId: PeerId) => {
      if (err) {
        reject(err)
      } else {
        resolve(peerId)
      }
    })
  })
}

/**
 * Creates a Peer ID from a buffer containing a public key.
 *
 * @param publicKey public key or Buffer
 *
 * @returns Promise<PeerId>
 */
export function createPeerIdFromPublicKey (publicKey: string | Buffer): Promise<PeerId> {
  return new Promise<PeerId>((resolve, reject) => {
    createFromPubKey(publicKey, (err: Error, peerId: PeerId) => {
      if (err) {
        reject(err)
      } else {
        resolve(peerId)
      }
    })
  })
}

/**
 * Creates a new Peer ID, complete with public/private keypair.
 *
 * @returns Promise<PeerId>
 */
export function createKey (): Promise<PeerId> {
  const opts = {
    bits: 256,
    keyType: 'secp256k1'
  }
  return new Promise<PeerId>((resolve, reject) => {
    create(opts, (err: Error, peer: PeerId) => {
      if (err) {
        reject(err)
      } else {
        resolve(peer)
      }
    })
  })
}
