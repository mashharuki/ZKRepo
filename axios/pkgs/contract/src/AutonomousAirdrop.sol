// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxiomV2Client } from './AxiomV2Client.sol';
import { IERC20 } from '@openzeppelin-contracts/token/ERC20/IERC20.sol';
import { Ownable } from '@openzeppelin-contracts/access/Ownable.sol';

contract AutonomousAirdrop is AxiomV2Client, Ownable {

    event ClaimAirdrop(
        address indexed user,
        uint256 indexed queryId,
        uint256 numTokens,
        bytes32[] axiomResults
    );
    event ClaimAirdropError(
        address indexed user,
        string error
    );
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event AirdropTokenAddressUpdated(address token);

    bytes32 public constant SWAP_EVENT_SCHEMA = 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67;
    address public constant UNI_UNIV_ROUTER_ADDR = 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    mapping(address => bool) public querySubmitted;
    mapping(address => bool) public hasClaimed;

    IERC20 public token;

    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function updateCallbackQuerySchema(
        bytes32 _axiomCallbackQuerySchema
    ) public onlyOwner {
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        emit AxiomCallbackQuerySchemaUpdated(_axiomCallbackQuerySchema);
    }

    function updateAirdropToken(address _token) public onlyOwner {
        token = IERC20(_token);
        emit AirdropTokenAddressUpdated(_token);
    }

    /**
     * オーバーライドしたコールバック関数
     */
    function _axiomV2Callback(
        uint64 /* sourceChainId */,
        address callerAddr,
        bytes32 /* querySchema */,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata /* extraData */
    ) internal virtual override {
        require(!hasClaimed[callerAddr], "Autonomous Airdrop: User has already claimed this airdrop");

        // コールバックされた結果を受け取り変数を取り出す。
        // Parse results
        bytes32 eventSchema = axiomResults[0];
        address userEventAddress = address(uint160(uint256(axiomResults[1])));
        uint32 blockNumber = uint32(uint256(axiomResults[2]));
        address uniswapUniversalRouterAddr = address(uint160(uint256(axiomResults[3])));

        // 条件を満たしているかチェック
        // Validate the results
        require(eventSchema == SWAP_EVENT_SCHEMA, "Autonomous Airdrop: Invalid event schema");
        require(userEventAddress == callerAddr, "Autonomous Airdrop: Invalid user address for event");
        require(blockNumber >= 9000000, "Autonomous Airdrop: Block number for transaction receipt must be 9000000 or greater");
        require(uniswapUniversalRouterAddr == UNI_UNIV_ROUTER_ADDR, "Autonomous Airdrop: Transaction `to` address is not the Uniswap Universal Router address");

        // Transfer tokens to user
        hasClaimed[callerAddr] = true;
        uint256 numTokens = 100 * 10**18;
        // 条件を満たしていたら送金
        token.transfer(callerAddr, numTokens);

        emit ClaimAirdrop(
            callerAddr,
            queryId,
            numTokens,
            axiomResults
        );
    }

    function _validateAxiomV2Call(
        uint64 sourceChainId,
        address /* callerAddr */,
        bytes32 querySchema
    ) internal virtual override {
        require(sourceChainId == callbackSourceChainId, "AxiomV2: caller sourceChainId mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AxiomV2: query schema mismatch");
    }
}
