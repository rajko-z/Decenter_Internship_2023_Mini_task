const backendEndpoint = "http://localhost:5000"

export const getHistory = async () => {

    try {
        // const response = await fetch(`${backendEndpoint}/history`);
        // const data = await response.json();
        // return data;

        const res = [{'address': '0xABC', 'name': 'lutrija5', 'protocolId': 1, 'tokenSymbol': 'DAI', 'lastTVL': 100, 'yield': 10, 'endDate': 1689848249, 'winner': '0xWINNER1'},
                     {'address': '0xABC', 'name': 'lutrija6', 'protocolId': 1, 'tokenSymbol': 'USDC', 'lastTVL': 200, 'yield': 15, 'endDate': 1689848110, 'winner': '0xWINNER2'}]
    } catch {
        console.error("Error fetching history");
        return null;
    }
}