const conf = {
    apiUrlPrefix: 'http://localhost:1337/api',
    loginEndpoint: '/auth/local',
    getUserInfomation: '/users/me?populate=role',
    jwtUserEndpoint: '/users/me?populate=*',
    jwtSessionStorageKey: 'auth.jwt',
    getCategoriesEndpoint: '/categories',
<<<<<<< HEAD
    getCoursesEndpoint: '/categories?populate[courses][populate]=*&filters[name][$eq]=',
    getCourseDetailEndpoint: '/courses?populate=*&filters[name][$eq]='
=======
    getCoursesEndpoint: '/categories?populate[courses][populate]=*&filters[name][$eq]='
    ///categories?populate=*&filters[name][$eq]=
>>>>>>> 7ace677e604aa667a16491af4b194b83734f53a6
  }
  
  export default conf;     