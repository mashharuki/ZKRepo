import { createHash } from "crypto"
import { BeaconState, ClaimInfo, WitnessData } from "../types"
import { hashClaimInfo } from "./sign-data"
import { ethers } from "ethers"

/**
 * Compute the list of witnesses that need to be
 * contacted for a claim
 *
 * @param state current beacon state
 * @param identifier params of the claim
 * @param timestampS timestamp of the claim
 */
export function fetchWitnessListForClaim(
	{ witnesses, witnessesRequiredForClaim, epoch }: BeaconState,
	params: string | ClaimInfo,
	timestampS: number,
) {
	const identifier = typeof params === 'string'
		? params
		: hashClaimInfo(params)
	// include the epoch and
	// witnessesRequiredForClaim in the hash
	// so the same claim can be made multiple times
	// with different witnesses
	const completeInput = [
		identifier,
		epoch.toString(),
		witnessesRequiredForClaim.toString(),
		timestampS.toString(),
	]
		.join('\n')
	const completeHashStr = ethers.utils.keccak256(
		Buffer.from(completeInput, 'utf-8')
	)
	const completeHash = Buffer.from(completeHashStr.slice(2), 'hex')
	const witnessesLeft = [...witnesses]
	const selectedWitnesses: WitnessData[] = []
	// we'll use 32 bits of the hash to select
	// each witness
	let byteOffset = 0
	for(let i = 0; i < witnessesRequiredForClaim; i++) {
		const randomSeed = completeHash.readUint32BE(byteOffset)
		const witnessIndex = randomSeed % witnessesLeft.length
		const witness = witnessesLeft[witnessIndex]
		selectedWitnesses.push(witness)

		// Remove the selected witness from the list of witnesses left
		witnessesLeft[witnessIndex] = witnessesLeft[witnessesLeft.length - 1]
		witnessesLeft.pop()
		byteOffset = (byteOffset + 4) % completeHash.length
	}

	return selectedWitnesses
}