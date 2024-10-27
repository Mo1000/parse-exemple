import React, {PropsWithChildren} from "react";
import ProductService from "@/services/product.service.ts";

type MainContextType = {
    productList: ProductService[];
    setProductList: React.Dispatch<React.SetStateAction<ProductService[]>>;
    user: Parse.User | null;
    setUser: React.Dispatch<React.SetStateAction<Parse.User | null>>;

}
const initialMainContext: MainContextType = {
    productList: [],
    setProductList: () => {
    },
    user: null,
    setUser: () => {
    }
}

export const MainContext = React.createContext<MainContextType>(initialMainContext);

const MainContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [productList, setProductList] = React.useState<ProductService[]>([]);
    const [user, setUser] = React.useState<Parse.User | null>(null);
    return (
        <MainContext.Provider value={{productList, setProductList, user, setUser}}>
            {children}
        </MainContext.Provider>
    );
};
export default MainContextProvider;
