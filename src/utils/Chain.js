import config from '../config/index'
import logger from '../common/Logger'

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

export function getDefaultChain() {
  const nks = networks()
  logger.debug('[Utils - Chain] getDefaultChain. nks=', nks)
  var env = getEnv()
  if (!nks || nks.length === 0) {
    logger.error('[Utils - Chain] you should set at least one chain in chains in global.js under ', env)
    return 1
  } else {
    logger.debug('[Utils - Chain] default chain =', nks[0].chainId)
    return nks[0].chainId
  }
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

export function getChainCurrency(chainId) {
  const nks = networks()
  const chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    logger.error('[Utils - Chain] getChainName. cannot find chain by chainId=', chainId)
    return nks[0].currency  // return the currency of first chain in nks by default
  }
  return nks.find( n => n.chainId === chainId)?.currency
}

export function getStandard(chainId, address) {
  const nks = networks()
  var chain = nks.find( n => n.chainId === chainId)
  if (!chain) {
    logger.error('[Utils - Chain] getStandard. cannot find chain by chainId=', chainId)
    chain = nks[0]
    var contract = chain.contracts.find(addr => addr === address)
    if (!contract) {
      logger.error('[Utils - Chain] getStandard. cannot find standard by chainId=', chainId , ' and address=', address)
      return chain.contracts[0].tokenStandard
    } else {
      return contract.tokenStandard
    }
  } else {
    var contract = chain.contracts.find(addr => addr === address)
    if (!contract) {
      logger.error('[Utils - Chain] getStandard. cannot find standard by chainId=', chainId , ' and address=', address)
      return chain.contracts[0].tokenStandard
    } else {
      return contract.tokenStandard
    }
  }
}