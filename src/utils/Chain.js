import config from '../config/index'
import logger from '../common/Logger'

export function networks() {
    var env = config?.env
    if (!env || ['local', 'testnet', 'mainnet'].indexOf(env) === -1) {
      logger.error('[NetworkFilter] you do not set env varaible correctly. Use local by default')
      env = 'local'
    }
    const nets = config.chains[env]
    logger.debug('[Utils - Chain] networks=',nets)
    return nets
}

export function getChainName(chainId) {
  const nks = networks()
  const find = nks.find( n => n.chainId === chainId)
  if (!find) {
    logger.error('[Utils - Chain] getChainName. cannot find chain by chainId=', chainId)
    return nks[0].chainName  // return the name of first chain in nks by default
  }
  return nks.find( n => n.chainId === chainId)?.chainName
}