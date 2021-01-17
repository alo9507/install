const sh = require('shelljs')

const octoBayAddress = Object.values(require('./contracts/build/contracts/OctoBay.json').networks)[0].address
const octoPinAddress = Object.values(require('./contracts/build/contracts/OctoPin.json').networks)[0].address
const linkAddress = Object.values(require('./contracts/build/contracts/LinkToken.json').networks)[0].address
const paymasterAddress = Object.values(require('./contracts/build/contracts/OctoBayPaymaster.json').networks)[0].address

// .env
sh.sed('-i', /^OCTOBAY_ADDRESS=.*$/, 'OCTOBAY_ADDRESS=' + octoBayAddress, './app/.env')
sh.sed('-i', /^OCTOPIN_ADDRESS=.*$/, 'OCTOPIN_ADDRESS=' + octoPinAddress, './app/.env')
sh.sed('-i', /^GSN_PAYMASTER_ADDRESS=.*$/, 'GSN_PAYMASTER_ADDRESS=' + paymasterAddress, './app/.env')
sh.sed('-i', /^LINK_CONTRACT_ADDRESS=.*$/, 'LINK_CONTRACT_ADDRESS=' + linkAddress, './chainlink/.env')
