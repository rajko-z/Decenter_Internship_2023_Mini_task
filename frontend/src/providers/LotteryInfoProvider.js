// calls to the backend
// 1. get active lotteries
// 2. get users lotteries
// 3. check if user is in lottery
// 4. check is user is winner of the lottery

const providerEndpoint = "http://localhost:5000"

/** GET request to the backend to fetch all active lotteries.
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
        console.error("Error fetching all active lotteries");
        return null;
    }
}

/** POST request to the backend to fetch the active lotteries associated with a specific user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {Promise<Object[]|null>} - A Promise that resolves to an array of active lotteries data objects associated with the user, or null if there is an error.
 */
const getMyActiveLotteries = async (wallet) => {

    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wallet: wallet })
        };

        const response = await fetch(`${providerEndpoint}/user-active-lotteries`, requestOptions)
        if (!response.ok) 
            throw new Error('Failed to fetch users active lotteries');
    
        const data = await response.json();
        return data;
    } catch {
        console.error("Error fetching users active lotteries");
        return null;
    }
}

/** POST request to the backend to fetch the past lotteries associated with a specific user.
 * @param {string} wallet - The wallet address of the user.
 * @returns {Promise<Object[]|null>} - A Promise that resolves to an array of active lotteries data objects associated with the user, or null if there is an error.
 */
const getMyPastLotteries = async (wallet) => {

    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wallet: wallet })
        };

        const response = await fetch(`${providerEndpoint}/user-past-lotteries`, requestOptions)
        if (!response.ok) 
            throw new Error('Failed to fetch users past lotteries');
    
        const data = await response.json();
        return data;
    } catch {
        console.error("Error fetching users past lotteries");
        return null;
    }
}