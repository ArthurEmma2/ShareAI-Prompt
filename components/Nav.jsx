"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  const [drawerState, setDrawerState] = useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, right: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {session?.user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Create Prompt" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={signOut}>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Blog" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Prompts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact Us" />
              </ListItemButton>
            </ListItem>
            {providers &&
              Object.values(providers).map((provider) => (
                <ListItem disablePadding key={provider.name}>
                  <ListItemButton onClick={() => signIn(provider.id)}>
                    <ListItemText primary={`Sign in with ${provider.name}`} />
                  </ListItemButton>
                </ListItem>
              ))}
          </>
        )}
      </List>
    </Box>
  );

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        ShareAIprompt
      </Link>

      {/* Larger screen navigation */}
      <div className="sm:flex hidden">
        {/* Session information */}
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link className="" href="/profile">
              <Image
                className="rounded-full cursor-pointer"
                width="50"
                height="47"
                src={session?.user.image}
                alt="image"
              />
              {toggleDropdown && (
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
                    Sign Out
                  </button>
                </div>
              )}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex text-center gap-5 ">
              <li>Blog</li>
              <li>Prompts</li>
              <li>Contact Us</li>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className=""
                  >
                    Sign in
                  </button>
                ))}
            </ul>
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {/* Conditionally render the avatar or hamburger button */}
        {session?.user ? (
          <Image
            className="rounded-full cursor-pointer"
            width="50"
            height="47"
            src={session?.user.image}
            alt="image"
            onClick={toggleDrawer(true)}
          />
        ) : (
          <IconButton
            className="hamburger-btn"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="right"
          open={drawerState.right}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
        {/* ... Your existing code */}
      </div>
    </nav>
  );
}

export default Nav;
