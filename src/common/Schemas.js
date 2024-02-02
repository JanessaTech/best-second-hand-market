import * as yup from "yup";

export const PriceFilterSchema = yup.object().shape({
    min: yup.number().typeError('ERROR: A positve number is required for Min field!').required().min(0),
    max: yup.number().typeError('ERROR: A positve number is required for Max field!').moreThan(yup.ref('min'), "Max should be > Min")
})
export const SignupSchema = yup.object().shape({
    name: yup.string().required('Display name is required').max(20, 'Display name is less than 20 characters'),
    checked: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    introduction: yup.string().max(200).optional()
})

export const SettingSchema = yup.object().shape({
    name: yup.string().required('Display name is required').max(20, 'name is less than 20 characters')
})

export const DepoistSchema = yup.object().shape({
    deposit: yup.number().typeError('A number is required for deposit field').required().moreThan(0, 'deposit should be greater than 0')
})

export const MintSchema = yup.object().shape({
    title: yup.string().required('Title is required').max(20, 'Title is less than 20 characters'),
    category: yup.string().required('Category is required'),
    chain: yup.string().required('Chain is required'),
    address: yup.string().required('Contract address is required'),
    description: yup.string().required('NFT description is required').max(200, 'NFT description is less than 200 characters')
})