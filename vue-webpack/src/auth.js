const API_URL = 'http://api/'
const LOGIN_URL = API_URL + 'authenticate'
const SIGNUP_URL = API_URL + 'users/'

export default {

  user: {
    authenticated: false,
    info: ''
  },

  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      console.log('login')
      console.log(data)
      localStorage.setItem('id_token', data.access_token.token)
      localStorage.setItem('user', JSON.parse(JOSN.stringify(data.user)))
      console.log(localStorage.getItem('id_token'))

      this.user.authenticated = true
      this.user.info = data.user

      if(redirect) {
        // router.go(redirect)
        console.log(redirect);
      }

    }).error((err) => {
      context.error = err
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if(redirect) {
        // router.go(redirect)
        console.log(redirect);
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
