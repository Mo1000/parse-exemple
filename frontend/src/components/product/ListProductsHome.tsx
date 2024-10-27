import React from "react";
import clsx from 'clsx';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ProductCard from "./ProductCard.tsx";
import PaginationControls from "./PaginationControls.tsx";
import Button from "@/ui/Button.tsx";
import ProductService from "@/services/product.service.ts";

interface Props {
    productsList: ProductService[];
    paginationData: {
        itemsPerPage: number;
        totalProducts: number;
    };
}


const ListProductsHome = (props: Props) => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const {productsList, paginationData} = props;
    const activePage = Number(searchParams.get('page')) || 1;

    const totalPages = Math.ceil(
        paginationData.totalProducts / paginationData.itemsPerPage,
    );

    const getItemProps = (index: React.SetStateAction<number>) =>
        ({
            variant: activePage === index ? 'filled' : 'outline',
            className: clsx(
                activePage === index ? '' : 'text-white bg-gray-400',
                'hover:bg-gray-300 active:bg-black/70 rounded-md',
            ),
            onClick: () => {

                const pathname = location.pathname;
                navigate(`${pathname}?page=${index}`);
            },
        }) as any;

    const getPageButtons = () => {
        const pageButtons: React.ReactNode[] = [];

        // Générer des boutons pour les premières pages
        for (
            let pageIndex = 1;
            pageIndex <= Math.min(totalPages, 10);
            pageIndex++
        ) {
            pageButtons.push(
                <Button key={pageIndex} {...getItemProps(pageIndex)}>
                    {pageIndex}
                </Button>,
            );
        }

        // Ajouter des points d'interrogation et u855n bouton pour les dernières pages
        if (totalPages > 10) {
            pageButtons.push(
                <Button disabled>
                    ...
                </Button>,
            );

            pageButtons.push(
                <Button

                    key={totalPages}
                    {...getItemProps(totalPages)}
                >
                    {totalPages}
                </Button>,
            );
        }

        return pageButtons;
    };

    return (
        <div>
            <div>
                {productsList.length > 0 ? (
                    <div
                        className="gap-y-12 justify-items-center  my-5  w-full  grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 md:gap-x-20 md:gap-y-16    ">
                        {productsList.map((item, index) => (
                            <ProductCard key={index} product={item}/>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <PaginationControls
                isPrevDisabled={activePage === 1}
                isNextDisabled={
                    Math.ceil(
                        paginationData.totalProducts / paginationData.itemsPerPage,
                    ) === activePage
                }
                getPageButtons={getPageButtons}
            />
        </div>
    );
};

export default ListProductsHome;
