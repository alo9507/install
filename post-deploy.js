const sh = require('shelljs')

const octoBayAddress = require('./contracts/build/contracts/OctoBay.json').address
const octoPinAddress = require('./contracts/build/contracts/OctoPin.json').address
const linkAddress = require('./contracts/build/contracts/LinkToken.json').address
const paymasterAddress = require('./contracts/build/contracts/OctoBayPaymaster.json').address

// .env
sh.sed('-i', /^OCTOBAY_ADDRESS=.*$/, 'OCTOBAY_ADDRESS=' + octoBayAddress, './app/.env')
sh.sed('-i', /^OCTOPIN_ADDRESS=.*$/, 'OCTOPIN_ADDRESS=' + octoPinAddress, './app/.env')
sh.sed('-i', /^GSN_PAYMASTER_ADDRESS=.*$/, 'GSN_PAYMASTER_ADDRESS=' + paymasterAddress, './app/.env')
sh.sed('-i', /^LINK_CONTRACT_ADDRESS=.*$/, 'LINK_CONTRACT_ADDRESS=' + linkAddress, './chainlink/.env')
