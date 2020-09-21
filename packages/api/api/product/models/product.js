"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const index = "name";

module.exports = {
  lifecycles: {
    afterCreate(result, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterUpdate(result, params, data) {
      strapi.services.algolia.saveObject(result, index);
    },
    afterDelete(result, params) {
      strapi.services.algolia.deleteObject(result.id, index);
    },
  },
};
