import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import MainContextProvider from "./contexts/MainContext.tsx";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MainContextProvider>
                <App/>
            </MainContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
