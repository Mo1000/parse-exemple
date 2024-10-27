import {CreateProductModel, ProductModel} from "../models/product.model.ts";
import Parse from "@/utils/parse/index.ts";
import {AccountRoleEnum} from "@/enums/account-role.enum.ts";

type ProductType = Parse.Attributes & Partial<ProductModel>;

class ProductService extends Parse.Object<ProductType> {
    static parseClassName = 'Product';
    // title: string = ''
    // finalPrice: number = 0
    // previousPrice?: number
    // image: string = ''
    // reductionPercent?: number
    // stars?: {
    //     number: number
    //     total: number
    // } = {number: 0, total: 0}
    // colorList?: string[]
    // sizeList?: string[]


    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(ProductService.parseClassName, {});

    }

    static async createProduct(
        product: ProductModel
    ) {
        const user = Parse.User.current();
        const isSeller = user?.get('roles')?.includes(AccountRoleEnum.SELLER);
        if (isSeller) {
            const prod = new ProductService();
            Object.entries(product).forEach(([key, value]) => {
                prod.set(key, value);
            })
            const roleACL = new Parse.ACL(user);
            roleACL.setPublicReadAccess(true);
            prod.setACL(roleACL);
            prod.set("user", user);
            return await prod.save()
        } else {
            throw new Error('You are not allowed to create a product');
        }
    }


    static async getProducts() {
        const query = new Parse.Query(ProductService);
        return await query.find({json: true}) as unknown as ProductModel[];
    }

    static async getProductById(objectId: string) {
        const query = new Parse.Query(ProductService);
        return await query.get(objectId)
    }

    static createManyProducts(products: CreateProductModel[]) {
        const parseProduct = products.map(product => {
            const prod = new ProductService();
            Object.entries(product).forEach(([key, value]) => {
                prod.set(key, value);
            })
            return prod;
        })
        return Parse.Object.saveAll(parseProduct);
    }

    static async getProductsByUser(
        idUser: string,
        pagination?: {
            limit?: number, skip?: number
        },) {
        const query = new Parse.Query(ProductService);
        if (pagination) {
            if (pagination.limit) query.limit(pagination.limit);
            if (pagination.skip) query.skip(pagination.skip);
        }
        // query.matches("user", new RegExp(user?.id || ""))
        query.matchesQuery("user", new Parse.Query(Parse.User).equalTo("objectId", idUser))
        const prodFound = await query.find()
        return {
            products: prodFound,
            total: await query.count()
        };
    }

    static async getProductsByAny(pagination?: {
        limit?: number, skip?: number
    }, filters?: {
        sections: string[];
        title?: string;
        colorList?: string[];
        sizeList?: string[];
    }) {
        const query = new Parse.Query(ProductService);
        if (filters) {
            if (filters.sections) query.containedIn('sections', filters.sections);
            if (filters.title) query.matches('title', new RegExp(filters.title), 'i')
            if (filters.colorList) query.containedIn('colorList', filters.colorList as any);
            if (filters.sizeList) query.containedIn('sizeList', filters.sizeList as any);
        }
        if (pagination) {
            if (pagination.limit) query.limit(pagination.limit);
            if (pagination.skip) query.skip(pagination.skip);
        }
        const prodFound = await query.find()
        return {
            products: prodFound,
            total: await query.count()
        };
    }

    static async deleteProduct(objectId: string) {
        return Parse.Cloud.run('deleteProduct', {objectId});
    }

    static async updateProduct(objectId: string, product: ProductModel) {
        return Parse.Cloud.run('updateProduct', {objectId, product});
    }

    static get() {
        return new Parse.Query(ProductService);
    }


}

export default ProductService;
