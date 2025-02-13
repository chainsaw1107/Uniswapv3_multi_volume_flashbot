import { ethers } from 'ethers';
import fs from 'fs';
import * as crypto from 'crypto';
const {
	FlashbotsBundleProvider,
	FlashbotsBundleResolution,
} = require('@flashbots/ethers-provider-bundle');
import { NUMBER_OF_WALLETS } from './config/constants';

let newWallets = [];
for (let i = 0; i < NUMBER_OF_WALLETS; i++) {
	let wallet = ethers.Wallet.createRandom();
	newWallets.push({
		publicKey: wallet.address,
		privateKey: wallet.privateKey,
	});
}
fs.writeFileSync('./wallets.json', JSON.stringify(newWallets));
console.log('Successfully Created!');
