import React from 'react';
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/outline';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import clsx from "clsx";


interface Props {
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    getPageButtons: () => React.ReactNode[];
}

const PaginationControls = (props: Props) => {
    const {isPrevDisabled, isNextDisabled, getPageButtons} = props;

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const page = searchParams.get('page') ?? '1';
    const prev = () => {

        navigate(`${pathname}?page=${Number(page) - 1}`);
    };
    const next = () => {
        navigate(`${pathname}?page=${Number(page) + 1}`);
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-10 mt-8">
            <button
                className={clsx(
                    "flex items-center gap-2 py-2 px-2 hover:bg-gray-200   bg-transparent disabled:bg-transparent",
                    "  rounded-md disabled:cursor-not-allowed disabled:text-black/30 disabled:hover:text-black/40 ",
                )}
                onClick={prev}
                disabled={isPrevDisabled}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 "/>
                Previous
            </button>

            <div className="flex items-center gap-2  ">{getPageButtons()}</div>

            <button
                className={clsx(
                    "flex items-center gap-2  py-2 px-2   bg-transparent disabled:bg-transparent hover:bg-gray-200",
                    "dark:hover:text-gray-800 rounded-md disabled:cursor-not-allowed disabled:text-black/30 disabled:hover:text-black/40 ",
                )}
                onClick={next}
                disabled={isNextDisabled}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
            </button>
        </div>
    );
};

export default PaginationControls;
