export function getQuery({page, limit, sortBy}) {
    let queryOptions = {}
    if (page) {
        queryOptions.page = page
    }
    if (limit) {
        queryOptions.limit = limit
    }
    if (sortBy) {
        queryOptions.sortBy = sortBy
    }
    const query = Object.entries(queryOptions).map((q) => {
        const [key, value] = q
        return `${key}=${value}`
    }).join('&')
    return query
}