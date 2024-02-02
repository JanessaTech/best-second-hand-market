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
      ]
}

export default config