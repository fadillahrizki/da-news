function Header({page}) {
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 fixed top-0 w-full text-center z-100">
        <div className="p-4 text-center">
            <a href="#">
                <span className="text-xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">{page}</span>
            </a>
        </div>
    </nav>

  );
}

export default Header;