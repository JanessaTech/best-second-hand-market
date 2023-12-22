import { SiweMessage } from 'siwe';
import useFetch from '../../common/useFetch';
const BACKEND_ADDR = "http://localhost:3100";

const domain = window.location.host;
const origin = window.location.origin;

export default function CreateSiweMessage(address, statement, chainId)  {
    const nonce = useFetch({url: `${BACKEND_ADDR}/apis/v1/siwe/nonce`})
    console.log("get nonce by useFetch:", nonce)
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
