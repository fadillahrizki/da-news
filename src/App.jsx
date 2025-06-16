import { useState } from "react";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./screens/Home";
import Settings from "./screens/Settings";

function App() {
  const [page, setPage] = useState(0)
  const pages = ["Home", "Settings"]

  return (
    <>
      <Header page={pages[page]}/>
      <div className="py-16 bg-white dark:bg-gray-900 min-h-screen">
        {page == 0 ? <Home/> : <Settings/>}
        <slot></slot>
      </div>
      <Navigation activePage={page} setPage={setPage}/>
    </>
  );
}

export default App;