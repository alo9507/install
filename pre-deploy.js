require('dotenv').config({ path: './contracts/.env' })
const readline = require('readline')
const sh = require('shelljs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const relayHubAddress = require('./contracts/build/gsn/RelayHub.json').address
const forwarderAddress = require('./contracts/build/gsn/Forwarder.json').address

sh.sed('-i', /^GSN_RELAYHUB_ADDRESS=.*$/, 'GSN_RELAYHUB_ADDRESS=' + relayHubAddress, './app/.env')
sh.sed('-i', /^GSN_RELAYHUB_ADDRESS=.*$/, 'GSN_RELAYHUB_ADDRESS=' + relayHubAddress, './contracts/.env')
sh.sed('-i', /^GSN_FORWARDER_ADDRESS=.*$/, 'GSN_FORWARDER_ADDRESS=' + forwarderAddress, './contracts/.env')

if (!process.env.CHAINLINK_NODE_ADDRESS) {
  rl.question('Chainlink Node Address? ', chainlinkNodeAddress => {
    sh.sed('-i', /^CHAINLINK_NODE_ADDRESS=.*$/, 'CHAINLINK_NODE_ADDRESS=' + chainlinkNodeAddress, './contracts/.env')
    rl.close()
  })
} else {
  rl.close()
}
