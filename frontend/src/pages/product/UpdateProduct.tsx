import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductService from "@/services/product.service.ts";
import AddProduct from "@/components/product/AddProduct.tsx";
import {BounceLoader} from "react-spinners";

const UpdateProduct = () => {
    const {objectId} = useParams<{ objectId: string }>();
    const [product, setProduct] = useState<ProductService | undefined>(undefined)
    useEffect(() => {
        if (objectId) {
            (async () => {
                const res = await ProductService.getProductById(objectId);
                setProduct(res)
            })()
        }
    }, [objectId])
    return (
        <>
            {product ?
                <AddProduct isUpdate product={product}/>
                : <div className="w-full h-[40vh] flex justify-center items-center">
                    <BounceLoader
                        color="#3376e8"
                    />
                </div>
            }

        </>
    );
};

export default UpdateProduct;
