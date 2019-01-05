import { expect, assert } from 'chai';
import Steam from '../src';

describe('Basic usage', () => {
  it('should return openid url', async () => { // no done
    const steam = new Steam('http://localhost/auth')
    const url = await steam.url()
    const expectedUrl = 'https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=http%3A%2F%2Flocalhost%2Fauth'
    expect(url).to.equal(expectedUrl)
  });

  it('should reject already verified URL ', async () => {
    const steam = new Steam('http://localhost/auth')
    const response_url = "http://localhost/auth?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=id_res&openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&openid.claimed_id=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198009263731&openid.identity=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198009263731&openid.return_to=http%3A%2F%2Flocalhost%2Fauth&openid.response_nonce=2019-01-05T22%3A10%3A26ZK%2BUfqvH%2FbFDARM15ufrljHg1Xug%3D&openid.assoc_handle=1234567890&openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&openid.sig=nZIR1PAm5pczqoEvPAs9ffK2PHs%3D"

    try {
      await steam.verify(response_url)
    } catch(e) {
      expect(e.message).to.equal('Invalid or replayed nonce')
    }
  });
});
