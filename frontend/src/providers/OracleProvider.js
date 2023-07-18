
import { contractOracles } from '../constants/Oracles'
import Decimal from 'decimal.js';

/**
 * Retrieves the latest token price from the specified token's contract oracle.
 * @param {string} tokenName - The name of the token.
 * @returns {Promise<number|null>} - A Promise that resolves to the token price as a number, or null if there is an error.
 */
export const getTokenPrice = async (tokenName) => {

    try {
        let value = await contractOracles[tokenName].methods.latestAnswer().call();
        let convertedValue = new Decimal(value.toString()).div(10 ** 8);
        return convertedValue.toNumber();
    } catch {
        console.error("Error fetching token price");
        return null;
    }
}