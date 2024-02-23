import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import logo from "./assets/logo.svg";
import "./styles/globals.css";

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" bg-primary-background">
        <div className=" min-h-svh flex flex-col">
          <header className=" py-12 px-20 grid place-content-center border-b border-b-secondary-border">
            <p>
              <img src={logo} alt="to ten ten" width={62} height={16} />
            </p>
          </header>
          <main>
            <Outlet />
          </main>
          <footer className=" mt-auto border-t border-t-secondary-border py-12 px-20 grid place-content-center">
            <p>
              <small className=" text-sm text-secondary-text not-italic">
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
        <Links />
      </head>
      <body>
        <div className="grid grid-cols-1 h-screen place-items-center">
          Loading...
        </div>
        <Scripts />
      </body>
    </html>
  );
}
