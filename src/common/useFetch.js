import { useEffect, useState } from "react"
import axios from 'axios';

const useFetch = ({url, body, method = 'get'}) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        console.log(`start to fetch data from ${url}`)
        let options = undefined
        if (method === 'get') {
            options = {
                url: url,
                method: method
            }
            axios(options)
                .then((response) => {
                    console.log(response)
                    let nonce = response?.data?.data.nonce
                    console.log('nonce:', nonce)
                    setData(nonce)
                })
                .catch((error) => {
                    console.error("failed to get nonce due to:", error)
                })
        } else if (method === 'post') {
            
        } else {
            // do nothing
        }
        axios(options)
          .then((response) => {
            console.log(response)
            let nonce = response?.data?.data.nonce
            console.log('nonce:', nonce)
          })
          .catch((error) => {
            console.error("failed to get nonce due to:", error)
          })
    }, [url])

    return data
}

export default useFetch