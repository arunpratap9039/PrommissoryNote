import Web3 from 'web3';

let web3;

const initWeb3 = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
  if (typeof window !== 'undefined' && window.ethereum) {
    // MetaMask is detected, continue with Web3 initialization
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      return web3;
    } catch (error) {
      console.error('User denied account access or MetaMask not available');
      return null;
    }
  } else {
    console.error('MetaMask not detected or not available.');
    return null;
  }
};

export default initWeb3;
