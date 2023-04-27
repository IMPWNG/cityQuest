import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();
  return (
    <>
          <div className="bg-gray-800 p-6 w-full md:w-1/2 lg:w-1/3 mx-auto mt-10 rounded-md shadow-lg border-4 border-yellow-400">
              <header className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-10">
                      <Link href="/" className="cursor-pointer ">
                          <p
                              className={clsx(
                                  "text-xl font-bold text-yellow-300 hover:text-yellow-400 cursor-pointer",
                                  isActive("/") && "text-yellow-400"
                              )}
                          >
                              Home
                          </p>
                      </Link>
                      <Link href="/questFeed" className="cursor-pointer ">
                          <p
                              className={clsx(
                                  "text-xl font-bold text-yellow-300 hover:text-yellow-400 cursor-pointer",
                                  isActive("/questFeed") && "text-yellow-400"
                              )}
                          >
                                Quest Feed
                          </p>
                      </Link>
                  </div>
                  <div className="flex items-center">
                      {!session ? (
                          <Link href="/api/auth/signin" passHref>
                              <button className="bg-green-600 text-white p-2 rounded-md mt-2 hover:bg-green-700 transition-colors">
                                  Login
                              </button>
                          </Link>
                      ) : (
                          <>
                             
                              <button
                                  onClick={() => signOut()}
                                  className="bg-red-600 text-white p-2 rounded-md mt-2 hover:bg-red-700 transition-colors"
                              >
                                  Logout
                              </button>
                          </>
                      )}
                  </div>
              </header>
          </div>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
     
    </>
  );
};

export { Layout };
