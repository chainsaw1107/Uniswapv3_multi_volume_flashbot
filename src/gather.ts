import { ethers } from 'ethers';
import wallets from '../wallets.json';
import { mainWallet, provider } from './config/variables';
import { logger } from './config/logger';
import {
	GAS_LIMIT,
	GAS_PRICE,
	NUMBER_OF_WALLETS,
	SEND_COIN_AMOUNT,
} from './config/constants';

const sendEthToWallets = async () => {
	let mBalance = await mainWallet.getBalance();

	for (let i = 0; i < NUMBER_OF_WALLETS; i++) {
		console.log(wallets[i].privateKey);
		let wallet = new ethers.Wallet(wallets[i].privateKey, provider);
		console.log(wallet);
		let transaction = {
			to: wallet.address,
			value: ethers.utils.parseEther(SEND_COIN_AMOUNT),
			gasLimit: GAS_LIMIT,
			gasPrice: ethers.utils.parseUnits(GAS_PRICE, 'gwei'),
		};
		let tx = await mainWallet.sendTransaction(transaction);
		const receipt = await tx.wait();
		logger.info(`transaction=========> https://basescan.org/tx/${tx.hash}`);
	}
};
sendEthToWallets();
