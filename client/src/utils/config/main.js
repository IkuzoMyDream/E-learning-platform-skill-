const conf = {
    apiUrlPrefix: 'http://localhost:1337/api',
    loginEndpoint: '/auth/local',
    getUserInfomation: '/users/me?populate=role',
    jwtUserEndpoint: '/users/me?populate=*',
    jwtSessionStorageKey: 'auth.jwt',
    getCategoriesEndpoint: '/categories',
    getCoursesEndpoint: '/categories?populate[courses][populate]=*&filters[name][$eq]='
  }
  
  export default conf;     