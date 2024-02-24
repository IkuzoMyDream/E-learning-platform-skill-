const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  loginEndpoint: "/auth/local",
  getUserInfomation: "/users/me?populate=*",
  getUserRole: "/users/me?populate=role",
  jwtUserEndpoint: "/users/me?populate=*",
  jwtSessionStorageKey: "auth.jwt",
  getCategoriesEndpoint: "/categories?populate=*",
  getCoursesEndpoint:
    "/categories?populate[courses][populate]=*&filters[name][$eq]=",
  getCourseDetailEndpoint: "/courses?populate=*&filters[name][$eq]=",
  getAllCourse: "/courses?populate=*",
  getUserCourseEnrollments: "/users/me?populate[courses][populate]=*"
};

export default conf;
