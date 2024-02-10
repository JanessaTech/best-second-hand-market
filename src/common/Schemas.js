import * as yup from "yup";

export const PriceFilterSchema = yup.object().shape({
    min: yup.number().typeError('ERROR: A positve number is required for Min field!').required().min(0),
    max: yup.number().typeError('ERROR: A positve number is required for Max field!').moreThan(yup.ref('min'), "Max should be > Min")
})
export const SignupSchema = yup.object().shape({
    name: yup.string().required('Display name is required').max(20, 'Display name should be less than 20 characters'),
    checked: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    introduction: yup.string().max(200, 'Introduction should be less than 200 character').optional()
})

export const SettingSchema = yup.object().shape({
    name: yup.string().required('Display name is required').max(20, 'Display name is less than 20 characters'),
    intro: yup.string().max(200, 'Introduction should be less than 200 character').optional()
})

export const DepoistSchema = yup.object().shape({
    deposit: yup.number().typeError('A number is required for deposit field').required().moreThan(0, 'deposit should be greater than 0')
})

export const MintSchema = yup.object().shape({
    title: yup.string().required('Title is required').max(20, 'Title is less than 20 characters'),
    ipfs: yup.string().required('IPFS URL is required').matches(/^ipfs:\/\/(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$/, 'You must provide valid IPFS URL'),
    category: yup.string().required('Category is required'),
    chainId: yup.number().typeError('Chain is required').required(),
    address: yup.string().required('Contract address is required'),
    description: yup.string().required('NFT description is required').max(200, 'NFT description is less than 200 characters')
})