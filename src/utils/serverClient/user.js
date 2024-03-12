import config from '../../config'
import axios from 'axios'
import logger from '../../common/Logger'

export const findUserByAddress = async (address) => {
    logger.debug('[serverClient.user] findUserByAddress. address = ', address)
    try {
        const response = await axios.get(`${config.BACKEND_ADDR}/apis/v1/users/${address}`)
        logger.debug('response =', response)
        return response?.data?.data?.user
    } catch (err) {
        logger.error('[serverClient.user] findUserByAddress. Failed to find user by', address)
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
        logger.error('Failed to register the user', formData.name)
        logger.error(err)
        throw err
    }
}