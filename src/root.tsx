import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import Loading from "./components/ui/Loading";

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
  return <Loading />;
}

export default function Root() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <div id="root" className="min-h-screen  p-4 w-full flex flex-col">
          <NavBar />
          <main className="flex-1 flex flex-col">
            <Outlet />
          </main>
          <Footer />
          <Toaster position="top-center" />
        </div>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
