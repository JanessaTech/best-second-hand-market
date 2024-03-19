import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'
import {getQuery} from '../HttpUtils'

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

export const update = async (id, price, status) => {
    logger.debug('[serverClient.nft] update. id =', id, ' price =', price, ' status=', status)
    const update = {id: id}
    if (price) {
        update.price = price
    }
    if (status) {
        update.status = status
    }
    try {
        await axios.post(`${config.BACKEND_ADDR}/apis/v1/nfts/update`, update)
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.nft] update.', messageHelper.getMessage('nft_failed_update', id, reason))
        logger.error(err)
        throw err
    }
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

export const queryNFTs = async (userId, page, limit, sortBy, chainId, category, prices) => {
    logger.debug('[serverClient.nft] queryNFTs. userId =', userId, ' page = ', page, ' limit =', limit, ' sortBy = ', sortBy, ' chainId =', chainId, ' category =', category, ' prices =', prices)
    const pageQuery = getQuery({userId: userId, page: page, limit: limit, sortBy: sortBy, chainId: chainId, category: category, prices: prices})
    try {
        let url = `${config.BACKEND_ADDR}/apis/v1/nfts`
        if (pageQuery) {
            url = `${url}?${pageQuery}`
        }
        logger.debug('[serverClient.nft] queryNFTs. url =', url)
        const response = await axios.get(url)
        logger.debug('response =', response)
        return response?.data?.data
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.nft] queryNFTs.', messageHelper.getMessage('nft_failed_query_all', userId, pageQuery, reason))
        logger.error(err)
        throw err
    }
}

export const queryNFTsForUser = async  (userId, page, limit, sortBy, chainId, status, category, prices) => {
    logger.debug('[serverClient.nft] queryNFTsForUser. userId =', userId, ' page = ', page, ' limit =', limit, ' sortBy = ', sortBy, ' chainId =', chainId, ' status =', status, ' category =', category, ' prices =', prices)
    const pageQuery = getQuery({page: page, limit: limit, sortBy: sortBy, chainId: chainId, status: status, category: category, prices: prices})
    try {
        let url = `${config.BACKEND_ADDR}/apis/v1/nfts/users/${userId}`
        if (pageQuery) {
            url = `${url}?${pageQuery}`
        }
        logger.debug('[serverClient.nft] queryNFTsForUser. url =', url)
        const response = await axios.get(url)
        logger.debug('response =', response)
        return response?.data?.data
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.nft] queryNFTsForUser.', messageHelper.getMessage('nft_failed_queryfor_user', userId, pageQuery, reason))
        logger.error(err)
        throw err
    }
}

