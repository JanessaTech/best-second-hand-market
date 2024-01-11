export function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1)
}

export function getNowInString() {
    let ts = Date.now()
    let d = new Date(ts)
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s)
    const str =`${pad(d.getFullYear(),4)}-${pad(d.getMonth(),2)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` 
    return str
}