import { DevicePhoneMobileIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function Settings() {
    const [theme, setTheme] = useState(localStorage.getItem('color-theme'))

    const handleThemeSwitcher = (newTheme) => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else if(newTheme === 'light') {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        } else {
            if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
                document.documentElement.classList.remove('light')
            } else {
                document.documentElement.classList.add('light')
                document.documentElement.classList.remove('dark')
            }
        }

        localStorage.setItem('color-theme', newTheme)
        setTheme(newTheme)
    };

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 px-4">
            <li className="py-3">
                <div className="sm:flex items-center justify-between">
                    <div className="flex gap-3 items-center mb-5 sm:mb-0">
                        <div className="p-1 border rounded-xl bg-white dark:bg-gray-800 dark:border-white">
                            <SunIcon className="w-6 h-6 text-gray-800 dark:text-white"/>
                        </div>
                        <p className="font-medium text-gray-800 dark:text-white">Theme</p>
                    </div>
                    <div className="inline-flex rounded-md shadow-xs" role="group">
                        <button onClick={()=>handleThemeSwitcher('light')} type="button" className={"cursor-pointer  inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-s-full border border-gray-800 dark:border-white border-e-0  dark:bg-gray-800 dark:text-white " + (theme == 'light' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700')}>
                            <SunIcon className="w-4 h-4"/>
                            Light
                        </button>
                        <button onClick={()=>handleThemeSwitcher('dark')} type="button" className={"cursor-pointer  inline-flex items-center gap-1 px-4 py-2 text-sm font-medium border border-gray-800 dark:border-white border-x-0 bg-white text-gray-800 dark:text-white " + (theme == 'dark' ? 'dark:bg-blue-500' : 'dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700')}>
                            <MoonIcon  className="w-4 h-4"/>
                            Dark
                        </button>
                        <button onClick={()=>handleThemeSwitcher('device')} type="button" className={"cursor-pointer  inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-e-full border border-gray-800 dark:border-white border-s-0 " + (theme == 'device' ? 'bg-blue-500 dark:bg-blue-500 text-white dark:text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700')}>
                            <DevicePhoneMobileIcon className="w-4 h-4"/>
                            Device
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Settings;