const logger = require("../../../logger");
const ProductService = require("../../../classes/ProductClass");
const {ROLES} = require("../../../constants");

Parse.Cloud.define("updateProduct", async (request) => {
    logger.info("===UpdateProduct start===");
    const {objectId, product} = request.params;

    Object.assign(product,{
        finalPrice:Number(product?.finalPrice),
        previousPrice:Number(product?.previousPrice),
        reductionPercent:Number(product?.reductionPercent)
    })
    return await ProductService.updateProduct(objectId, product);
},{
    requireUser: true,
    requireUserKeys: {
        roles: {
            options: (roles)=> roles.includes(ROLES.SELLER),
            error: "Only seller can perform this action",
        },
    },
    fields: {
        objectId: {
            required: true,
            type: String,
            options: (value) => value.length > 0,
            error: "objectId is required",
        },
        product: {
            required: true,
            type: Object,
        },
    },
  //  requireAnyUserRoles: [ROLES.SELLER],
});
