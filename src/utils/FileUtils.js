import config from '../config'

export function isFileImage(file) {
    const acceptedImageTypes = config.multer.acceptedImageTypes
    return file && acceptedImageTypes.includes(file['type'])
}