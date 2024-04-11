// This file will be shared by frontend
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
      rpcUrl:'ws://127.0.0.1:8545/',
      exchange: 100,
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
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)'
                
            ],
            tokenStandard: 'ERC1155'
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
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)'
            ],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
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
        rpcUrl:'wss://ethereum-sepolia-rpc.publicnode.com',
        exchange: 900000000,
        contracts:[
          {
            address: '0xc4eC16B260aD902407AC3082AA75BB86281f8618', 
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
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)'
            ],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcbe5F1893b598F5f571288087833435DD1319DF8', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      },
      {
        chainId: 80001,
        enabled: false,
        chainName: 'mumbai',
        currency: 'MATIC',
        rpcUrl:'https://rpc-mumbai.maticvigil.com',
        exchange: 300,
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf4', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf5', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      },
      {
        chainId: 43113,
        enabled: false,
        chainName: 'fuji',
        currency: 'AVAX',
        rpcUrl:'https://api.avax-test.network/ext/bc/C/rpc',
        exchange: 400,
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf6', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf7', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      },
      {
        chainId: 10200,
        enabled: false,
        chainName: 'chiado',
        currency: 'XDAI',
        rpcUrl:'https://rpc.chiadochain.net',
        exchange: 500,
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf8', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf9', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
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
        exchange: 600,
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
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)'
            ],
            tokenStandard: 'ERC1155'
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
                'event doSafeBuy_tracer(address indexed from, address indexed to, uint[] ids)'
            ],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      },
      {
        chainId: 137,
        enabled: false,
        chainName: 'polygon',
        currency: 'MATIC',
        rpcUrl:'https://polygon-rpc.com',
        exchange: 700,
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb38', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb48', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      },
      {
        chainId: 43114,
        enabled: false,
        chainName: 'avalanche',
        currency: 'AVAX',
        rpcUrl:'https://avalanche-mainnet.infura.io',
        exchange: 200,
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb58', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb68',
            abi: [], 
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      },
      {
        chainId: 100,
        enabled: false,
        chainName: 'gnosis',
        currency: 'XDAI',
        rpcUrl:'https://rpc.gnosischain.com',
        exchange: 800,
        contracts:[
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb78', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0xcdcbb4f79e3770252ee32d89b6673eb68f27bb88', 
            abi: [],
            tokenStandard: 'ERC1155'
          },
          {
            address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 
            abi: [
                'function mint(address to, uint256 amount) public payable',
                'function transferInBatch(address[] tos, uint256[] values) public',
                'function transfer(address to, uint256 value) public returns(bool)',
                'function balanceOf(address account) public view returns (uint256)',
                'event transferInBatch_tracer(address[] tos, uint256[] values)'
            ],
            tokenStandard: 'ERC20'
          }
        ]
      }
    ]
  }

  module.exports = config