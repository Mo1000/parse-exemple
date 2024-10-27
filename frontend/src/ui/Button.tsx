import {ComponentProps, FC, PropsWithChildren} from "react";
import {BounceLoader} from "react-spinners";
import clsx from "clsx";

type ButtonProps = {
    isLoading?: boolean;
} & ComponentProps<'button'> & PropsWithChildren
const Button: FC<ButtonProps> = (props) => {
    const {children, isLoading, className, ...rest} = props
    return (
        <button {...rest}
                disabled={isLoading}
                className={clsx("flex justify-center items-center w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white focus-visible:outline-offset-2",
                    " shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2  focus-visible:outline-blue-600",
                    isLoading ? 'cursor-not-allowed bg-blue-600/60 ' : 'cursor-pointer',
                    className)}
        >
            {isLoading ? <BounceLoader size={22} color="#fff"/> : children}
        </button>
    );
};

export default Button;
