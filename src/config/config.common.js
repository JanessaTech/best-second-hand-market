// This file is shared by both frontend and backend

const config = {}
config.limits = {
  cartlimit: 20
}
config.multer = {
  profileSize: 1048576, // less than 1M
  productSize: 104857600, // less than 100M
  fileTypes: /jpeg|jpg|png|gif/,  // file types accepted
  acceptedImageTypes: ['image/gif', 'image/jpeg', 'image/png'],
  profileFieldPrefix:'profile',
  productFieldPrefix:'product',
}
config.CATEGORIES = Object.freeze({
  Pets: Symbol("pets"),
  Clothes: Symbol("clothes"),
  Cosmetics: Symbol("cosmetics"),
  Outfits: Symbol("outfits"),
  Cars: Symbol("cars"),
  Devices: Symbol("devices"),
  Books: Symbol("books")
})
config.NFTSTATUS = Object.freeze({
  On: Symbol("on"),
  Off: Symbol("off")
})
config.chains = { 
    local: [
      {
      chainId: 31337,
      enabled: true,
      chainName: 'hardhat',
      currency: 'HardHatETH',
      rpcUrl:'http://127.0.0.1:8545/',
      contracts: [  // configure at least one
          {
            address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', 
            abi: [
                'function symbol() public view returns (string)',
                'function ownerOfToken(uint _tokenId) public view returns (address)',
                'function tokensOfAddress(address _address) public view returns(uint[])',
                'function mint(address to, string _uri) public returns(uint)',
                'function mintBatch(address to, string[] _uris) public returns(uint[])',
                'function getAllTokenIds() public view returns(uint[])',
                'function getNextToken() public view returns(uint)',
                'function getUri(uint _id) public view returns(string)',
                'function buy(address from, address to, uint[] ids) public',
                'function doSafeBuy(address from, address to, uint[] ids) public',
                'function buyBatch(address[] froms, address to, uint[][] idss) public',
                'function doSafeBuyBatch(address[] froms, address to, uint[][] idss) public',
                'event mint_tracer(address indexed to, uint indexed tokenId, string uri)',
                'event mintBatch_tracer(address indexed to, uint[] tokenIds, string[] uris)',
                'event buy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event buyBatch_tracer(address indexed to, address[] froms,uint[][] idss)',
                'event doSafeBuyBatch_tracer(address indexed to, address[] froms,uint[][] idss)'
            ],
            tokenStandard: '1155'
          },
          {
            address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', 
            abi: [
                'function symbol() public view returns (string)',
                'function ownerOfToken(uint _tokenId) public view returns (address)',
                'function tokensOfAddress(address _address) public view returns(uint[])',
                'function mint(address to, string _uri) public returns(uint)',
                'function mintBatch(address to, string[] _uris) public returns(uint[])',
                'function getAllTokenIds() public view returns(uint[])',
                'function getNextToken() public view returns(uint)',
                'function getUri(uint _id) public view returns(string)',
                'function buy(address from, address to, uint[] ids) public',
                'function doSafeBuy(address from, address to, uint[] ids) public',
                'function buyBatch(address[] froms, address to, uint[][] idss) public',
                'function doSafeBuyBatch(address[] froms, address to, uint[][] idss) public',
                'event mint_tracer(address indexed to, uint indexed tokenId, string uri)',
                'event mintBatch_tracer(address indexed to, uint[] tokenIds, string[] uris)',
                'event buy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event buyBatch_tracer(address indexed to, address[] froms,uint[][] idss)',
                'event doSafeBuyBatch_tracer(address indexed to, address[] froms,uint[][] idss)'
            ],
            tokenStandard: '1155'
          }
        ]
      }
    ],
    testnet:[
      {
        chainId: 11155111,
        enabled: true,
        chainName: 'sepolia',
        currency: 'SepoliaETH',
        rpcUrl:'https://rpc.sepolia.org',
        contracts:[
          {
            address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', 
            abi: [
                'function symbol() public view returns (string)',
                'function ownerOfToken(uint _tokenId) public view returns (address)',
                'function tokensOfAddress(address _address) public view returns(uint[])',
                'function mint(address to, string _uri) public returns(uint)',
                'function mintBatch(address to, string[] _uris) public returns(uint[])',
                'function getAllTokenIds() public view returns(uint[])',
                'function getNextToken() public view returns(uint)',
                'function getUri(uint _id) public view returns(string)',
                'function buy(address from, address to, uint[] ids) public',
                'function doSafeBuy(address from, address to, uint[] ids) public',
                'function buyBatch(address[] froms, address to, uint[][] idss) public',
                'function doSafeBuyBatch(address[] froms, address to, uint[][] idss) public',
                'event mint_tracer(address indexed to, uint indexed tokenId, string uri)',
                'event mintBatch_tracer(address indexed to, uint[] tokenIds, string[] uris)',
                'event buy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event buyBatch_tracer(address indexed to, address[] froms,uint[][] idss)',
                'event doSafeBuyBatch_tracer(address indexed to, address[] froms,uint[][] idss)'
            ],
            tokenStandard: 'aaaa'
          },
          {
            address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', 
            abi: [
                'function symbol() public view returns (string)',
                'function ownerOfToken(uint _tokenId) public view returns (address)',
                'function tokensOfAddress(address _address) public view returns(uint[])',
                'function mint(address to, string _uri) public returns(uint)',
                'function mintBatch(address to, string[] _uris) public returns(uint[])',
                'function getAllTokenIds() public view returns(uint[])',
                'function getNextToken() public view returns(uint)',
                'function getUri(uint _id) public view returns(string)',
                'function buy(address from, address to, uint[] ids) public',
                'function doSafeBuy(address from, address to, uint[] ids) public',
                'function buyBatch(address[] froms, address to, uint[][] idss) public',
                'function doSafeBuyBatch(address[] froms, address to, uint[][] idss) public',
                'event mint_tracer(address indexed to, uint indexed tokenId, string uri)',
                'event mintBatch_tracer(address indexed to, uint[] tokenIds, string[] uris)',
                'event buy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event buyBatch_tracer(address indexed to, address[] froms,uint[][] idss)',
                'event doSafeBuyBatch_tracer(address indexed to, address[] froms,uint[][] idss)'
            ],
            tokenStandard: 'bbbb'
          },
        ]
      },
      {
        chainId: 80001,
        enabled: false,
        chainName: 'mumbai',
        currency: 'MATIC',
        rpcUrl:'https://rpc-mumbai.maticvigil.com',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf4', 
            abi: [],
            tokenStandard: 'cccc'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf5', 
            abi: [],
            tokenStandard: 'dddd'
          }
        ]
      },
      {
        chainId: 43113,
        enabled: false,
        chainName: 'fuji',
        currency: 'AVAX',
        rpcUrl:'https://api.avax-test.network/ext/bc/C/rpc',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf6', 
            abi: [],
            tokenStandard: 'eeee'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf7', 
            abi: [],
            tokenStandard: 'ffff'
          }
        ]
      },
      {
        chainId: 10200,
        enabled: false,
        chainName: 'chiado',
        currency: 'XDAI',
        rpcUrl:'https://rpc.chiadochain.net',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf8', 
            abi: [],
            tokenStandard: 'gggg'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf9', 
            abi: [],
            tokenStandard: 'hhhh'
          }
        ]
      }
    ],
    mainnet: [
      {
        chainId: 1,
        enabled: true,
        chainName: 'ethereum',
        currency: 'ETH',
        rpcUrl:'https://mainnet.infura.io/v3/',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb18', 
            abi: [
                'function symbol() public view returns (string)',
                'function ownerOfToken(uint _tokenId) public view returns (address)',
                'function tokensOfAddress(address _address) public view returns(uint[])',
                'function mint(address to, string _uri) public returns(uint)',
                'function mintBatch(address to, string[] _uris) public returns(uint[])',
                'function getAllTokenIds() public view returns(uint[])',
                'function getNextToken() public view returns(uint)',
                'function getUri(uint _id) public view returns(string)',
                'function buy(address from, address to, uint[] ids) public',
                'function doSafeBuy(address from, address to, uint[] ids) public',
                'function buyBatch(address[] froms, address to, uint[][] idss) public',
                'function doSafeBuyBatch(address[] froms, address to, uint[][] idss) public',
                'event mint_tracer(address indexed to, uint indexed tokenId, string uri)',
                'event mintBatch_tracer(address indexed to, uint[] tokenIds, string[] uris)',
                'event buy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event buyBatch_tracer(address indexed to, address[] froms,uint[][] idss)',
                'event doSafeBuyBatch_tracer(address indexed to, address[] froms,uint[][] idss)'
            ],
            tokenStandard: 'iiii'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb28', 
            abi: [
                'function symbol() public view returns (string)',
                'function ownerOfToken(uint _tokenId) public view returns (address)',
                'function tokensOfAddress(address _address) public view returns(uint[])',
                'function mint(address to, string _uri) public returns(uint)',
                'function mintBatch(address to, string[] _uris) public returns(uint[])',
                'function getAllTokenIds() public view returns(uint[])',
                'function getNextToken() public view returns(uint)',
                'function getUri(uint _id) public view returns(string)',
                'function buy(address from, address to, uint[] ids) public',
                'function doSafeBuy(address from, address to, uint[] ids) public',
                'function buyBatch(address[] froms, address to, uint[][] idss) public',
                'function doSafeBuyBatch(address[] froms, address to, uint[][] idss) public',
                'event mint_tracer(address indexed to, uint indexed tokenId, string uri)',
                'event mintBatch_tracer(address indexed to, uint[] tokenIds, string[] uris)',
                'event buy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)',
                'event buyBatch_tracer(address indexed to, address[] froms,uint[][] idss)',
                'event doSafeBuyBatch_tracer(address indexed to, address[] froms,uint[][] idss)'
            ],
            tokenStandard: 'jjjj'
          },
        ]
      },
      {
        chainId: 137,
        enabled: false,
        chainName: 'polygon',
        currency: 'MATIC',
        rpcUrl:'https://polygon-rpc.com',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb38', 
            abi: [],
            tokenStandard: 'kkkk'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb48', 
            abi: [],
            tokenStandard: '1llll'
          },
        ]
      },
      {
        chainId: 43114,
        enabled: false,
        chainName: 'avalanche',
        currency: 'AVAX',
        rpcUrl:'https://avalanche-mainnet.infura.io',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb58', 
            abi: [],
            tokenStandard: 'mmmm'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb68',
            abi: [], 
            tokenStandard: 'nnnn'
          },
        ]
      },
      {
        chainId: 100,
        enabled: false,
        chainName: 'gnosis',
        currency: 'XDAI',
        rpcUrl:'https://rpc.gnosischain.com',
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb78', 
            abi: [],
            tokenStandard: 'oooo'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb88', 
            abi: [],
            tokenStandard: 'pppp'
          },
        ]
      }
    ]
  }

  module.exports = config