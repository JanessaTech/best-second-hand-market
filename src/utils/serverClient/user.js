import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'
import messageHelper from '../../common/helpers/internationalization/messageHelper'

export const findUserByAddress = async (address) => {
    logger.debug('[serverClient.user] findUserByAddress. address = ', address)
    try {
        const response = await axios.get(`${config.BACKEND_ADDR}/apis/v1/users/${address}`)
        logger.debug('response =', response)
        return response?.data?.data?.user
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.user] findUserByAddress.', messageHelper.getMessage('user_failed_findby_address', address, reason))
        logger.error(err)
        throw err
    }
}

export const register = async (formData) => {
    logger.debug('[serverClient.user] register')
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/users/register`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}})
        return response?.data?.data?.user
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.user] findUserByAddress.', messageHelper.getMessage('user_failed_register', formData.get('name'), reason))
        logger.error(err)
        throw err
    }
}

export const loginByAddress = async (address) => {
    logger.debug('[serverClient.user] loginByAddress. address =', address)
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/users/login`,{
            address: address
        })
        logger.debug('response =', response)
        return response?.data?.data?.user
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.user] findUserByAddress.', messageHelper.getMessage('user_failed_login', address, reason))
        logger.error(err)
        throw err
    }
}

export const logoutByAddress = async (address) => {
    logger.debug('[serverClient.user] logoutByAddress. address =', address)
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/users/login`,{
            address: address
        })
        logger.debug('response =', response)
        return response?.data?.data?.user
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.user] logoutByAddress', messageHelper.getMessage('user_failed_logout', address, reason))
        logger.error(err)
        throw err
    }
}