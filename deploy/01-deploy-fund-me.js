
// (a) you can use this:
// async function deployFunc(hre) {
//     console.log("Hi!")
// }
// module.exports.default = deployFunc

// (a) or this:
// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre
// }

// (b) use this:
// const helperConfig = require("../helper-hardhat-config")
// (b) or:
// const networkConfig = helperConfig.networkConfig
// (b) else:
const {networkConfig} = require("../helper-hardhat-config")
const {network} = require("hardhat")

// (a) else (best way): 
module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainId is X use address Y
    // if chainId is Z use address A
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    // if the contract doesn't exist, we deploy a minimal version of it
    // for out local testing
    
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [], //price feed address
        log: true,
    })
}