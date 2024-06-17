const url = 'http://localhost:3000'

export const request = (query) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
}