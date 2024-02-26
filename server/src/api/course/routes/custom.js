"use strict";

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/course/:id/enroll",
      handler: "course.enroll",
    },
  ],
};
