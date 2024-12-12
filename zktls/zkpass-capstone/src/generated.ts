import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const counterAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GetSecret
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getSecretAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_proxy', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'success', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'secret',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Response',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'assignSecret',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSecret',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProofVerifier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const proofVerifierAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAllocator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_allocatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyAllocatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_uHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_publicFieldsHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_validatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyValidatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SampleAttestation
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sampleAttestationAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: '_proofAsBytes', internalType: 'bytes', type: 'bytes' }],
    name: 'attest',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultAllocator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'uid', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getAttestation',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_recipient', internalType: 'address', type: 'address' }],
    name: 'getAttestationFromAddress',
    outputs: [
      {
        name: '',
        internalType: 'struct Attestation',
        type: 'tuple',
        components: [
          { name: 'uid', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schema', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_proof',
        internalType: 'struct Proof',
        type: 'tuple',
        components: [
          { name: 'taskId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'schemaId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'uHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'recipient', internalType: 'address', type: 'address' },
          {
            name: 'publicFieldsHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'validator', internalType: 'address', type: 'address' },
          { name: 'allocatorSignature', internalType: 'bytes', type: 'bytes' },
          { name: 'validatorSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'verify',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_allocatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyAllocatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_taskId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_schemaId', internalType: 'bytes32', type: 'bytes32' },
      { name: '_uHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_publicFieldsHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_validator', internalType: 'address', type: 'address' },
      { name: '_validatorSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyValidatorSignature',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useReadCounterundefined = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"number"`
 */
export const useReadCounterNumber = /*#__PURE__*/ createUseReadContract({
  abi: counterAbi,
  functionName: 'number',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useWriteCounterundefined = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useWriteCounterIncrement = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'increment',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"setNumber"`
 */
export const useWriteCounterSetNumber = /*#__PURE__*/ createUseWriteContract({
  abi: counterAbi,
  functionName: 'setNumber',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__
 */
export const useSimulateCounterundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: counterAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"increment"`
 */
export const useSimulateCounterIncrement =
  /*#__PURE__*/ createUseSimulateContract({
    abi: counterAbi,
    functionName: 'increment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link counterAbi}__ and `functionName` set to `"setNumber"`
 */
export const useSimulateCounterSetNumber =
  /*#__PURE__*/ createUseSimulateContract({
    abi: counterAbi,
    functionName: 'setNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useReadGetSecretundefined = /*#__PURE__*/ createUseReadContract({
  abi: getSecretAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"getSecret"`
 */
export const useReadGetSecretGetSecret = /*#__PURE__*/ createUseReadContract({
  abi: getSecretAbi,
  functionName: 'getSecret',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"proxy"`
 */
export const useReadGetSecretProxy = /*#__PURE__*/ createUseReadContract({
  abi: getSecretAbi,
  functionName: 'proxy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useWriteGetSecretundefined = /*#__PURE__*/ createUseWriteContract({
  abi: getSecretAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"assignSecret"`
 */
export const useWriteGetSecretAssignSecret =
  /*#__PURE__*/ createUseWriteContract({
    abi: getSecretAbi,
    functionName: 'assignSecret',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useSimulateGetSecretundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: getSecretAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link getSecretAbi}__ and `functionName` set to `"assignSecret"`
 */
export const useSimulateGetSecretAssignSecret =
  /*#__PURE__*/ createUseSimulateContract({
    abi: getSecretAbi,
    functionName: 'assignSecret',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link getSecretAbi}__
 */
export const useWatchGetSecretundefined =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: getSecretAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link getSecretAbi}__ and `eventName` set to `"Response"`
 */
export const useWatchGetSecretResponse =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: getSecretAbi,
    eventName: 'Response',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3undefined = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3undefined =
  /*#__PURE__*/ createUseWriteContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3undefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: iMulticall3Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__
 */
export const useReadProofVerifierundefined =
  /*#__PURE__*/ createUseReadContract({ abi: proofVerifierAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"defaultAllocator"`
 */
export const useReadProofVerifierDefaultAllocator =
  /*#__PURE__*/ createUseReadContract({
    abi: proofVerifierAbi,
    functionName: 'defaultAllocator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"verify"`
 */
export const useReadProofVerifierVerify = /*#__PURE__*/ createUseReadContract({
  abi: proofVerifierAbi,
  functionName: 'verify',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"verifyAllocatorSignature"`
 */
export const useReadProofVerifierVerifyAllocatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: proofVerifierAbi,
    functionName: 'verifyAllocatorSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link proofVerifierAbi}__ and `functionName` set to `"verifyValidatorSignature"`
 */
export const useReadProofVerifierVerifyValidatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: proofVerifierAbi,
    functionName: 'verifyValidatorSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__
 */
export const useReadSampleAttestationundefined =
  /*#__PURE__*/ createUseReadContract({ abi: sampleAttestationAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"defaultAllocator"`
 */
export const useReadSampleAttestationDefaultAllocator =
  /*#__PURE__*/ createUseReadContract({
    abi: sampleAttestationAbi,
    functionName: 'defaultAllocator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"getAttestation"`
 */
export const useReadSampleAttestationGetAttestation =
  /*#__PURE__*/ createUseReadContract({
    abi: sampleAttestationAbi,
    functionName: 'getAttestation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"getAttestationFromAddress"`
 */
export const useReadSampleAttestationGetAttestationFromAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: sampleAttestationAbi,
    functionName: 'getAttestationFromAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"verify"`
 */
export const useReadSampleAttestationVerify =
  /*#__PURE__*/ createUseReadContract({
    abi: sampleAttestationAbi,
    functionName: 'verify',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"verifyAllocatorSignature"`
 */
export const useReadSampleAttestationVerifyAllocatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: sampleAttestationAbi,
    functionName: 'verifyAllocatorSignature',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"verifyValidatorSignature"`
 */
export const useReadSampleAttestationVerifyValidatorSignature =
  /*#__PURE__*/ createUseReadContract({
    abi: sampleAttestationAbi,
    functionName: 'verifyValidatorSignature',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sampleAttestationAbi}__
 */
export const useWriteSampleAttestationundefined =
  /*#__PURE__*/ createUseWriteContract({ abi: sampleAttestationAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"attest"`
 */
export const useWriteSampleAttestationAttest =
  /*#__PURE__*/ createUseWriteContract({
    abi: sampleAttestationAbi,
    functionName: 'attest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sampleAttestationAbi}__
 */
export const useSimulateSampleAttestationundefined =
  /*#__PURE__*/ createUseSimulateContract({ abi: sampleAttestationAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sampleAttestationAbi}__ and `functionName` set to `"attest"`
 */
export const useSimulateSampleAttestationAttest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sampleAttestationAbi,
    functionName: 'attest',
  })
