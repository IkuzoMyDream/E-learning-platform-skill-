const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  loginEndpoint: "/auth/local",
  jwtSessionStorageKey: "auth.jwt",

  // user
  getUserInfomation:
    "/users/me?populate[courses][populate][0]=picture&populate[learning_progresses][populate]=*&populate=avatar&populate[payments][populate][course][populate]=picture",
  getUserRole: "/users/me?populate=role",
  jwtUserEndpoint: "/users/me?populate=*",
  getUserCourseEnrollments: "/users/me?populate[courses][populate]=*",
  getUserCartsFilteredByCourseName:
    "/users/me?populate[carts][populate][course][filters][name][$eq]=",
  getUserCartBookingList:
    "/users/me?populate[carts][populate][course][populate]=*",

  // get
  getCategoriesEndpoint: "/categories?populate=*",
  getCoursesEndpoint:
    "/categories?populate[courses][populate]=*&filters[name][$eq]=",
  getCourseDetailEndpoint: "/courses?populate=*&filters[name][$eq]=",
  getAllCourse: "/courses?populate=*",
  getCarts: "/carts?populate=*",
  getCartsFilteredByCourseName:
    "/carts?populate[owner][populate]=*&populate[course][filters][name][$eq]=",
  getMaterial: "/materials?populate=*",
  getMaterialFilteredByCourseName:
    "/courses?populate[course_chapters][populate][course_materials][populate]=*&filters[name][$eq]=",
  getSearchcourse: "/courses?populate=*&filters[name][$eq]=",

  // post
  postCart: "/carts",
  postEnrollWithUserId: "/courses/",

  // delete
  deleteCartById: "/carts/",
};

export default conf;
