import { AdjustmentsHorizontalIcon, HomeIcon} from '@heroicons/react/24/solid'
import { Link, useLocation } from 'react-router';

function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">

            <Link to="/" className={"inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-700 group " + (currentPath == "/" ? "bg-gray-200 dark:bg-gray-700" : "")}>

                <HomeIcon className={"w-4 h-4 mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-300 "+ (currentPath == "/" ? "text-blue-500 dark:text-blue-300" : "text-gray-800 dark:text-white")} />

                <span className={"text-sm group-hover:text-blue-500 dark:group-hover:text-blue-300 " + (currentPath == "/" ? "text-blue-500 dark:text-blue-300" : "text-gray-800 dark:text-white")}>Home</span>

            </Link>
            <Link to="/settings" className={"inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 dark:hover:bg-gray-700 group " + (currentPath == "/settings" ? "bg-gray-200 dark:bg-gray-700" : "")}>

                <AdjustmentsHorizontalIcon className={"w-4 h-4 mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-300 "+ (currentPath == "/settings" ? "text-blue-500 dark:text-blue-300" : "text-gray-800 dark:text-white")} />

                <span className={"text-sm  group-hover:text-blue-500 dark:group-hover:text-blue-300 "+ (currentPath == "/settings" ? "text-blue-500 dark:text-blue-300" : "text-gray-800 dark:text-white")}>Settings</span>

            </Link>
        </div>
    </div>
  );
}

export default Navigation;