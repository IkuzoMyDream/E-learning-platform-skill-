const conf = {
    apiUrlPrefix: 'http://localhost:1337/api',
    loginEndpoint: '/auth/local',
    getUserInfomation: '/users/me?populate=role',
    jwtUserEndpoint: '/users/me?populate=*',
    jwtSessionStorageKey: 'auth.jwt'
  }
  
  export default conf;