// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {EmailWalletCoreTestHelper} from "@email-wallet/test/helpers/EmailWalletCoreTestHelper.sol";
import {ExtensionHandler} from "@email-wallet/src/handlers/ExtensionHandler.sol";
import {EmailWalletEvents} from "@email-wallet/src/interfaces/Events.sol";
import {SubjectUtils} from "@email-wallet/src/libraries/SubjectUtils.sol";
import "@email-wallet/src/interfaces/Commands.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "../src/NFTExtension.sol";
import "./mocks/DummyNFT.sol";
import "./mocks/TestExtension.sol";

/**
 * NFTExtension Contract用のテストコード
 */
contract NFTExtensionTest is EmailWalletCoreTestHelper {

  string[][] public nftTempates = new string[][](1);
  string[][] public mockExtTemplates = new string[][](7);
  
  NFTExtension nftExtension;
  TestExtension mockExtension;
  DummyNFT dummyNFT;
  
  /**
   * 初期設定
   */
  function setUp() public override {
    super.setUp();
    // レイヤーとアカウント初期化を実行
    _registerRelayer();
    _registerAndInitializeAccount();

    // deploy NFTExtention & Dummy NFT
    {
      NFTExtension nftExtensionImpl = new NFTExtension();
      // proxy コントラクト越しにデプロイ
      ERC1967Proxy proxy = new ERC1967Proxy(
        address(nftExtensionImpl), 
        abi.encodeCall(nftExtensionImpl.initialize, (
          address(core)
      )));
      // nftExtensionをデプロイ
      nftExtension = NFTExtension(payable(address(proxy)));
      // NFTをデプロイして情報を登録
      dummyNFT = new DummyNFT();
      nftExtension.setNFTAddress("APE", address(dummyNFT));
      // テンプレートを登録する。
      nftTempates[0] = ["NFT", "Send", "{uint}", "of", "{string}", "to", "{recipient}"];
      // Extetionコントラクトをpublishする。
      extensionHandler.publishExtension("NFT Wallet", address(nftExtension), nftTempates, 0.1 ether);
    }

    mockExtension = new TestExtension(address(core), address(daiToken), address(tokenRegistry));
    mockExtTemplates[0] = ["Test", "Register Unclaimed State"];
    mockExtTemplates[1] = ["Test", "Register Unclaimed State Twice"];
    mockExtTemplates[2] = ["Test", "Register Empty Unclaimed State"];
    mockExtTemplates[3] = ["Test", "Register Unclaimed State to", "{address}"];
    mockExtTemplates[4] = ["Test", "Request Token", "{tokenAmount}"];
    mockExtTemplates[5] = ["Test", "Deposit Token", "{tokenAmount}"];
    mockExtTemplates[6] = ["Test", "Execute on", "{address}"];
    extensionHandler.publishExtension("TestExtension", address(mockExtension), mockExtTemplates, 0.1 ether);

    EmailOp memory emailOpNFT = _getBaseEmailOp();
    emailOpNFT.command = Commands.INSTALL_EXTENSION;
    emailOpNFT.extensionName = "NFT Wallet";
    emailOpNFT.maskedSubject = "Install extension NFT Wallet";
    emailOpNFT.emailNullifier = bytes32(uint256(93845));

    EmailOp memory emailOpTestExt = _getBaseEmailOp();
    emailOpTestExt.command = Commands.INSTALL_EXTENSION;
    emailOpTestExt.extensionName = "TestExtension";
    emailOpTestExt.maskedSubject = "Install extension TestExtension";
    emailOpTestExt.emailNullifier = bytes32(uint256(4234));

    vm.startPrank(relayer);
    core.handleEmailOp(emailOpNFT);
    core.handleEmailOp(emailOpTestExt);
    vm.stopPrank();
  }

  /**
   * RegisterUnclaimedState methodのテストコード
   */
  function test_RegisterUnclaimedState_FromEmailOp() public {
    bytes32 recipientEmailAddrCommit = bytes32(uint256(32333));

    // emailOp用のデータを作成する。
    EmailOp memory emailOp = _getBaseEmailOp();
    emailOp.command = "NFT";
    emailOp.maskedSubject = string.concat("NFT Send 55 of APE to ");
    emailOp.extensionParams.subjectTemplateIndex = 0;
    emailOp.hasEmailRecipient = true;
    emailOp.recipientEmailAddrCommit = recipientEmailAddrCommit;
    emailOp.feeTokenName = "DAI";
    emailOp.extensionParams.subjectParams = new bytes[](2);
    emailOp.extensionParams.subjectParams[0] = abi.encode(55);
    emailOp.extensionParams.subjectParams[1] = abi.encode("APE");

    bytes memory expectedState = abi.encode(address(dummyNFT), 55);

    // テスト用のNFTとトークンを発行する。
    dummyNFT.freeMint(walletAddr, 55); // Mint a NFT with tokenId 55 to walletAddr
    daiToken.freeMint(walletAddr, 20 ether); // For fee reibursement

    vm.deal(relayer, unclaimedStateClaimGas * maxFeePerGas);

    vm.startPrank(relayer);

    vm.expectEmit(true, true, true, true);
    // イベントを発行する。
    emit EmailWalletEvents.UnclaimedStateRegistered(
      0,
      recipientEmailAddrCommit,
      address(nftExtension),
      walletAddr,
      block.timestamp + unclaimsExpiryDuration, 
      expectedState,
      0, 
      ""
    );
    // handleEmailOpでemailOpに格納されたデータを実行する。
    (bool success, , , uint256 registeredUnclaimId) = core.handleEmailOp{
      value: unclaimedStateClaimGas * maxFeePerGas
    }(emailOp);

    vm.stopPrank();
    
    // registeredUnclaimIdの情報を基にデータを取得する
    (
      uint256 foundId,
      bytes32 emailAddrCommit,
      address extensionAddr,
      address sender,
      bytes memory state,
      uint256 expiryTime
    ) = unclaimsHandler.unclaimedStateOfId(registeredUnclaimId);

    assertEq(foundId, registeredUnclaimId, "foundId mismatch");
    assertEq(success, true, "handleEmailOp should succeed");
    assertEq(emailAddrCommit, recipientEmailAddrCommit, "emailAddrCommit mismatch");
    assertEq(extensionAddr, address(nftExtension), "extensionAddr mismatch");
    assertEq(sender, walletAddr, "sender mismatch");
    assertEq(state, expectedState, "state mismatch");
    assertEq(expiryTime, block.timestamp + unclaimsExpiryDuration, "expiryTime mismatch");
  
    // Handler should have received the fee
    assertEq(
      address(unclaimsHandler).balance,
      unclaimedStateClaimGas * maxFeePerGas,
      "unclaimsHandler didnt receive ETH"
    );
  }

  /**
   * RegisterUnclaimedState_ToAnotherExtension_FromEmailOp 
   */
  function test_RegisterUnclaimedState_ToAnotherExtension_FromEmailOp() public {
    bytes32 recipientEmailAddrCommit = bytes32(uint256(32333));

    // We will deploy same TestExtension as another extension
    // Dummy subject templates used, as we only care about registerUnclaimedState method (which wont revert)
    TestExtension anotherExtension = new TestExtension(address(core), address(daiToken), address(tokenRegistry));
    string[][] memory anotherExtTemplates = new string[][](1);
    anotherExtTemplates[0] = new string[](1);
    anotherExtTemplates[0][0] = "Another";
    extensionHandler.publishExtension(
      "AnotherExtension",
      address(anotherExtension),
      anotherExtTemplates,
      0.1 ether
    );

    EmailOp memory emailOp = _getBaseEmailOp();
    emailOp.command = "Test";

    emailOp.maskedSubject = string.concat(
      "Test Register Unclaimed State to ",
      SubjectUtils.addressToChecksumHexString(address(anotherExtension))
    );
    emailOp.extensionParams.subjectTemplateIndex = 3;
    emailOp.hasEmailRecipient = true;
    emailOp.recipientEmailAddrCommit = recipientEmailAddrCommit;
    emailOp.feeTokenName = "DAI";
    emailOp.extensionParams.subjectParams = new bytes[](1);
    emailOp.extensionParams.subjectParams[0] = abi.encode(address(anotherExtension));

    daiToken.freeMint(walletAddr, 20 ether); // For fee reibursement
    vm.deal(relayer, unclaimedStateClaimGas * maxFeePerGas);

    vm.startPrank(relayer);
    (bool success, bytes memory reason, , uint256 registeredUnclaimId) = core.handleEmailOp{
      value: unclaimedStateClaimGas * maxFeePerGas
    }(emailOp);
    vm.stopPrank();

    // 情報を取得する。
    (, 
      bytes32 emailAddrCommit, 
      address extensionAddr, 
      , 
      bytes memory state, 
    ) = unclaimsHandler.unclaimedStateOfId(
      registeredUnclaimId
    );

    assertEq(success, true, string.concat("handleEmailOp failed", string(reason)));
    assertEq(emailAddrCommit, recipientEmailAddrCommit, "emailAddrCommit mismatch");
    assertEq(extensionAddr, address(anotherExtension), "extensionAddr mismatch");
    assertEq(state, abi.encode("test"), "state mismatch");
  }

  /**
   * 異なるトークンIDの送金を指定した場合
   */
  function test_RevertIf_ExtensionDontRegisterUnclaimedState_FromEmailOp() public {
    bytes32 recipientEmailAddrCommit = bytes32(uint256(32333));

    EmailOp memory emailOp = _getBaseEmailOp();
    emailOp.command = "NFT";
    emailOp.maskedSubject = string.concat("NFT Send 55 of APE to ");
    emailOp.extensionParams.subjectTemplateIndex = 0;
    emailOp.hasEmailRecipient = true;
    emailOp.recipientEmailAddrCommit = recipientEmailAddrCommit;
    emailOp.feeTokenName = "DAI";
    emailOp.extensionParams.subjectParams = new bytes[](2);
    emailOp.extensionParams.subjectParams[0] = abi.encode(55);
    emailOp.extensionParams.subjectParams[1] = abi.encode("APE");

    vm.deal(relayer, unclaimedStateClaimGas * maxFeePerGas);
    // daiTokenを発行し、NFTは発行しない。
    daiToken.freeMint(walletAddr, unclaimedStateClaimGas * maxFeePerGas); 

    vm.startPrank(relayer);
    (bool success, bytes memory reason, , ) = core.handleEmailOp{
      value: unclaimedStateClaimGas * maxFeePerGas
    }(emailOp);
    vm.stopPrank();

    assertEq(success, false, "handleEmailOp should fail");
    assertEq(string(reason), "ERC721: invalid token ID", "reason mismatch");
  }

  /**
   * 異なるトークンIDの送金を指定した場合2
   */
  function test_RevertIf_ExtensionDontRegisterUnclaimedState_FromEmailOp_2() public {
    bytes32 recipientEmailAddrCommit = bytes32(uint256(32333));

    EmailOp memory emailOp = _getBaseEmailOp();
    emailOp.command = "NFT";
    emailOp.maskedSubject = string.concat("NFT Send 55 of APE to ");
    emailOp.extensionParams.subjectTemplateIndex = 0;
    emailOp.hasEmailRecipient = true;
    emailOp.recipientEmailAddrCommit = recipientEmailAddrCommit;
    emailOp.feeTokenName = "DAI";
    emailOp.extensionParams.subjectParams = new bytes[](2);
    emailOp.extensionParams.subjectParams[0] = abi.encode(55);
    emailOp.extensionParams.subjectParams[1] = abi.encode("APE");

    vm.deal(relayer, unclaimedStateClaimGas * maxFeePerGas);
    // daiTokenを発行
    daiToken.freeMint(walletAddr, unclaimedStateClaimGas * maxFeePerGas); 
    dummyNFT.freeMint(walletAddr, 20); 

    vm.startPrank(relayer);
    // call handleEmailOp method
    (bool success, bytes memory reason, , ) = core.handleEmailOp{
      value: unclaimedStateClaimGas * maxFeePerGas
    }(emailOp);
    vm.stopPrank();

    assertEq(success, false, "handleEmailOp should fail");
    assertEq(string(reason), "ERC721: invalid token ID", "reason mismatch");
  }

  /**
   * NFT購入のためにDAIトークンを十分に持っていなかった場合。
   * ※ valueを指定していない。
   */
  function test_RevertIf_RegisterUnclaimedState_NotEnoughFee() public {
    bytes32 recipientEmailAddrCommit = bytes32(uint256(32333));

    EmailOp memory emailOp = _getBaseEmailOp();
    emailOp.command = "NFT";
    emailOp.maskedSubject = string.concat("NFT Send 55 of APE to ");
    emailOp.extensionParams.subjectTemplateIndex = 0;
    emailOp.hasEmailRecipient = true;
    emailOp.recipientEmailAddrCommit = recipientEmailAddrCommit;
    emailOp.feeTokenName = "DAI";
    emailOp.extensionParams.subjectParams = new bytes[](2);
    emailOp.extensionParams.subjectParams[0] = abi.encode(55);
    emailOp.extensionParams.subjectParams[1] = abi.encode("APE");

    // Mint a NFT with tokenId 55 to walletAddr
    dummyNFT.freeMint(walletAddr, 55); 

    vm.startPrank(relayer);
    vm.expectRevert("incorrect ETH sent for unclaimed state");
    core.handleEmailOp(emailOp);
    vm.stopPrank();
  }
}