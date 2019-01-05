import Steam from "../auth"

const steam = new Steam("http://localhost:3333/auth")
steam.url()
  .then((url) => {
    // Redirect user to this url
    console.log(url)
  })
  .catch((error) => {
    console.log(error.message)
  })

// Then user will be returned to a similar URL as below:
const url = "http://localhost:3333/auth?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=id_res&openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&openid.claimed_id=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198009263731&openid.identity=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198009263731&openid.return_to=http%3A%2F%2Flocalhost%3A3333%2Fauth&openid.response_nonce=2019-01-05T22%3A10%3A26ZK%2BUfqvH%2FbFDARM15ufrljHg1Xug%3D&openid.assoc_handle=1234567890&openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&openid.sig=nZIR1PAm5pczqoEvPAs9ffK2PHs%3D"

// Which you can verify in order to identify the user
steam.verify(url)
  .then((steamId) => {
    console.log(steamId)
  })
  .catch((err) => {
    console.log(err.message)
  })
