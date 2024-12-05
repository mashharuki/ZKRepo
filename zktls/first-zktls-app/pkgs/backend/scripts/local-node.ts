// eslint-disable-next-line simple-import-sort/imports
import '../hardhat.config'

import { exec } from 'child_process'
import { Wallet } from 'ethers'
import { readFile } from 'fs/promises'
import { ethers } from 'hardhat'

// one of the keys hardhat provides for local dev (not safe to use on mainnet)
const DEPLOYMENT_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
// URL the oracle will run on; default from the docker-compose file
const LOCAL_ORACLE_URL = 'http://localhost:8002'

const HARDHAT_RPC_URL = 'http://localhost:8545'

const MY_ADDRESS = process.env.MY_ADDRESS

async function main() {
	const nodeProcess = exec('yarn hardhat node')
	nodeProcess.stdout?.on('data', (content) => {
		console.debug(`node: ${content}`)
	})
	process.on('SIGINT', () => {
		console.log('killed local node')
		nodeProcess.kill()
	})

	console.log('Starting local node...')
	// wait for node to start
	await delay(5000)

	const provider = new ethers.providers.JsonRpcProvider(HARDHAT_RPC_URL)

	if(MY_ADDRESS) {
		let wei = ethers.utils.parseEther('1.0').toHexString()
		wei = wei.replace('0x0', '0x')
		await provider.send('hardhat_setBalance', [MY_ADDRESS, wei])
		console.log(`set balance of ${MY_ADDRESS} to 1 ETH`)
	}

	console.log('deploying Reclaim contract...')

	const deployer = new Wallet(DEPLOYMENT_PRIVATE_KEY, provider)
	const reclaim = await ethers.getContractFactory('Reclaim')
	let contract = await reclaim
		.connect(deployer)
		.deploy()
	contract = await contract.deployed()

	console.log(`Deployed to: ${contract.address}`)
	console.log('adding oracle stored in /node/resources/keypair.json')

	const privKeyJsonData = await readFile(
		'../node/resources/keypair.json',
		'utf-8'
	)
	const privKeyJson = JSON.parse(privKeyJsonData)
	const oracleWallet = new ethers.Wallet(privKeyJson.privateKey)

	console.log(`whitelisting & adding: ${oracleWallet.address}`)
	const tx = await contract.updateOracleWhitelist(
		oracleWallet.address,
		true
	)
	await tx.wait()

	const tx2 = await contract.addAsOracle(
		oracleWallet.address,
		LOCAL_ORACLE_URL
	)
	await tx2.wait()

	console.log(`whitelisted & added: ${oracleWallet.address}`)
	console.log('local node ready to go')

	while(!nodeProcess.killed) {
		await delay(1000)
	}
}

function delay(ms: number) {
	return new Promise(
		resolve => setTimeout(resolve, ms)
	)
}

main()