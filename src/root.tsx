import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthContextProvider } from "./context/AuthContext";

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
// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}
export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <div
          id="root"
          className="min-h-screen justify-between p-4 w-full flex flex-col"
        >
          <NavBar />
          <Outlet />
          <Footer />
        </div>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
