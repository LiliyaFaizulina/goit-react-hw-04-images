import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { mapper } from 'utils/mapper';
import { fetchApi } from 'utils/fetchApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const perPage = 12;

  const notify = () =>
    toast('Nothing found for your request. Change query and try again');

  useEffect(() => {
    if (query) {
      fetchApi(query, page, perPage)
        .then(resp => {
          if (!resp.data.hits.length) {
            throw new Error('nothing');
          }

          const { hits, totalHits } = resp.data;
          setImages(prevImages => [...prevImages, ...mapper(hits)]);
          setTotalHits(totalHits);
        })
        .catch(error => {
          setError(error.message);
          notify();
        })
        .finally(() => setIsLoading(false));
    }
  }, [query, page]);

  const onSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setTotalHits(null);
    setError(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const countTotalPages = () => {
    return Math.round(totalHits / perPage);
  };

  return (
    <>
      <ToastContainer />
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} />
      {error && <Notification />}
      {isLoading && <Loader />}
      {!isLoading && totalHits > perPage && page < countTotalPages() && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
};
