import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

export const mint = async (data) => {
    logger.debug('[serverClient.nft] mint. data =', data)
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/nfts/mint`,data)
        logger.debug('response =', response)
        return response?.data?.data?.nft
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.user] loginByAddress.', messageHelper.getMessage('nft_failed_mint', data, reason))
        logger.error(err)
        throw err
    }
}

export const update = async () => {

}

export const findNFTById = async (id, userId) => {

}

export const queryNFTs = async () => {

}

export const queryNFTsForUser = async () => {

}

