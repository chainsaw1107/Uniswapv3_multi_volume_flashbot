import dotenv from 'dotenv';
import { Logger } from 'winston';
import { logger } from './logger';
import { ethers } from 'ethers';

dotenv.config();

const retrieveEnvVariable = (variableName: string, logger: Logger) => {
	const variable = process.env[variableName] || '';
	if (!variable) {
		logger.error(`${variableName} is not set`);
		process.exit(1);
	}
	return variable;
};

const isValidAddress = (address: string) => {
	if (!ethers.utils.isAddress(address)) {
		logger.error(`${address} is not valid address`);
		process.exit(1);
	}
	return address;
};

export const PROVIDER_PRIVATE_KEY = retrieveEnvVariable(
	'PROVIDER_PRIVATE_KEY',
	logger
);

const gather_wallet_address = retrieveEnvVariable(
	'GATHER_WALLET_ADDRESS',
	logger
);

const token_address: string = retrieveEnvVariable('TOKEN_ADDRESS', logger);
const pool_address: string = retrieveEnvVariable('POOL_ADDRESS', logger);

export const GATHER_WALLET_ADDRESS = isValidAddress(gather_wallet_address);
export const TOKEN_ADDRESS = isValidAddress(token_address);
export const POOL_ADDRESS = isValidAddress(pool_address);
export const TOKEN_DECIMALS: number = Number(
	retrieveEnvVariable('TOKEN_DECIMALS', logger)
);

// Connection
export const RPC_ENDPOINT: string = retrieveEnvVariable('RPC_ENDPOINT', logger);
export const FEE: string = retrieveEnvVariable('FEE', logger);

export const MAX_TIME: number = Number(retrieveEnvVariable('MAX_TIME', logger));
export const MIN_TIME: number = Number(retrieveEnvVariable('MIN_TIME', logger));
export const MAX_TRADE_WAIT: number = Number(
	retrieveEnvVariable('MAX_TRADE_WAIT', logger)
);
export const MIN_TRADE_WAIT: number = Number(
	retrieveEnvVariable('MIN_TRADE_WAIT', logger)
);
export const MIN_SELL_QUANTITY: number = Number(
	retrieveEnvVariable('MIN_SELL_QUANTITY', logger)
);
export const MAX_SELL_QUANTITY: number = Number(
	retrieveEnvVariable('MAX_SELL_QUANTITY', logger)
);
export const MIN_BUY_QUANTITY: number = Number(
	retrieveEnvVariable('MIN_BUY_QUANTITY', logger)
);
export const MAX_BUY_QUANTITY: number = Number(
	retrieveEnvVariable('MAX_BUY_QUANTITY', logger)
);
export const NUMBER_OF_WALLETS: number = Number(
	retrieveEnvVariable('NUMBER_OF_WALLETS', logger)
);
export const SEND_COIN_AMOUNT = retrieveEnvVariable('SEND_COIN_AMOUNT', logger);
export const TRANSACTION_COUNT_PER_BUNDLE: number = Number(
	retrieveEnvVariable('TRANSACTION_COUNT_PER_BUNDLE', logger)
);
// export const JITO_FEE = retrieveEnvVariable('JITO_FEE', logger);
export const SLIPPAGE: number = Number(retrieveEnvVariable('SLIPPAGE', logger));
export const BUFFER: number = Number(retrieveEnvVariable('BUFFER', logger));
export const GAS_LIMIT: number = Number(
	retrieveEnvVariable('GAS_LIMIT', logger)
);
export const GAS_PRICE: string = String(
	retrieveEnvVariable('GAS_PRICE', logger)
);
