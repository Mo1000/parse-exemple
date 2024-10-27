const logger = require("../../../logger");
const ProductService = require("../../../classes/ProductClass");

Parse.Cloud.define(
  "deleteProduct",
  async (request) => {
    logger.info("===deleteProduct start===");

    const { objectId } = request.params;
    return await ProductService.deleteProduct(objectId);
  },
  {}
);
