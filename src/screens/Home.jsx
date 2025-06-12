import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ArrowRightCircleIcon, ArrowTopRightOnSquareIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useMemo(() => {
    return posts.map((post) => ({
      ...post,
      title: post.title.toUpperCase(),
    }));
  }, [posts]);

  const observer = useRef(null);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: { _limit: 10, _page: pageNum },
        }
      );
      setPosts((prev) => [...prev, ...res.data]);
      if (res.data.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  debounce(() => {
    setPage((prev) => prev + 1)
    console.log("debounce")
  }, 500);

  return (
  <div className="">
    {posts.map((post, index) => {
      if (posts.length === index + 1) {
        return (
          <div
            ref={lastPostElementRef}
            key={index}
            className="border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200"
          >
            <h2 className="text-md md:text-xl font-medium text-gray-800 dark:text-white">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
          </div>
        );
      } else {
        return (
          <div key={index} className="border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200">
            <h2 className="text-md md:text-xl font-medium text-gray-800 dark:text-white">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
          </div>
        );
      }
    })}
    {loading && <p className="text-center py-4 animate-pulse">Loading...</p>}
    {error && <p className="text-center text-red-500 py-4">{error}</p>}
    {showScrollTop && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-16 right-4 p-4 bg-white text-gray-800 border border-gray-800 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-full z-100 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
      >
        <ArrowUpIcon className="w-4 h-4"/>
      </button>
    )}
  </div>
);
}

export default Home
