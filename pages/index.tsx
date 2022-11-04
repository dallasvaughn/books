import type { NextPage } from 'next';
import { useState } from 'react';
import axios from 'axios';
import BookPreview from '../components/BookPreview';
import Loader from '../components/Loader';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    authors: string[];
    description: string;
    publisher: string;
    publishedDate: string;
  };
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [triedSearch, setTriedSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&maxResults=30&projection=lite&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
    );
    if (response.data.items) {
      setResults(response.data.items);
    }
    setTriedSearch(true);
    setLoading(false);
  };
  console.log(results);

  return (
    <div className="flex min-h-screen max-w-screen-lg flex-col items-center mx-auto">
      <h1 className="text-5xl font-bold text-emerald-600 mt-20 mb-10">
        Google Books
      </h1>
      <div className="flex w-[90%]">
        <input
          type="text"
          className="border border-r-0 py-2 px-6 rounded-l-full w-[768px] outline-none"
          placeholder="Search for books... (e.g. harry potter)"
          value={search}
          onChange={(e) => {
            const input = e.target as HTMLInputElement;
            setSearch(input.value);
          }}
        />
        <button
          className="bg-emerald-600 text-white py-2 px-6 rounded-r-full hover:opacity-75"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
      {loading && <Loader />}
      {triedSearch && results.length === 0 ? (
        <p className="mt-10">
          No search results found. Try searching for another book.
        </p>
      ) : (
        results.length > 0 && (
          <div className="flex flex-wrap gap-10 mt-10 p-6">
            {results.length > 0 &&
              results.map((result, i) => {
                return <BookPreview key={i} book={result} />;
              })}
          </div>
        )
      )}
    </div>
  );
};

export default Home;
