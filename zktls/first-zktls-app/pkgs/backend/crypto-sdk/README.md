# Reclaim crypto SDK

Crypto SDK Provides common functions for encrypting, decrypting, signing & verifying data used in Reclaim protocol.
It's also used for generating & verifying auth tokens used in Reclaim backend

## Setup
1. Run `npm i`

## Creating an account
1. Generate a new wallet by calling `const wallet = Wallet.createRandom()`

## Authentication
1. Create an auth token by calling `await generateAuthToken(wallet.privateKey)`
2. Validate token by calling `authenticate(token)`

## Encrypting & decrypting data
### Encryption
```typescript
		const data = Buffer.from('{"a":"123","b":123}', 'utf8')
		const ciphertext = encryptData(
			utils.arrayify(bob.publicKey),
			utils.arrayify(alice.privateKey),
			data
		)
```
### Decryption
```typescript
		const plaintext = decryptData(
			utils.arrayify(bob.privateKey),
			utils.arrayify(alice.publicKey),
			ciphertext
		)
```

## Signing & verification
```typescript
        const data = Buffer.from('{"a":"123","b":123}', 'utf8')
        const signature = await signatures.sign(
            data,
            privateKey,
        )
```
### Verification
```typescript
        const addr = signatures.getAddress(utils.arrayify(publicKey))
        const res = await signatures.verify(data,signature,addr)
```