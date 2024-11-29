// src/components/Navbar.tsx
"use client";

import React from "react";
import "../app/styles/style.css";

import Search from "@/components/Search";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

let navigation: NavigationItem[] = [
  { name: "Home", href: "/home", current: false },
  { name: "Mahasiswa", href: "/mahasiswa", current: false },
  { name: "Stakeholder", href: "/stakeholder", current: false },
];

const setCurrentPath = (path: string) => {
  navigation = navigation.map((item) =>
    item.href === path
      ? { ...item, current: true }
      : { ...item, current: false }
  );
};

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  setCurrentPath(pathname);

  const { user, logout } = useAuth();

  console.log("ini adalah isi dari user -> ",user);
  console.log("ini adalah isi dari logout -> ",logout);

  return (
    <Disclosure
      as="nav"
      className="bg-primary flex flex-col items-center justify-center">
      {({ open }) => (
        <>
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center sm:justify-between max-sm:gap-4">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start p-12 sm:p-0">
                <div className="flex flex-shrink-0 items-center cursor-pointer">
                  <a href="/home">
                    <img
                      className="h-10 w-auto rounded-full"
                      src="/assets/logo.png"
                      alt="SiMaPro Logo"
                    />
                  </a>
                  {/* <h1 className="sm:hidden ms-4 font-black">SiMaPro</h1> */}
                </div>
                <div className="hidden sm:ml-6 sm:flex items-center justify-center">
                  <div className="flex space-x-4 items-center">
                    <div className="font-black text-white text-xl font-sans me-16 cursor-pointer">
                      <a href="/home">
                        Sistem Informasi Manajemen Proyek Aplikasi Dasar
                      </a>
                    </div>
                    <div className="flex gap-10">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "text-primary bg-primary bg-white bg-blend-normal font-black"
                              : " text-white hover:bg-white hover:text-primary ease-in-out duration-300",
                            "rounded-md px-3 py-2 text-lg "
                          )}
                          aria-current={item.current ? "page" : undefined}>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Search />
              <div className="inset-y-0 h-10 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Search */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative  flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>

                  {/* cek login */}
                  {user ? (
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b-2">
                          {user}
                        </div>
                      </MenuItem>

                      <MenuItem>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}>
                            Logout
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  ) : (
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}>
                            Login
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  )}

                  {/* <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b-2">
                        username
                      </div>
                    </MenuItem>

                    <MenuItem>
                      {({ active }) => (
                        <a
                          // onClick={logout}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}>
                          Logout
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems> */}
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden w-full max-sm:relative">
            <div className="space-y-1 px-2 pb-3 pt-2 w-full flex flex-col max-sm:absolute bg-primary">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "max-sm:bg-blue-900 text-white"
                      : "text-white hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}>
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
