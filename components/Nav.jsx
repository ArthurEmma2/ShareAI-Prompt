"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const isUserLogggedIn = false;
  const [providers, setProviders] = useState(null);
  const [toggleDropdrown, setToggleDropdown] = useSession(flase);

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
        {isUserLogggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
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
                onClick={() => setToggleDropdown((prev) => prev(true))}
              />
              {toggleDropdrown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    onClick={() => setToggleDropdown(false)}
                    className="dropdown_link"
                  >
                    my profile
                  </Link>
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

      {/* MOBILE NAVIGATION */}
      <div className="sm:hidden flex relative">
        {isUserLogggedIn ? (
          <div className="flex">
            <Image
              className="rounded-full"
              width="37"
              height="37"
              src="/assets/images/logo.svg"
              alt="image"
            />
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
