import PeerId from 'peer-id'
import PeerInfo from 'peer-info'

/**
 * Creates a new PeerInfo instance from an existing PeerId.
 *
 * @param pId a PeerId
 *
 * @returns Promise<PeerInfo>
 */
export function createPeerInfo (pId: PeerId): Promise<PeerInfo> {
  return PeerInfo.create(pId)
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
  return PeerId.createFromJSON(keystoreJson)
}

/**
 * Creates a Peer ID from a buffer containing a public key.
 *
 * @param publicKey public key or Buffer
 *
 * @returns Promise<PeerId>
 */
export function createPeerIdFromPublicKey (publicKey: string | Buffer): Promise<PeerId> {
  return PeerId.createFromPubKey(publicKey)
}

/**
 * Creates a new Peer ID, complete with public/private keypair.
 *
 * @returns Promise<PeerId>
 */
export function createKey (): Promise<PeerId> {
  const opts: PeerId.CreateOptions = {
    bits: 256,
    keyType: 'secp256k1'
  }
  return PeerId.create(opts)
}
