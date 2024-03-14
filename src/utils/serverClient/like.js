import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

export const like = async (userId, nftId) => {
    logger.debug('[serverClient.like] like. userId =', userId, ' nftId =', nftId)
    try {
        const data = {userId: userId, nftId: nftId}
        await axios.post(`${config.BACKEND_ADDR}/apis/v1/likes`,data)
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.like] like.', messageHelper.getMessage('nft_failed_like', nftId, userId, reason))
        logger.error(err)
        throw err
    }
}

export const unlike = async (userId, nftId) => {
    logger.debug('[serverClient.like] unlike. userId =', userId, ' nftId =', nftId)
    try {
        const data = {userId: userId, nftId: nftId}
        await axios.post(`${config.BACKEND_ADDR}/apis/v1/likes/unlike`,data)
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.like] unlike.', messageHelper.getMessage('nft_failed_unlike', nftId, userId, reason))
        logger.error(err)
        throw err
    }
}
