import {useEffect, useState} from "react";
import {useMainContext} from "../hooks/useMainContext.tsx";
import ProductService from "../services/product.service.ts";
import ListProductsHome from "@/components/product/ListProductsHome.tsx";
import DisplayPage from "../components/loading/DisplayPage.tsx";
import {useSearchParams} from "react-router-dom";

const Root = () => {
    const [searchParams] = useSearchParams();
    const activePage = Number(searchParams.get('page')) || 1;
    const itemsPerPage = 6;
    const {productList, setProductList} = useMainContext()
    const [totalProducts, setTotalProducts] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const skip = (activePage - 1) * itemsPerPage;

                const res = await ProductService.getProductsByAny({
                    limit: itemsPerPage,
                    skip
                })
                setProductList(res.products)
                setTotalProducts(res.total)
            } catch (e) {
                setProductList([])
            } finally {
                setIsLoading(false)
            }
        })()
    }, [activePage]);


    return (
        <div className="pb-4 px-2">
            <h1 className="text-3xl mb-10">
                <b
                    //     onClick={async () => {
                    //     const res = await Parse.Cloud.run("createRole")
                    //     console.log(res)
                    // }}
                >Products</b>
            </h1>
            <DisplayPage isLoading={isLoading}>
                <ListProductsHome productsList={productList}
                                  paginationData={{
                                      itemsPerPage,
                                      totalProducts,
                                  }}
                />
            </DisplayPage>

        </div>
    );
};

export default Root;
