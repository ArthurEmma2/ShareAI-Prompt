import { SessionProvider } from "next-auth/react";
("use client");

function Provider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
