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

export const queryNFTsForUser = async  (userId, page, limit, sortBy) => {
    logger.debug('[serverClient.nft] queryNFTsForUser. userId =', userId, ' page = ', page, ' limit =', limit, ' sortBy = ', sortBy)
    const pagination = {}
    if (page) {
        pagination.page = page
    }
    if (limit) {
        pagination.limit = limit
    }
    if (sortBy) {
        pagination.sortBy = sortBy
    }
    try {
        const pageQuery = getQuery(pagination)
        let url = `${config.BACKEND_ADDR}/apis/v1/nfts/users/${userId}`
        if (pageQuery) {
            url = `${url}?${pageQuery}`
        }
        const response = await axios.get(url)
        logger.debug('response =', response)
        return response?.data?.data?.nfts
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.nft] queryNFTsForUser.', messageHelper.getMessage('nft_failed_queryfor_user', userId, pagination, reason))
        logger.error(err)
        throw err
    }
}

