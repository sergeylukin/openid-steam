import openid from 'openid';

class InstantiationError extends Error { }

export default class {
  constructor(callback) {
    try {
      this.steam = new openid.RelyingParty(
        callback, // Verification URL (yours)
        null, // Realm (optional, specifies realm for OpenID authentication)
        true, // Use stateless verification
        false, // Strict mode
        []
      ); // List of extensions to enable and include
    } catch (err) {
      throw new InstantiationError(err.message);
    }
  }

  url() {
    return new Promise((resolve, reject) => {
      const identifier = 'https://steamcommunity.com/openid';
      this.steam.authenticate(identifier, false, (error, authUrl) => {
        if (error) {
          reject(error);
        } else if (!authUrl) {
          reject(new Error('Auth url not defined'));
        } else {
          resolve(authUrl);
        }
      });
    });
  }

  verify(url) {
    return new Promise((resolve, reject) => {
      this.steam.verifyAssertion(url, (error, result) => {
        if (error) {
          reject(error);
        } else if (!result.authenticated) {
          reject(new Error('Could not authenticate'));
        } else {
          try {
            const steamID = result.claimedIdentifier.match(/\/id\/(.*)/)[1];
            resolve(steamID);
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  }
}
