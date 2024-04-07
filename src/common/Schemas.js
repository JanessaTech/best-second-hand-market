import * as yup from "yup"

export const PriceFilterSchema = yup.object().shape({
    min: yup.number().typeError('ERROR: A positve number is required for Min field!').required().min(0),
    max: yup.number().typeError('ERROR: A positve number is required for Max field!').moreThan(yup.ref('min'), "Max should be > Min")
})
export const SignupSchema = yup.object().shape({
    name : yup.string().min(5, 'Display name must have at least 5 characters').max(20, 'Display name must have at most 20 characters').required('Display name is required'),
    checked: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    intro: yup.string().max(200, 'Introduction should be less than 200 characters').optional()
})

export const SettingSchema = yup.object().shape({
    name : yup.string().min(5, 'Display name must have at least 5 characters').max(20, 'Display name must have at most 20 characters').required('Display name is required'),
    intro: yup.string().max(200, 'Introduction should be less than 200 characters').optional()
})

export const DepoistSchema = yup.object().shape({
    chainId: yup.number().typeError('Chain is required').required(),
    balanceInChain: yup.number().required().min(0, 'Failed to get balance from wallet'),
    deposit: yup.number().typeError('A number is required for deposit field').required().moreThan(0, 'Deposit should be greater than 0')
})

export const MintSchema = yup.object().shape({
    title: yup.string().min(5, 'Title must have at least 5 characters').max(20, 'Title should not be more than 20 characters').required('Title is required'),
    ipfs: yup.string().required('IPFS URL is required').matches(/^ipfs:\/\/(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$/, 'You must provide valid IPFS URL'),
    category: yup.string().required('Category is required'),
    chainId: yup.number().typeError('Chain is required').required(),
    address: yup.string().required('Contract address is required').matches(/^0x[a-fA-F0-9]{40}$/, 'You must provide valid Contract address'),
    description: yup.string().required('NFT description is required').max(200, 'NFT description is less than 200 characters')
})

export const MintUploadSchema = yup.object().shape({
    title: yup.string().min(5, 'Title must have at least 5 characters').max(20, 'Title should not be more than 20 characters').required('Title is required'),
    category: yup.string().required('Category is required'),
    description: yup.string().required('NFT description is required').max(200, 'NFT description is less than 200 characters')
})

export const MintCreateNFTSchema = yup.object().shape({
    //ipfs: yup.string().required('IPFS URL is required').matches(/^ipfs:\/\/(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$/, 'You must provide valid IPFS URL'),
    chainId: yup.number().typeError('Chain is required').required(),
    address: yup.string().required('Contract address is required').matches(/^0x[a-fA-F0-9]{40}$/, 'You must provide valid Contract address'),
})