import * as yup from "yup";

export const PriceFilterSchema = yup.object().shape({
    min: yup.number().required('ERROR: The number is required!').min(0),
    max: yup.number().moreThan(yup.ref('min'), "Max should be > Min")
})
export const SignupSchema = yup.object().shape({
    name: yup.string().required('name is required').max(20, 'name is less than 20 characters'),
    checked: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    introduction: yup.string().max(200).optional()
})