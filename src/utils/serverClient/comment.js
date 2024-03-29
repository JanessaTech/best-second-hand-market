import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'
import {getQuery} from '../HttpUtils'

export const create = async (comment) => {
    logger.debug('[serverClient.comment] create')
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/comments`,comment)
        logger.debug('response =', response)
        return response?.data?.data?.comment
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.comment] create.', messageHelper.getMessage('comment_failed_create', comment, reason))
        logger.error(err)
        throw err
    }
}

export const queryCommentsByNftId = async (nftId, page, limit, sortBy) => {
    logger.debug('[serverClient.comment] queryCommentsByNftId. nftId =', nftId, ' page = ', page, ' limit =', limit, ' sortBy = ', sortBy)
    try {
        const query = getQuery({page: page, limit: limit, sortBy: sortBy})
        let url = `${config.BACKEND_ADDR}/apis/v1/comments/${nftId}`
        if (query) {
            url = `${url}?${query}`
        }
        const response = await axios.get(url)
        logger.debug('response =', response)
        return response?.data?.data
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.comment] queryCommentsByNftId.', messageHelper.getMessage('comment_failed_query', nftId, page, limit, sortBy, reason))
        logger.error(err)
        throw err
    }
}