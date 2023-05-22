"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdrown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProfileProvider = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setProfileProvider();
  }, []);

  return (
    <nav className=" flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image width="30" height="20" src="/assets/images/logo.svg" />
      </Link>

      {/* MOBILE NAVIGATION */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link className="" href="/profile">
              {" "}
              <Image
                className="rounded-full"
                width="37"
                height="37"
                src="/assets/images/logo.svg"
                alt="image"
              />
              {toggleDropdrown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    onClick={() => setToggleDropdown(false)}
                    className="dropdown_link"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Signout
                  </button>
                </div>
              )}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden  flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              className="rounded-full"
              width="37"
              height="37"
              src="/assets/images/logo.svg"
              alt="image"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdrown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  onClick={() => setToggleDropdown(false)}
                  className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                  className="dropdown_link"
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5  w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
