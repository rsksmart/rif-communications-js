import libp2p from 'libp2p'
// import { WebRTCDirectBundle } from './wRTCbundle';
// import Multiaddr from 'multiaddr'
import PeerInfo from 'peer-info'

/*
export function connectToNode(
  origin: libp2p,
  destination: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    origin.dial(destination, (err: any, val: any) => {
      if (err) {
        throw err;
      } else {
        setTimeout(() => {
          resolve();
        }, 300);
      }
    });
  });
} */

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

/*
export function createNode(
  peerInfo: PeerInfo,
  host: string,
  port: number,
  sendMsgFunc: any,
): Promise<libp2p> {
  let node: any;

  peerInfo.multiaddrs.add(
    new Multiaddr(`/ip4/${host}/tcp/${port}/http/p2p-webrtc-direct`),
  );
  node = new WebRTCDirectBundle({
    peerInfo,
  });

  return new Promise<libp2p>((resolve, reject) => {
    node.dht.registerListener(
      'kad-msg-received',
      (kadMsg: any) => {
        sendMsgFunc(kadMsg);
      },
      () => {
        resolve(
          new Promise<libp2p>((resolve2, reject2) => {
            node.start((err: Error) => {
              if (err) {
                reject2(err);
              } else {
                resolve2(node);
              }
            });
          }),
        );
      },
    );
  });
}
*/
