require('dotenv').config({ path: './contracts/.env' })
const sh = require('shelljs')
const oracle = require('./contracts/build/contracts/Oracle.json')
const oracleAddress = oracle.networks[Object.keys(oracle.networks)[0]].address
const timestamp = new Date()

sh.echo('Creating Chainlink jobs:')

sh.echo('Creating bridges...')

sh.exec('chainlink bridges create ./chainlink-adapters/bridges/register.json')
sh.exec('chainlink bridges create ./chainlink-adapters/bridges/release.json')
sh.exec('chainlink bridges create ./chainlink-adapters/bridges/claim.json')
sh.exec('chainlink bridges create ./chainlink-adapters/bridges/twitter-post.json')
sh.exec('chainlink bridges create ./chainlink-adapters/bridges/twitter-followers.json')

if (process.env.CHAINLINK_REGISTER_JOB_ID) {
  sh.echo('Archiving old jobs...')

  sh.exec('chainlink jobs archive ' + process.env.CHAINLINK_REGISTER_JOB_ID)
  sh.exec('chainlink jobs archive ' + process.env.CHAINLINK_RELEASE_JOB_ID)
  sh.exec('chainlink jobs archive ' + process.env.CHAINLINK_CLAIM_JOB_ID)
  sh.exec('chainlink jobs archive ' + process.env.CHAINLINK_TWITTER_POST_JOB_ID)
  sh.exec('chainlink jobs archive ' + process.env.CHAINLINK_TWITTER_FOLLOWERS_JOB_ID)
}

sh.echo('Creating jobs...')

// replacing names
sh.sed('-i', /\"name\": \".*\"/, `"name": "OctoBay Register ${timestamp}"`, './.jobs/register.json')
sh.sed('-i', /\"name\": \".*\"/, `"name": "OctoBay Release ${timestamp}"`, './.jobs/release.json')
sh.sed('-i', /\"name\": \".*\"/, `"name": "OctoBay Claim ${timestamp}"`, './.jobs/claim.json')
sh.sed('-i', /\"name\": \".*\"/, `"name": "OctoBay Twitter Post ${timestamp}"`, './.jobs/twitter-post.json')
sh.sed('-i', /\"name\": \".*\"/, `"name": "OctoBay Twitter Followers ${timestamp}"`, './.jobs/twitter-followers.json')

// replacing oracle address
sh.sed('-i', /\"address\": \".*\"/, `"address": "${oracleAddress}"`, './.jobs/register.json')
sh.sed('-i', /\"address\": \".*\"/, `"address": "${oracleAddress}"`, './.jobs/release.json')
sh.sed('-i', /\"address\": \".*\"/, `"address": "${oracleAddress}"`, './.jobs/claim.json')
sh.sed('-i', /\"address\": \".*\"/, `"address": "${oracleAddress}"`, './.jobs/twitter-post.json')
sh.sed('-i', /\"address\": \".*\"/, `"address": "${oracleAddress}"`, './.jobs/twitter-followers.json')

// creating jobs
sh.exec('chainlink jobs create ./.jobs/register.json')
sh.exec('chainlink jobs create ./.jobs/release.json')
sh.exec('chainlink jobs create ./.jobs/claim.json')
sh.exec('chainlink jobs create ./.jobs/twitter-post.json')
sh.exec('chainlink jobs create ./.jobs/twitter-followers.json')

// store job ids in filenames
sh.exec('chainlink jobs list', (code, output) => {
  const jobIDs = output.match(/[a-f0-9]{32}/ig).reverse()
  sh.sed('-i', /^CHAINLINK_TWITTER_FOLLOWERS_JOB_ID=.*$/, 'CHAINLINK_TWITTER_FOLLOWERS_JOB_ID=' + jobIDs[0], './contracts/.env')
  sh.sed('-i', /^CHAINLINK_TWITTER_POST_JOB_ID=.*$/, 'CHAINLINK_TWITTER_POST_JOB_ID=' + jobIDs[1], './contracts/.env')
  sh.sed('-i', /^CHAINLINK_CLAIM_JOB_ID=.*$/, 'CHAINLINK_CLAIM_JOB_ID=' + jobIDs[2], './contracts/.env')
  sh.sed('-i', /^CHAINLINK_RELEASE_JOB_ID=.*$/, 'CHAINLINK_RELEASE_JOB_ID=' + jobIDs[3], './contracts/.env')
  sh.sed('-i', /^CHAINLINK_REGISTER_JOB_ID=.*$/, 'CHAINLINK_REGISTER_JOB_ID=' + jobIDs[4], './contracts/.env')
})
