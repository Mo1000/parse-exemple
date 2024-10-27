import React, {FC, useState} from 'react';
import Button from "@/ui/Button.tsx";
import {ProductModel} from "@/models/product.model.ts";
import {useMainContext} from "@/hooks/useMainContext.tsx";
import {useNavigate} from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import ProductService from "@/services/product.service.ts";
import {notify} from "@/utils/toast.ts";


interface PropsWithUpdate {
    isUpdate: true;
    product: ProductService;
}

interface PropsWithoutUpdate {
    isUpdate?: false;
}

type Props = PropsWithUpdate | PropsWithoutUpdate;

const AddProduct: FC<Props> = (props) => {
    const {isUpdate} = props;
    const product = (props as PropsWithUpdate)?.product;
    const productItem = product ? {
        ...product.attributes,
        objectId: product?.id
    } : undefined
    const [sizeList, setSizeList] = useState<string[]>(productItem?.sizeList ?? []);
    const [colorList, setColorList] = useState<string[]>(productItem?.colorList ?? []);
    const [isLoading, setIsLoading] = useState(false)
    const {setProductList} = useMainContext()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const form = e.currentTarget
            const formData = new FormData(form)
            const data = Object.fromEntries(formData)

            Object.assign(data, {
                finalPrice: Number(data?.finalPrice),
                previousPrice: Number(data?.previousPrice),
                reductionPercent: Number(data?.reductionPercent),
                colorList,
                sizeList
            })


            let res;
            if (isUpdate && productItem?.objectId) {
                res = await ProductService.updateProduct(productItem?.objectId, data as ProductModel)
            } else {
                res = await ProductService.createProduct(data as ProductModel)
            }

            const message = isUpdate ? 'Product updated successfully' : 'Product created successfully'
            notify(message, {
                type: 'success'
            })
            setProductList((prev) => [...prev, res])
            navigate('/')
        } catch (e: any) {
            console.error(e)
            notify(e.message, {
                type: "error"
            })
        } finally {
            setIsLoading(false)

        }
    }


    return (
        <>
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 ">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {isUpdate ? 'Update Product' : 'Add Product'}
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        {isUpdate ? 'Update your productItem' : 'Add a new productItem'}
                    </p>
                </div>
                <form method="POST" onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    defaultValue={productItem?.title}
                                    aria-required="true"
                                    autoComplete="given-title"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="previousPrice"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Previous Price
                            </label>
                            <div className="mt-2.5">
                                <input
                                    min={1}
                                    defaultValue={productItem?.previousPrice || 10}
                                    type="number"
                                    name="previousPrice"
                                    required
                                    id="previousPrice"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="finalPrice" className="block text-sm font-semibold leading-6 text-gray-900">
                                Final Price
                            </label>
                            <div className="mt-2.5">
                                <input
                                    min={1}
                                    type="number"
                                    defaultValue={productItem?.finalPrice || 5}
                                    name="finalPrice"
                                    id="finalPrice"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-semibold leading-6 text-gray-900">
                                image
                            </label>
                            <div className="mt-2.5">
                                <input
                                    required
                                    type="url"
                                    defaultValue={productItem?.image}
                                    name="image"
                                    id="image"
                                    autoComplete={"url"}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="reductionPercent"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Reduction Percent
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="number"
                                    defaultValue={productItem?.reductionPercent || 20}
                                    name="reductionPercent"
                                    id="reductionPercent"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="colorList"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Color List
                            </label>
                            <div className="mt-2.5">
                                <CreatableSelect
                                    isMulti
                                    name="colorList"
                                    id="colorList"
                                    options={colorList.map((size) => ({value: size, label: size}))}
                                    onCreateOption={(inputValue) => {
                                        setColorList((prev) => [...prev, inputValue])
                                    }}
                                    onChange={(e) => {
                                        setColorList(e.map((item) => item.value))
                                    }}
                                    value={colorList.map((size) => ({value: size, label: size}))}
                                    required
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            padding: '2px 14px',
                                            borderColor: "rgb(209 213 219)",
                                            borderRadius: 6,
                                        }),
                                    }}/>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="sizeList"
                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                Size List
                            </label>
                            <div className="mt-2.5">
                                <CreatableSelect
                                    isMulti
                                    name="sizeList"
                                    options={sizeList.map((size) => ({value: size, label: size}))}
                                    onCreateOption={(inputValue) => {
                                        setSizeList((prev) => [...prev, inputValue])
                                    }}
                                    value={sizeList.map((size) => ({value: size, label: size}))}
                                    onChange={(e) => {
                                        setSizeList(e.map((item) => item.value))
                                    }}
                                    required
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            padding: '2px 14px',
                                            borderColor: "rgb(209 213 219)",
                                            borderRadius: 6,
                                        }),
                                    }}
                                    id="sizeList"
                                />

                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button
                            type="submit"
                            isLoading={isLoading}
                        >
                            {isUpdate ? "Update Product" : "Create Product"}
                        </Button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default AddProduct;
