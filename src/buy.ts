import { ethers } from 'ethers';
import { getRandomNumber, getRandomRunTime } from './config/config';
import {
	ErrorHandler,
	buyToken,
	tokenContract,
	quoterContract,
	getPool,
	simpleSwapEthToToken,
	sendAndConfirmBundle,
} from './config/utils';
import { logger } from './config/logger';
import {
	chainId,
	mainWallet,
	provider,
	WETH,
	SWAPTOKEN,
} from './config/variables';
import wallets from '../wallets.json';
import {
	NUMBER_OF_WALLETS,
	MIN_TIME,
	MAX_TIME,
	TRANSACTION_COUNT_PER_BUNDLE,
	POOL_ADDRESS,
	MIN_BUY_QUANTITY,
	MAX_BUY_QUANTITY,
	TOKEN_DECIMALS,
	FEE,
	BUFFER,
} from './config/constants';
import JSBI from 'jsbi';
import { FeeAmount, Pool } from '@uniswap/v3-sdk';
import { CurrencyAmount } from '@uniswap/sdk-core';
let transactionCountPerBundle: number = TRANSACTION_COUNT_PER_BUNDLE;
let poolInfo: Pool;

interface WALLET_STATUS {
	wallet: ethers.Wallet;
	id: number;
}

let walletArray: WALLET_STATUS[] = [];
let timeout = getRandomRunTime(MIN_TIME, MAX_TIME);
const main = async () => {
	logger.info(`Randomly Buying`);
	logger.info(`We will exit this process after ${timeout} miliseconds...`);
	for (let i = 0; i < NUMBER_OF_WALLETS; i++) {
		const wallet = new ethers.Wallet(wallets[i].privateKey, provider);
		walletArray = [...walletArray, { wallet, id: i }];
	}
	await buy();
};
const shuffle = (arr: Array<any>) => {
	return arr.sort((a, b) => {
		return Math.random() - 0.5;
	});
};
export const buy = async () => {
	let bundleTransactions = [];
	let walletAmount = walletArray.length;
	
	walletArray = [...shuffle(walletArray)];
	for (let i = 0; i < transactionCountPerBundle; i++) {
		//Reconfig transaction number per bundle
		if (transactionCountPerBundle > walletAmount) {
			transactionCountPerBundle = walletAmount;
			i--;
			continue;
		}
		if (walletAmount === 0) {
			logger.info('Please send ETH to child wallets.');
			process.exit(1);
		}

		if (!poolInfo) {
			poolInfo = await getPool(WETH, SWAPTOKEN, FeeAmount[FEE], mainWallet);
		}

		let tokenAmount = getRandomNumber(MIN_BUY_QUANTITY, MAX_BUY_QUANTITY);

		const EthBalance_wallet = await provider.getBalance(
			walletArray[i].wallet.address
		);

		let tokenUnitAmount = Number(tokenAmount) * 10 ** TOKEN_DECIMALS;

		const [ethAmount, _] = await poolInfo.getInputAmount(
			CurrencyAmount.fromRawAmount(SWAPTOKEN, tokenUnitAmount)
		);

		if (
			JSBI.lessThan(
				JSBI.BigInt(EthBalance_wallet),
				JSBI.add(ethAmount.numerator, JSBI.BigInt(BUFFER * 10 ** 18))
			)
		) {
			walletArray = [...walletArray.filter((item, index) => index !== i)];
			walletAmount--;
			i--;
			continue;
		} else {
			let transaction = await simpleSwapEthToToken(
				walletArray[i].wallet,
				poolInfo,
				WETH,
				SWAPTOKEN,
				tokenAmount
			);
			bundleTransactions = [
				...bundleTransactions,
				{
					transaction,
					signer: walletArray[i].wallet,
				},
			];
		}
	}
	console.log(bundleTransactions);
	console.log('---------------------------');

	await sendAndConfirmBundle(bundleTransactions);
};

main();

setInterval(() => {
	if (timeout === 0) {
		console.log('process is exited\n\t Times up!');
		process.exit(1);
	}
	timeout--;
}, 1000);
