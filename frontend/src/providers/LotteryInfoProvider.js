// calls to the backend
// 1. get active lotteries
// 2. get users lotteries
// 3. check if user is in lottery
// 4. check is user is winner of the lottery

const providerEndpoint = "http://localhost:5000"

/**
 * Fetches the active lotteries data from the specified endpoint.
 * @returns {Promise<Object[]|null>} - A Promise that resolves to an array of active lotteries data objects, or null if there is an error.
 */
const getActiveLotteries = async () => {

    try {
        const response = await fetch(`${providerEndpoint}/active-lotteries`);
        if (!response.ok) 
            throw new Error('Failed to fetch active lotteries');
    
        const data = await response.json();
        return data;
    } catch {
        console.error("Error fetching active lotteries");
        return null;
    }
}