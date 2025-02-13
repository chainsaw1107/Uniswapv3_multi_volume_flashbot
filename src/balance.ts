import dotenv from 'dotenv';
import { getRandomNumber, getRandomRunTime } from './config/config';
import { buyToken, sellToken } from './config/utils';
import { ErrorStatusCode } from './config/config';

dotenv.config();

const failed_trade_wait = Number(process.env.FAILED_TRADE_WAIT);

let action = 0;
export const ErrorHandler = (error) => {
	let value = 0;
	console.error('Error\n', error.message);
	if (error.data === ErrorStatusCode.INSUFFICIENT_FUNDS_BUY) {
		value = 1;
	} else if (error.data === ErrorStatusCode.INSUFFICIENT_FUNDS_SELL) {
		process.exit(1);
	} else if (error.data === ErrorStatusCode.INSUFFICIENT_ETH) {
		value = 1; //sell
	} else if (error.data === ErrorStatusCode.INSUFFICIENT_TOKEN) {
		value = 2; //buy
	}
	if (action + value === 3) {
		console.log('No enough tokens or coins in your wallet');
		process.exit(1);
	}
	action = value;
	return value;
};
const balance = async () => {
	try {
		if (action === 2) {
			console.log('----------------Start Buying----------------');
			const tokenAmount = getRandomNumber(
				Number(process.env.MIN_BUY_QUANTITY),
				Number(process.env.MAX_BUY_QUANTITY)
			);
			console.log(`I will buy ${tokenAmount} tokens`);
			try {
				await buyToken(tokenAmount);
				action = 0;
			} catch (error) {
				action = ErrorHandler(error);
			}
		} else if (action === 1) {
			console.log('----------------Start Selling----------------');

			const tokenAmount = getRandomNumber(
				Number(process.env.MIN_SELL_QUANTITY),
				Number(process.env.MAX_SELL_QUANTITY)
			);
			console.log(`I will sell ${tokenAmount} tokens`);
			try {
				await sellToken(tokenAmount);
				action = 0;
			} catch (error) {
				action = ErrorHandler(error);
			}
		} else {
			const rnt = getRandomRunTime(1, 2);
			if (rnt == 1) {
				console.log('----------------Start Buying----------------');
				const tokenAmount = getRandomNumber(
					Number(process.env.MIN_BUY_QUANTITY),
					Number(process.env.MAX_BUY_QUANTITY)
				);
				console.log(`I will buy ${tokenAmount} tokens`);

				try {
					await buyToken(tokenAmount);
					action = 0;
				} catch (error) {
					action = ErrorHandler(error);
				}
			} else {
				console.log('----------------Start Selling----------------');

				const tokenAmount = getRandomNumber(
					Number(process.env.MIN_SELL_QUANTITY),
					Number(process.env.MAX_SELL_QUANTITY)
				);
				console.log(`I will sell ${tokenAmount} tokens`);

				try {
					await sellToken(tokenAmount);
					action = 0;
				} catch (error) {
					action = ErrorHandler(error);
				}
			}
		}
	} catch (error) {
		console.log(error);
	}

	let wtime = failed_trade_wait;
	if (action === 0) {
		wtime = getRandomRunTime(
			Number(process.env.MIN_TRADE_WAIT),
			Number(process.env.MAX_TRADE_WAIT)
		);
	}

	console.log(`waiting ${wtime} miliseconds...`);
	setTimeout(balance, wtime);
};

let timeout = getRandomRunTime(
	Number(process.env.MIN_TIME),
	Number(process.env.MAX_TIME)
);
console.log(`We will exit this process after ${timeout} seconds...`);

balance();
setInterval(() => {
	if (timeout === 0) {
		console.log('process is exited\n\t Times up!');
		process.exit(1);
	}
	timeout--;
}, 1000);
