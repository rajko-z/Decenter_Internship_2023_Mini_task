const backendEndpoint = "http://localhost:5000"

export const getHistory = async () => {

    try {
        // const response = await fetch(`${backendEndpoint}/history`);
        // const data = await response.json();
        // return data;

        const res = [ {'id': 7, 'name': "name7", 'protocol': 'Aave', 'tokenName': 'DAI', 'maxTVL': 500, 'yield': 50, 'endDate': '25.5.2023.', 'winner': '0x0'}, 
                      {'id': 8, 'name': "name8", 'protocol': 'Aave', 'tokenName': 'USDC', 'maxTVL': 500, 'yield': 20, 'endDate': '27.03.2023.', 'winner': '0x98b638822892fBAFd7F338780D50BAe8a3336C48'}]

                      
    } catch {
        console.error("Error fetching history");
        return null;
    }
}