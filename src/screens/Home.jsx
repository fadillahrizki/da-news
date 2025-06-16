import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import Filter from '../components/Filter';
import { Link } from 'react-router';

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [dateStart, setDateStart] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [dateEnd, setDateEnd] = useState(new Date())

  const handleDateStartChange = (el) => {
    setDateStart(new Date(el.target.value))
  }

  const handleDateEndChange = (el) => {
    setDateEnd(new Date(el.target.value))
  }

  const formatDate = (date) => date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))

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

  useEffect(() => {
    fetchPosts(page, true);
  }, [dateStart, dateEnd]);

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

  const fetchPosts = async (pageNum, isFiltered = false) => {
    setLoading(true);
    try {
      const res = await axios.get(
        // 'https://jsonplaceholder.typicode.com/posts',
        // {
        //   params: { _limit: 10, _page: pageNum, beginningDate: dateStart, endingDate: dateEnd },
        // }
        'https://eventregistry.org/api/v1/article/getArticles',
        {
          params: { 
            articlesCount: 10, 
            articlesPage: pageNum, 
            dateStart: formatDate(dateStart), 
            dateEnd: formatDate(dateEnd), 
            apiKey:'63b8739f-b6c8-4e0d-ae93-2d782f2a2647',
            lang: 'ind'
          },
        }
        // 'https://newsapi.org/v2/everything?q=bitcoin',
        // {
        //   params: { 
        //     pageSize: 10, 
        //     page: pageNum, 
        //     from: dateStart, 
        //     to: dateEnd, 
        //     apiKey:'pub_085d7819a6e94ba7b67ba113bb14e981'
        //   },
        // }
      );
      if(isFiltered) {
        setPosts(res.data.articles.results);
      } else {
        setPosts((prev) => [...prev, ...res.data.articles.results]);
      }
      if (res.data.articles.results.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="">
    <Filter dateStart={formatDate(dateStart)} dateEnd={formatDate(dateEnd)} handleDateStartChange={handleDateStartChange} handleDateEndChange={handleDateEndChange}/>
    {posts.map((post, index) => {
      if (posts.length === index + 1) {
        return (
          <Link key={index} to={`/detail/${post.uri}`} ref={lastPostElementRef}>
            <div
              className="cursor-pointer border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200"
            >
              <p className='text-gray-600 dark:text-gray-400 font-medium'>{post.source.title}</p>
              <h2 className="text-md md:text-xl font-medium text-gray-800 dark:text-white">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{new Date(post.dateTime).toLocaleString()}</p>
            </div>
          </Link>
        );
      } else {
        return (
          <Link key={index} to={`/detail/${post.uri}`}>
            <div 
              className="cursor-pointer border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200" 
            >
              <p className='text-gray-600 dark:text-gray-400 font-medium'>{post.source.title}</p>
              <h2 className="text-md md:text-xl font-medium text-gray-800 dark:text-white">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{new Date(post.dateTime).toLocaleString()}</p>
            </div>
          </Link>
        );
      }
    })}
    {loading && <p className="text-center py-4 animate-pulse dark:text-white text-gray-800">Loading...</p>}
    {error && <p className="text-center text-red-500 py-4">{error}</p>}
    {showScrollTop && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-16 right-4 p-4 bg-white text-gray-800 border border-gray-800 dark:border-gray-100 dark:bg-gray-800 dark:text-white rounded-full z-100 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
      >
        <ChevronUpIcon className="w-4 h-4"/>
      </button>
    )}
  </div>
);
}

export default Home
