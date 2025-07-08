import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import NavBar from "./components/NavBar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>Cloud 9 Cafe</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div id="root" className="min-h-screen w-full flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
}
