
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
// (b) else (best way):
const {networkConfig, developmentChains} = require("../helper-hardhat-config")
const {network} = require("hardhat")

// (a) else (best way): 
module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainId is X use address Y
    // if chainId is Z use address A
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if(developmentChains.includes(network.name)){
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contract doesn't exist, we deploy a minimal version of it
    // for our local testing
    
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //price feed address
        log: true,
    })
    log("--------------------------------------------------------")
}
module.exports.tags = ["all", "mocks"]
/*note: I'm using mocks because if i'm using fundme, we have to deploy 00 and 01 separately.
It will cause an error because if we do it separately the hardhat blockchain (local network)
resets everytime we finished doing the TRX and if we do it separately the "MockV3Aggregator"
can't be used on the 01 because the deployment gets reset everytime we finished deploying 00.*/