import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

function Header() {

  const location = useLocation();
  const currentPath = location.pathname;
  const {id} = useParams();

  const [paths] = useState({
    "/": "Home",
    "/detail": "Detail",
    "/settings": "Settings"
  });

  let [pathTitle, setPathTitle] = useState("");

  useEffect(() => {
    if(currentPath.startsWith("/detail") && id ) {
      setPathTitle(`Detail`);
    } else {
      setPathTitle(paths[currentPath] || "Home");
    }

    document.title = `${pathTitle} - Simple Infinite Scroll App`;
  }, [currentPath, id, pathTitle, paths]);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed top-0 w-full text-center z-100">
        <div className="p-4 text-center">
          {currentPath.startsWith("/detail") && id ? (
            <div className="flex items-center justify-between">
              <Link to="/" className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-300">
                <ChevronLeftIcon className="w-5 h-5" />
                </Link>
              <span className="text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">Detail</span>
              <span></span>
            </div>
          ) : (
            <span className="text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">{pathTitle}</span>
          )}
        </div>
    </nav>

  );
}

export default Header;