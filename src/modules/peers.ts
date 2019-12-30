import { create, createFromJSON, createFromPubKey, PeerId } from 'peer-id'
import { create as peerInfoCreate, PeerInfo } from 'peer-info'

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
