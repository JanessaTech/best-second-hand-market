const config = {
    contracts:  [
        {
          chain: 'ethereum',
          local: [
            {address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0', tokenStandard: '721'},
            {address: '0xcdcbb4f79e3770252ee32d89b6673eb68ffdd342', tokenStandard: '1155'},
          ],
          testnet: [
            {address: '0xaaaaaa', tokenStandard: 'aaaa'},
            {address: '0xbbbbbb', tokenStandard: 'bbbb'},
          ],
          mainnet: [
            {address: '0xcccccc', tokenStandard: 'cccc'},
            {address: '0xdddddd', tokenStandard: 'dddd'},
          ]
        },
        {
          chain: 'polygon',
          local: [
            {address: '0xeeeeee', tokenStandard: 'eeee'},
            {address: '0xffffff', tokenStandard: 'ffff'},
          ],
          testnet: [
            {address: '0xggggg', tokenStandard: 'gggg'},
            {address: '0xhhhhh', tokenStandard: 'hhhh'},
          ],
          mainnet: [
            {address: '0xiiiiii', tokenStandard: 'iiii'},
            {address: '0xjjjjjj', tokenStandard: 'jjjj'},
          ]
        },
        {
          chain: 'avalanche',
          local: [
            {address: '0xkkkkkkk', tokenStandard: 'kkkk'},
            {address: '0xlllllll', tokenStandard: '1llll'},
          ],
          testnet: [
            {address: '0xmmmmmmm', tokenStandard: 'mmmm'},
            {address: '0xnnnnnnn', tokenStandard: 'nnnn'},
          ],
          mainnet: [
            {address: '0xoooooo', tokenStandard: 'oooo'},
            {address: '0xpppppp', tokenStandard: 'pppp'},
          ]
        },
        {
          chain: 'solana',
          local: [
            {address: '0xqqqqqqqq', tokenStandard: 'qqqq'},
            {address: '0xrrrrrrrr', tokenStandard: 'rrrr'},
          ],
          testnet: [
            {address: '0xssssssss', tokenStandard: 'ssss'},
            {address: '0xtttttttt', tokenStandard: 'tttt'},
          ],
          mainnet: [
            {address: '0xuuuuuuuu', tokenStandard: 'uuuu'},
            {address: '0xvvvvvvvv', tokenStandard: 'vvvv'},
          ]
        }
      ],
      chains: { // to do: add validation for chains
        local: [
          {
          chainId: 31337,
          chainName: 'hardhat',
          currency: 'HardHatETH',
          rpcUrls:'http://127.0.0.1:8545/',
          contracts: [  // configure at least one
              {address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0', tokenStandard: '721'},
              {address: '0xcdcbb4f79e3770252ee32d89b6673eb68ffdd342', tokenStandard: '1155'},
            ]
          }
        ],
        testnet:[
          {
            chainId: 11155111,
            chainName: 'sepolia',
            currency: 'SepoliaETH',
            rpcUrls:'https://sepolia.infura.io/v3/',
            contracts:[
              {address: '0xaaaaaa', tokenStandard: 'aaaa'},
              {address: '0xbbbbbb', tokenStandard: 'bbbb'},
            ]
          },
          {
            chainId: 80001,
            chainName: 'mumbai',
            currency: 'MATIC',
            rpcUrls:'https://rpc-mumbai.maticvigil.com',
            contracts:[
              {address: '0xcccccc', tokenStandard: 'cccc'},
              {address: '0xdddddd', tokenStandard: 'dddd'}
            ]
          },
          {
            chainId: 43113,
            chainName: 'fuji',
            currency: 'AVAX',
            rpcUrls:'https://api.avax-test.network/ext/bc/C/rpc',
            contracts:[
              {address: '0xeeeeee', tokenStandard: 'eeee'},
              {address: '0xffffff', tokenStandard: 'ffff'}
            ]
          },
          {
            chainId: 10200,
            chainName: 'chiado',
            currency: 'XDAI',
            rpcUrls:'https://rpc.chiadochain.net',
            contracts:[
              {address: '0xggggg', tokenStandard: 'gggg'},
              {address: '0xhhhhh', tokenStandard: 'hhhh'}
            ]
          }
        ],
        mainnet: [
          {
            chainId: 1,
            chainName: 'ethereum',
            currency: 'ETH',
            rpcUrls:'https://mainnet.infura.io/v3/',
            contracts:[
              {address: '0xiiiiii', tokenStandard: 'iiii'},
              {address: '0xjjjjjj', tokenStandard: 'jjjj'},
            ]
          },
          {
            chainId: 137,
            chainName: 'polygon',
            currency: 'MATIC',
            rpcUrls:'https://polygon-rpc.com',
            contracts:[
              {address: '0xkkkkkkk', tokenStandard: 'kkkk'},
              {address: '0xlllllll', tokenStandard: '1llll'},
            ]
          },
          {
            chainId: 43114,
            chainName: 'avalanche',
            currency: 'AVAX',
            rpcUrls:'https://avalanche-mainnet.infura.io',
            contracts:[
              {address: '0xmmmmmmm', tokenStandard: 'mmmm'},
              {address: '0xnnnnnnn', tokenStandard: 'nnnn'},
            ]
          },
          {
            chainId: 100,
            chainName: 'gnosis',
            currency: 'XDAI',
            rpcUrls:'https://rpc.gnosischain.com',
            contracts:[
              {address: '0xoooooo', tokenStandard: 'oooo'},
              {address: '0xpppppp', tokenStandard: 'pppp'},
            ]
          }
        ]
      }
   
}

export default config