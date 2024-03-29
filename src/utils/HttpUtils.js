export function getQuery({userId, page, limit, sortBy, chainId, status, category, prices, title}) {
    let queryOptions = {}
    if (userId) {
        queryOptions.userId = userId
    }
    if (page) {
        queryOptions.page = page
    }
    if (limit) {
        queryOptions.limit = limit
    }
    if (sortBy) {
        queryOptions.sortBy = sortBy
    }
    if (chainId) {
        queryOptions.chainId = chainId
    }
    if (status) {
        queryOptions.status = status
    }
    if (category && category.length > 0) {
        queryOptions.category = category
    }
    if (prices) {
        queryOptions.prices = prices
    }
    if (title) {
        queryOptions.title = title
    }
    return Object.entries(queryOptions).map((q) => {
        const [key, value] = q
        if ( key === 'category') {
            const cats = []
            for (const cat of value) {
                cats.push(`category[]=${cat}`)
            }
            return cats.join('&')
        } else if (key === 'prices') {
            return `prices=min:${value.min}|max:${value.max}`
        } else {
            return `${key}=${value}`
        } 
    }).join('&')
}