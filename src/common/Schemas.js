import * as yup from "yup";

export const PriceFilterSchema = yup.object().shape({
    min: yup.number().required('ERROR: The number is required!').min(0),
    max: yup.number().moreThan(yup.ref('min'), "Max should be > Min")
})
export const SignupSchema = yup.object().shape({
    name: yup.string().length(20).required(''),
    introduction: yup.string().length(200).required('')
})