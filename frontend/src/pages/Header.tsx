import {Fragment, useState} from 'react'
import {Dialog, Disclosure, Popover, Transition} from '@headlessui/react'
import {Bars3Icon, PlusCircleIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon, PhoneIcon, PlayCircleIcon} from '@heroicons/react/20/solid'
import clsx from "clsx";
import {Link, Outlet} from "react-router-dom";
import {useMainContext} from "@/hooks/useMainContext.tsx";
import UserService from "@/services/user.service.ts";

const products = [
    {
        name: 'Create Product',
        description: 'Create a new product in your catalog.',
        href: 'product/create',
        icon: PlusCircleIcon
    },
]
const callsToAction = [
    {name: 'Watch demo', href: '#', icon: PlayCircleIcon},
    {name: 'Contact sales', href: '#', icon: PhoneIcon},
]


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {user, setUser} = useMainContext()
    const logOut = async () => {
        await UserService.logOut()
        setUser(null)
    }
    return (
        <main>
            <header className="bg-white sticky inset-0 z-50">
                <nav className="mx-auto flex  items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            {user ? <div
                                className="rounded-full w-8 h-8 bg-blue-700 flex justify-center items-center text-white">
                                {(user?.get('username')?.[0] as string)?.toUpperCase()}
                            </div> : <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""/>
                            }
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <Popover.Button
                                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                Product
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        {products.map((item) => (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                            >
                                                <div
                                                    className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon
                                                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                        aria-hidden="true"/>
                                                </div>
                                                <div className="flex-auto">
                                                    <Link to={item.href} className="block font-semibold text-gray-900">
                                                        {item.name}
                                                        <span className="absolute inset-0"/>
                                                    </Link>
                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                        {callsToAction.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                            >
                                                <item.icon className="h-5 w-5 flex-none text-gray-400"
                                                           aria-hidden="true"/>
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>

                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Features
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Marketplace
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Company
                        </a>
                    </Popover.Group>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                        {!user ? <a href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">
                                Sign in <span aria-hidden="true">&rarr;</span>
                            </a> :
                            <div className="text-sm font-semibold leading-6 text-gray-900"
                                 onClick={logOut}
                            >
                                Log Out <span aria-hidden="true">&rarr;</span>
                            </div>}
                    </div>
                </nav>
                <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10"/>
                    <Dialog.Panel
                        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Disclosure as="div" className="-mx-3">
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                    Product
                                                    <ChevronDownIcon
                                                        className={clsx(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                        aria-hidden="true"
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="mt-2 space-y-2">
                                                    {[...products, ...callsToAction].map((item) => (
                                                        <Disclosure.Button
                                                            key={item.name}
                                                            as="button"
                                                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                        >
                                                            <Link to={item.href}>
                                                                {item.name}
                                                            </Link>
                                                        </Disclosure.Button>
                                                    ))}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Features
                                    </a>
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Marketplace
                                    </a>
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Company
                                    </a>
                                </div>
                                <div className="py-6">


                                    {!user ? <a
                                            href="/auth/signin"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Sign in
                                        </a> :
                                        <div className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                                             onClick={logOut}
                                        >
                                            Log Out <span aria-hidden="true">&rarr;</span>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            <section className="px-8 py-5">
                <Outlet/>
            </section>
        </main>
    )
}
