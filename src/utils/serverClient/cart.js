import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

export const add = async (userId, nftId) => {
    logger.debug('[serverClient.cart] add. userId =', userId, ' nftId =', nftId)
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/cart`,{userId: userId, nftId: nftId})
        logger.debug('response =', response)
        return response?.data?.data?.cart
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.cart] add.', messageHelper.getMessage('cart_failed_add', nftId, userId, reason))
        logger.error(err)
        throw err
    }
}

export const remove = async (userId, nftId) => {
    logger.debug('[serverClient.cart] remove. userId =', userId, ' nftId =', nftId)
    try {
        await axios.delete(`${config.BACKEND_ADDR}/apis/v1/cart?userId=${userId}&nftId=${nftId}`)
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.cart] remove.', messageHelper.getMessage('cart_failed_remove', userId, nftId, reason))
        logger.error(err)
        throw err
    }
}

export const isInCart = async (userId, nftId) => {
    logger.debug('[serverClient.cart] isInCart. userId =', userId, ' nftId =', nftId)
    try {
        const response = await axios.get(`${config.BACKEND_ADDR}/apis/v1/cart/isInCart?userId=${userId}&nftId=${nftId}`)
        logger.debug('response =', response)
        return response?.data?.data?.inCart
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.cart] isInCart.', messageHelper.getMessage('cart_failed_isInCart', nftId, userId, reason))
        logger.error(err)
        throw err
    }
}

export const queryByUser = async (userId) => {
    logger.debug('[serverClient.cart] queryByUser. userId =', userId)
    try {
        const response = await axios.get(`${config.BACKEND_ADDR}/apis/v1/cart/${userId}`)
        logger.debug('response =', response)
        return response?.data?.data?.nfts
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.cart] queryByUser.', messageHelper.getMessage('cart_failed_queryby_user', userId, reason))
        logger.error(err)
        throw err
    }
}