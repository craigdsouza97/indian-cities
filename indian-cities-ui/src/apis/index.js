const apiRoot = 'http://localhost:2609/api/v1/indiancities'

export const api = {
    register: {
        url: `${apiRoot}/users`,
        method: 'POST',
    },
    login: {
        url: `${apiRoot}/users/login`,
        method: 'POST',
    },
    cities: {
        url: `${apiRoot}/cities`,
        method: 'GET',
    }
}
    