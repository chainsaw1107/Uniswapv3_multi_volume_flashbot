export const getRandomRunTime = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomNumber = (min: number, max: number) => {
	const result = Math.random() * (max - min) + min;
	return result.toFixed(6);
};

export enum ErrorStatusCode {
	INSUFFICIENT_TOKEN,
	INSUFFICIENT_ETH,
	POOL_NOT_FOUND,
	LIQUIDITY_NOT_FOUND,
	POOL_ADDRESS_NOT_FOUND,
	TRANSACTION_NOT_SENT,
	PERMIT2_NOT_APPROVE,
	UNI_ROUTER_NOT_APPROVE,
	INSUFFICIENT_FUNDS_BUY,
	INSUFFICIENT_FUNDS_SELL,
}
export const ErrorMessage = [
	'Insufficient token in wallet',
	'Insufficient coin in wallet',
	'Could not find Pool info',
	'Could not calculate liquidity',
	'Could not find pool address',
	'Could not send transaction',
	'Could not approve token on permit2',
	'Could not approve token on universal router',
	'INSUFFICIENT_FUNDS',
	'INSUFFICIENT_FUNDS',
];
