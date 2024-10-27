import './App.css'
import {Route, Routes} from "react-router-dom";
import Root from "./pages/Root.tsx";
import CreateProduct from "./pages/product/CreateProduct.tsx";
import Header from "./pages/Header.tsx";
import Product from "./pages/product/Product.tsx";
import {ToastContainer} from "react-toastify";
import UpdateProduct from "@/pages/product/UpdateProduct.tsx";
import AuthLayout from "@/layout/AuthLayout.tsx";
import Register from "@/pages/auth/Register.tsx";
import SignIn from "@/pages/auth/SignIn.tsx";
import {PropsWithChildren, useEffect} from "react";
import {useMainContext} from "@/hooks/useMainContext.tsx";
import Parse from "@/utils/parse"

function App() {
    return (
        <MainGuard>
            <AppRouting/>
            <ToastContainer/>
        </MainGuard>
    )
}

function AppRouting() {
    const {user} = useMainContext()
    if (user)
        return (
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route path="" element={<Root/>}/>

                    <Route path="/product" element={<Product/>}>
                        <Route path="create" element={<CreateProduct/>}/>
                        <Route path="update/:objectId" element={<UpdateProduct/>}/>
                    </Route>
                </Route>
                <Route path={"*"} element={<Header/>}>
                    <Route path={"*"} element={<Root/>}/>
                </Route>
            </Routes>
        )
    else return (
        <Routes>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route path="register" element={<Register/>}/>
                <Route path="signin" element={<SignIn/>}/>
            </Route>
            <Route path={"*"} element={<AuthLayout/>}>
                <Route path={"*"} element={<SignIn/>}/>
            </Route>
        </Routes>
    )
}

const MainGuard = (props: PropsWithChildren) => {
    const {setUser, user} = useMainContext()
    useEffect(() => {
        (async () => {
            const currentUser = await Parse.User.currentAsync();
            if (currentUser) {
                setUser(currentUser)
            }
        })()
    }, [user]);
    return (
        <div>
            {props.children}
        </div>
    )
}

export default App
