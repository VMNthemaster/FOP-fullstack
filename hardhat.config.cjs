/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle')

const ALCHEMY_API_KEY = "GjAYCikpcKopg3RRpMm_wEATQ3nx92kT"
const GOERLI_PRIVATE_KEY = "ef0ecc9064aa2a567b2d71cbb397c5d1932982baa613842ecec17470dae4f397"
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
      gas: 21000
    }
  }
};
