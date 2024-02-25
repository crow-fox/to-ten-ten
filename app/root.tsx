import { Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import logo from "./assets/logo.svg";
import "./styles/globals.css";

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body className="  bg-primary-background text-md text-primary-text has-[dialog[open]]:overflow-y-hidden">
        <div className=" flex min-h-svh flex-col">
          <header className=" grid place-content-center border-b border-b-secondary-border px-20 py-12">
            <h1>
              <img src={logo} alt="to ten ten" width="62" height="16" />
            </h1>
          </header>
          <main>
            <Outlet />
          </main>
          <footer className=" mt-auto grid place-content-center border-t border-t-secondary-border px-20 py-12">
            <p>
              <small className=" text-sm not-italic text-secondary-text">
                &copy; 2024 crow-fox
              </small>
            </p>
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body>
        <div className="grid h-screen grid-cols-1 place-items-center">
          Loading...
        </div>
        <Scripts />
      </body>
    </html>
  );
}
