import messages from '../internationalization'

const isJson = (obj) => {
    return obj !== undefined && obj !== null && obj.constructor === Object;
}
const isArray = (obj) => {
    return !!obj && obj.constructor === Array;
}

const convert = (obj) => {
    if (isJson(obj)) {
        return  '\n' + JSON.stringify(obj, null, 4) + '\n'
    }
    if (isArray(obj)) {
        return obj.map((o) => convert(o))
    }
    return obj
}

export default {
    getMessage : (key, ...params) => {
        const local = 'en'  // to-do: we should get the value from client's browser
        let message = messages[local][key]
        const _params = params.map( (e) => convert(e))
        for(let i = 0; i < _params.length; i++) {
            const ph = `{${i}}`
            message = message.replaceAll(ph, _params[i])
        }
        return message
    }
}