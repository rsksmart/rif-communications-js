import chai from 'chai'

import { createKey } from '../src/modules/peers'

const expect = chai.expect

describe('peers', function () {
  it('should create a PeerId', function () {
    createKey().then(peerId => {
      expect(peerId).to.be.instanceOf(Object)
      expect(peerId).haveOwnProperty('_id')
      expect(peerId).haveOwnProperty('_idB58String')
      expect(peerId).haveOwnProperty('_pubKey')
      expect(peerId).haveOwnProperty('_privKey')
    })
  })
})
