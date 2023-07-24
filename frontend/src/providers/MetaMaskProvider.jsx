import detectEthereumProvider from '@metamask/detect-provider'

export const getConnectedWallet = async () => {

    const provdier = await detectEthereumProvider()

    if(!provdier) 
        return '0x0000000000000000000000000000000000000000'

    const accounts = await window.ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
        console.log(`You're connected to: ${accounts[0]}`);
        return accounts[0]
    } else {
      console.log("Metamask is not connected");
      return '0x0000000000000000000000000000000000000000'
    }

}