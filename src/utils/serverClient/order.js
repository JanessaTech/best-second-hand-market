import {getQuery} from '../HttpUtils'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

export const queryOrdersByUserId = async  (userId, page, limit, sortBy, chainId, category, prices) => {
    logger.debug('[serverClient.order] queryNFTsForUser. userId =', userId, ' page = ', page, ' limit =', limit, ' sortBy = ', sortBy, ' chainId =', chainId, ' category =', category, ' prices =', prices)
    const pageQuery = getQuery({page: page, limit: limit, sortBy: sortBy, chainId: chainId, category: category, prices: prices})
    try {
        let url = `${config.BACKEND_ADDR}/apis/v1/orders/${userId}`
        if (pageQuery) {
            url = `${url}?${pageQuery}`
        }
        logger.debug('[serverClient.order] queryOrdersByUserId. url =', url)
        const response = await axios.get(url)
        logger.debug('response =', response)
        return response?.data?.data
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.order] queryOrdersByUserId.', messageHelper.getMessage('order_failed_queryfor_user', userId, pageQuery, reason))
        logger.error(err)
        throw err
    }
}