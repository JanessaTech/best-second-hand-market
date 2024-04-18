## About this project

The project is the front-end part of a web3 marketplace where users can buy and sell their NFTs using ERC20 token
For the backend part of this project: https://github.com/JanessaTech/best-second-hand-market-backend

To run this project, make sure you check out both front-end part and backend aprt

## How to play with the project

Check out https://www.youtube.com/watch?v=UCe7ilfKP8o&t=20s about how the project works like

## The key functions of the project

- Mint a NFT
- Explore/filter/search NFTs
- Buy & sell NFT using ERC20 token
- Put NFTs to cart waiting for payment
- Charge account by ERC20 token
- Leave comments for a NFT
- Update user setting

## How to install

```
npm install
```

## Installed Dependences

```
npm install hardhat
npm install --save @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
npm install siwe
npm install ethers
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
npm install @mui/icons-material
npm install react-router-dom
npm install axios
npm install react-hook-form @hookform/resolvers yup
npm install react-infinite-scroll-component
npm install dotenv
npm install loglevel
```

## The list of 3-party libraries used

- siwe
- ethers
- material-ui
- axios
- hardhat
- @openzeppelin/contracts
- dotenv
- loglevel

## How to Run

The project can run both local and testnet. For mainnet, I haven't yet published it on it.
If you want to run it locally, check **How to run on local** section.
If you want to run it on testnet(Sepolia), check **How to run on testnet** section
If you want to run it on mainnet, check **How to run on mainnet** section

### How to run on local

The overview of steps:

1. Deploy smart contracts
2. Install tools
3. Edit config file
4. Start backend
5. Start frontend

#### 1. Deploy smart contracts

- Start remixd and hardhat network
  I will deploy contract using remix, make sure you've installed remixd on local.
  Run the following commands under the root directory of the project

```
remixd.cmd  (you need run `npm install -g @remix-project/remixd` if remixd is not found)
npx hardhat node
```

- Connect remix and choose harthat as provider
  On remix, we connect to localhost first and choose harthat as provider. Then we start to deploy contracts one by one

- Deploy CoreMarket1155.sol
  For CoreMarket1155.sol, deploy it using:

```
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,"CH"
0x70997970C51812dc3A010C7d01b50e0d17dc79C8,"CH"

0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 and 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 are the addresses as being owner for each deployment.
You could choose whatever address as owner
```

Make notes of the address for each deployment, we will use them later on

- Deploy Balance.sol
  For Balance.sol, deploy it using:

```
"cheap","CH"
```

Make notes of the address for the deployment, we will use it later on

#### 2. Edit config file

Edit src/config/config.common.js. under chains.local.contracts, update address:

- For CoreMarket1155.sol
  We got 2 addresses after deployments. For example, we got addressA and addressB.
  Replace '0x5FbDB2315678afecb367f032d93F642f64180aa3' with 'addressA'
  and replace '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' with 'addressB'
- For Balance.sol
  We got one address after deployment. For example, we got addressC.
  Replace 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 with 'addressC'

#### 3. Install MetaMask and confiure hardhat in it

Check the link below regarding how to setup MetaMask
https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6

Once MetaMask is installed, configure a newtwork for hardhat. The setting for configuring a network for hardhat is below:

```
url: http://127.0.0.1:8545/
chain id: 31337
Currency Symbol: HardhatETH
```

#### 4. Start backend

Go to https://github.com/JanessaTech/best-second-hand-market-backend to check how to start backend

#### 5. Start frontend

Once the backend is started and works well, go back front-end part(this project) and the command below:

```
npm start   // start it as dev by default
or
npm run start_win_dev
```

### How to run on testnet

The overview of steps:

1. Deploy smart contracts
2. Install tools
3. Edit config file
4. Start backend
5. Start frontend

Steps from #1 - #4 are the same as steps(#1 - #4) in **How to run on local**

#### 5. Start frontend

Once the backend is started and works well, go back front-end part(this project) and the command below:

```
npm run start_win_stage
```

### How to run on mainnet

```
npm run start_win_prod
```

## How to run test cases for smart contracts

```
npx hardhat test .\test\CoreMarket1155.js
```
