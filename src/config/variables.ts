import { ethers } from 'ethers';
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk';
import { Ether, Token, ChainId } from '@uniswap/sdk-core';
import { permit2Address } from '@uniswap/permit2-sdk';

import {
	RPC_ENDPOINT,
	PROVIDER_PRIVATE_KEY,
	TOKEN_ADDRESS,
	TOKEN_DECIMALS,
} from './constants';

export const chainId = ChainId.BASE;

export const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
export const mainWallet = new ethers.Wallet(
	String(PROVIDER_PRIVATE_KEY),
	provider
);

export const ETHER = Ether.onChain(Number(chainId));

export const WETH = new Token(
	chainId,
	String('0x4200000000000000000000000000000000000006'),
	18,
	'WETH',
	'Wrapped Ether'
);
export const SWAPTOKEN = new Token(
	chainId,
	String(TOKEN_ADDRESS),
	TOKEN_DECIMALS,
	'TOK',
	'TOKEN'
);
export const PERMIT2_ADDRESS = permit2Address(chainId);
export const UNIVERSAL_SWAP_ROUTER = UNIVERSAL_ROUTER_ADDRESS(chainId);
