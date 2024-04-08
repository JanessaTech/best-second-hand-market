import config from '../config/index'
import logger from '../common/Logger'
import messageHelper from '../common/helpers/internationalization/messageHelper'

// to-do: refactor the file
function getEnv() {
  var env = config?.env
  if (!env || ['local', 'testnet', 'mainnet'].indexOf(env) === -1) {
    logger.error('[Utils - Chain] you do not set env varaible correctly. It should be one of values in [\'local\', \'testnet\', \'mainnet\']. Use local by default')
    env = 'local'
  }
  return env
}

export function networks() {
    var env = getEnv()
    const nets = config.chains[env]
    return nets
}

export function getChainName(chainId) {
  const nks = networks()
  const chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    logger.error('[Utils - Chain] getChainName. cannot find chain by chainId=', chainId)
    return nks[0].chainName  // return the name of first chain in nks by default
  }
  return nks.find( n => n.chainId === chainId)?.chainName
}

export function getChain(chainId) {
  const nks = networks()
  const chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    logger.error('[Utils - Chain] getChain. cannot find chain by chainId=', chainId)
    return nks[0]  // return the first chain in nks by default
  }
  return chain
}

export function getChainCurrency(chainId) {
  const nks = networks()
  const chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    logger.error('[Utils - Chain] getChainName. cannot find chain by chainId=', chainId)
    return nks[0].currency  // return the currency of first chain in nks by default
  }
  return nks.find( n => n.chainId === chainId)?.currency
}

export function getABI(chainId, address) {
  const nks = networks()
  var chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    throw new Error(messageHelper.getMessage('chain_not_found', chainId))
  } else {
    var contract = chain.contracts.find((contract) => contract.address === address)
    if (!contract) {
      throw new Error(messageHelper.getMessage('contract_not_found', chainId, address))
    }
    const abi = contract?.abi
    if (!abi) {
      throw new Error(messageHelper.getMessage('abi_not_found', chainId, address))
    }
    return abi
  }
}

export function getERC20Contract(chainId) {
  const nks = networks()
  var chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    throw new Error(messageHelper.getMessage('chain_not_found', chainId))
  } else {
    const contract = chain.contracts.find((contract) => contract.tokenStandard === 'ERC20')
    if (!contract) {
      throw new Error(messageHelper.getMessage('contract_erc20_not_found', chainId))
    }
    if (!contract?.address || !contract?.abi) {
      throw new Error(messageHelper.getMessage('contract_erc20_invalid_config', chainId))
    }
    return contract
  }
}