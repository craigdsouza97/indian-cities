import { api } from "../apis";

class AuthService {

    token = null;

    async loginUser(credentials) {
        let result = await fetch(api.login.url, {
          method: api.login.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        result = await result.json();

        if(result?.token) {
            localStorage.setItem('REACT_USER_DATA', JSON.stringify(result));
            return true;
        }
        
        return result.error;
    }

    async registerUser(credentials) {
        let result = await fetch(api.register.url, {
          method: api.register.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        result = await result.json();

        if(result?.token) {
            localStorage.setItem('REACT_USER_DATA', JSON.stringify(result));
            return true;
        }
        
        return result.error;
    }

    getToken() {
       if(this.token?.token) return this.token;
              
       this.token = localStorage.getItem('REACT_USER_DATA');

       if(this.token) return JSON.parse(this.token);
    }

    deleteToken() {
        this.token = null;
               
        localStorage.removeItem('REACT_USER_DATA');
     }

    async fetchCities(page) {
        let token = await this.getToken()

        let result = await fetch(api.cities.url + (page ? `?page=${page}` : ''), {
          method: api.cities.method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token?.token
          }
        });

        if(result.status === 401) {
          return {
            error: 'Token has expired'
          }
        }

        result = await result.json();

        return result;
      }
      
}

export default new AuthService();