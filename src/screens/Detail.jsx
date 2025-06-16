import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function Detail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {id} = useParams();
  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://eventregistry.org/api/v1/article/getArticle',
        {
          params: { 
            articleUri: id,
            apiKey:'63b8739f-b6c8-4e0d-ae93-2d782f2a2647',
            lang: 'ind'
          },
        }
      );
      setPost(res.data[id].info);
    } catch (err) {
      console.error(err)
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="p-3">
    {loading && <p className="text-center py-4 animate-pulse dark:text-white text-gray-800">Loading...</p>}
    {error && <p className="text-center text-red-500 py-4">{error}</p>}
    {post && (
      <div>
        <img src={post.image ? post.image : 'https://via.placeholder.com/600x400'} alt={post.title} className="w-full h-64 object-cover rounded-lg" />
        <div className="flex items-center justify-between my-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.dateTime).toLocaleString()}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{post.authors.length > 0 ? post.authors.map((author, index) => (
            <span key={index}>{author.name}{index < post.authors.length - 1 ? ', ' : ''}</span>
          )) : 'Unknown Author'}</span>
        </div>
        <h6 className='text-gray-600 dark:text-gray-400 font-medium'>{post.source.title}</h6>
        <h1 className="text-md md:text-xl font-medium text-gray-800 dark:text-white my-2">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{post.body}</p>
      </div>
    )}
  </div>
);
}

export default Detail
