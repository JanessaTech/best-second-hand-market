import { BrowserProvider } from 'ethers';
import { Box, Button } from '@mui/material';
import { SiweMessage } from 'siwe';
import {BACKEND_ADDR} from '../common/constant'


const domain = window.location.host;
const origin = window.location.origin;

export default function Siwe() {

  const provider = new BrowserProvider(window.ethereum);

  const getNonce = async () => {
    const rawResponse = await fetch(`${BACKEND_ADDR}/apis/v1/siwe/nonce`, {
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    })
    const content = await rawResponse.json();
    console.log(content);
    return content?.data?.nonce
  }

  const verify = async (data) => {
    const rawResponse = await fetch(`${BACKEND_ADDR}/apis/v1/siwe/verify`, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const content = await rawResponse.json();
    console.log(content);
    return content?.data?.verify
  }

  const createSiweMessage = async(address, statement, chainId) => {
    const nonce = await getNonce()
    console.log(`a new nonce : ${nonce} in createSiweMessage`)
    const siweMessage = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: Number(chainId)
    })
    return siweMessage.prepareMessage()
  }

  const connectWallet  = (e) => {
    e.preventDefault()
    provider.send('eth_requestAccounts', [])
    .catch(() => {
      console.log('user rejected request')
    })
  }

  const signInWithEthereum = async () => {
    const signer = await provider.getSigner();
    const address = await signer.getAddress()
    const statement = 'Sign in with Ethereum to the app.'
    const network  = await provider.getNetwork()
    console.debug('network:', network)
    const chainId = (await provider.getNetwork()).chainId
    console.debug('address=', address)
    console.debug('chainId=', chainId)
    const message = await createSiweMessage(address, statement, chainId)
    console.info(message)
    const signature = await signer.signMessage(message)
    console.info("signature:", signature)
    const verified = await verify({message: message, signature: signature})
    console.log('verified:', verified)
  }

  return (
    <Box>
      <Button variant='contained' sx={{textTransform: 'none'}} onClick={connectWallet}>Connect Wallet</Button>
      <br/>
      <br/>
      <Button variant='contained' sx={{textTransform: 'none'}} onClick={signInWithEthereum}>Sign-in with Ethereum</Button>
    </Box>
    
  );
}

