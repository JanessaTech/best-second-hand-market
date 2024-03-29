import config from '../../config'
import logger from "../../common/Logger"
import axios from 'axios'
import messageHelper from "../../common/helpers/internationalization/messageHelper"

export const upload = async (formData) => {
    logger.debug('[serverClient.ipfs] update')
    try {
        const response = await axios.post(`${config.BACKEND_ADDR}/apis/v1/ipfs`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}})
        return response?.data?.data?.metadata
    } catch (err) {
        const reason = err?.response?.data?.message || err?.message || err
        logger.error('[serverClient.ipfs] upload.', messageHelper.getMessage('ipfs_failed_upload', reason))
        logger.error(err)
        throw err
    }
}