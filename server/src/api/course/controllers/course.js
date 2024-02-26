"use strict";

/**
 * course controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async enroll(ctx) {
    const entityId = ctx.params.id;
    try {
      var course = await strapi.entityService.findOne(
        "api::course.course",
        entityId,
        {
          populate: ["enrollers"],
        }
      );

      const latestUserId = ctx.state.user.id;

      const updatedEnrollers = [...course.enrollers, latestUserId];

      const updatedCourse = await strapi.entityService.update(
        "api::course.course",
        entityId,
        {
          data: {
            enrollers: updatedEnrollers,
          },
        }
      );

      ctx.body = {
        course
      };
    } catch (err) {
      ctx.body = course;
    }
  },
}));
