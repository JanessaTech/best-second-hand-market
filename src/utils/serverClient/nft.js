import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

export const mint = async (data) => {
    data.tokenId = 0
    logger.debug('[serverClient.nft] mint. data =', data)
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/nfts/mint`,data)
        logger.debug('response =', response)
        return response?.data?.data?.nft
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.nft] mint.', messageHelper.getMessage('nft_failed_mint', data, reason))
        logger.error(err)
        throw err
    }
}

export const update = async () => {

}

export const findNFTById = async (id, userId) => {
    logger.debug('[serverClient.nft] findNFTById. id =', id, 'userId =', userId)
    try {
        const response = await axios.get(`${config.BACKEND_ADDR}/apis/v1/nfts/${id}${userId ? '?userId='+ userId : ''}`)
        logger.debug('response =', response)
        return response?.data?.data?.nft
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.nft] findNFTById.', messageHelper.getMessage('nft_failed_findby_id', id, reason))
        logger.error(err)
        throw err
    }
}

export const queryNFTs = async () => {

}

export const queryNFTsForUser = async () => {

}

