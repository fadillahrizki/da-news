import { Outlet } from "react-router";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { Analytics } from "@vercel/analytics/react"

function Layout() {
  return (
    <>
      <Analytics/>
      <Header/>
      <div className="py-16 bg-white dark:bg-gray-900 min-h-screen">
        <Outlet/>
      </div>
      <Navigation/>
    </>
  );
}

export default Layout;