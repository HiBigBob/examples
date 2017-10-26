import Vue from 'vue';

const LOGIN_URL = '/authenticate'
const SIGNUP_URL = '/users/'

export default {
  user: {
    authenticated: false,
    info: ''
  },

  login(context, creds, redirect) {
    return Vue.http.post(LOGIN_URL, creds).then((response) => {
      localStorage.setItem('id_token', response.data.access_token.token)
      localStorage.setItem('user', JSON.parse(JSON.stringify(response.data.user)))

      this.user.authenticated = true
      this.user.info = response.data.user

      return this.user
    }).catch((err, req) => {
      if (err.response.status == 401) return {'error': {'msg': err.response.statusText}};
    });
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    this.user.authenticated = jwt ? true : false
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
