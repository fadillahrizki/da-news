import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import Filter from '../components/Filter';

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const handleDateStartChange = (el) => {
    setDateStart(el.target.value)
  }

  const handleDateEndChange = (el) => {
    setDateEnd(el.target.value)
  }

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
        'https://newsapi.org/v2/everything?q=bitcoin',
        {
          params: { 
            pageSize: 10, 
            page: pageNum, 
            from: dateStart, 
            to: dateEnd, 
            apiKey:'73406be4b7f447d8b700cacb43e81c92'
          },
        }
      );
      if(isFiltered) {
        setPosts(res.data.articles);
      } else {
        setPosts((prev) => [...prev, ...res.data.articles]);
      }
      if (res.data.articles.length < 10) {
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
    <Filter dateStart={dateStart} dateEnd={dateEnd} handleDateStartChange={handleDateStartChange} handleDateEndChange={handleDateEndChange}/>
    {posts.map((post, index) => {
      if (posts.length === index + 1) {
        return (
          <div
            ref={lastPostElementRef}
            key={index}
            className="cursor-pointer border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200"
            onClick={()=>window.open(post.url, '_blank')}
          >
            <h6 className='text-gray-600 dark:text-gray-400 font-medium'>{post.source.name}</h6>
            <h2 className="text-md md:text-xl font-medium text-gray-800 dark:text-white">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{new Date(post.publishedAt).toLocaleString()}</p>
          </div>
        );
      } else {
        return (
          <div key={index} className="cursor-pointer border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200" onClick={()=>window.open(post.url, '_blank')}>
            <h6 className='text-gray-600 dark:text-gray-400 font-medium'>{post.source.name}</h6>
            <h2 className="text-md md:text-xl font-medium text-gray-800 dark:text-white">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{new Date(post.publishedAt).toLocaleString()}</p>
          </div>
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
        <ArrowUpIcon className="w-4 h-4"/>
      </button>
    )}
  </div>
);
}

export default Home
