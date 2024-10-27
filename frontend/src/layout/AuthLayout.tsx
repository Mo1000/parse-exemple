import {Outlet, useLocation} from "react-router-dom";


export default function AuthLayout() {

    const location = useLocation()
    const pathname = location.pathname
    const displaySwitchAuth = () => {
        const isRegister = pathname.includes('register')
        if (isRegister)
            return <>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register for an account
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Already a member?{' '}
                    <a href="/auth/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </p>
            </>
        else return < >
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
                Not a member?{' '}
                <a href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Register
                </a>
            </p>
        </>
    }
    return (

        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />

                <div className="mx-auto text-center ">   {displaySwitchAuth()}</div>

            </div>

            <div>
                <Outlet/>
            </div>
        </div>
    )
}
