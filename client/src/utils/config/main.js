const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  loginEndpoint: "/auth/local",
  jwtSessionStorageKey: "auth.jwt",

  // user
  getUserInfomation: "/users/me?populate=*",
  getUserRole: "/users/me?populate=role",
  jwtUserEndpoint: "/users/me?populate=*",
  getUserCourseEnrollments: "/users/me?populate[courses][populate]=*",
  getUserCartBookingList: "/users/me?populate[courses][populate]=*",
  

  getCategoriesEndpoint: "/categories?populate=*",
  getCoursesEndpoint:
    "/categories?populate[courses][populate]=*&filters[name][$eq]=",
  getCourseDetailEndpoint: "/courses?populate=*&filters[name][$eq]=",
  getAllCourse: "/courses?populate=*",
  getMaterial: "/materials?populate=*",

};

export default conf;
