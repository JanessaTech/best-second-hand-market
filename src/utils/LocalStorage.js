

export function getFilter() {
    let filter = localStorage.getItem('filter')
    if (filter) {
      return JSON.parse(filter)
    }
    return {}
  }