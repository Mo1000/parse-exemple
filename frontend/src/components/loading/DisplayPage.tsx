import {FC, PropsWithChildren} from "react";
import Loader from "./Loader.tsx";

interface Props extends PropsWithChildren {
    isLoading: boolean;
}

const DisplayPage: FC<Props> = (props) => {
    const {isLoading, children} = props;
    return (
        <section>
            {
                isLoading ?
                    <Loader/>
                    : children
            }
        </section>
    );
};

export default DisplayPage;
