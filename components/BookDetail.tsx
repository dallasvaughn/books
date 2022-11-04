import { useEffect, useState } from 'react';
import { Book } from '../pages';
import Modal from './Modal';
import ModalContent from './ModalContent';
import ReviewItem from './ReviewItem';

type Props = {
  onClick: () => void;
  book: Book;
};

export interface Review {
  author: string;
  content: string;
}

const BookDetail = ({ onClick, book }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const { volumeInfo } = book;

  useEffect(() => {
    if (!localStorage.getItem(book.id)) {
      localStorage.setItem(book.id, JSON.stringify([]));
    } else if (localStorage.getItem(book.id)) {
      const storageItem = localStorage.getItem(book.id) || '';
      const storageReviews = JSON.parse(storageItem);
      setReviews(storageReviews);
    }
  }, []);

  const handleSubmit = (): void => {
    setReviews([...reviews, { author, content }]);
    localStorage.setItem(
      book.id,
      JSON.stringify([...reviews, { author, content }])
    );
  };

  return (
    <Modal onClick={onClick}>
      <ModalContent>
        <div className="flex gap-4 mb-6">
          {book.volumeInfo.imageLinks ? (
            <img
              className="h-[200px] object-contain max-w-[50%]"
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="book cover"
            />
          ) : (
            <div className="h-[200px] flex items-center content-center text-center text-slate-400">
              No Cover Art Available
            </div>
          )}
          <div>
            <h2 className="font-bold leading-5 mb-2">{volumeInfo.title}</h2>
            {volumeInfo.authors && (
              <p className="text-xs text-slate-400 mb-2">
                By {volumeInfo.authors[0]}
              </p>
            )}
            <p className="text-xs text-slate-400 mb-2">
              Publisher: {volumeInfo.publisher || 'N/A'}
            </p>
            <p className="text-xs text-slate-400 mb-2">
              Published Date: {volumeInfo.publishedDate || 'N/A'}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-sm">Description</h3>
          <p className="text-sm leading-6">{volumeInfo.description}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Reviews</h3>
          <div className="flex flex-col gap-2 mt-2 mb-4">
            <label className="text-sm">Leave a review:</label>
            <input
              className="border text-sm py-1 px-2 rounded"
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                setAuthor(input.value);
              }}
            />
            <textarea
              className="border text-sm py-1 px-2 rounded"
              placeholder="What did you think about this book?"
              value={content}
              onChange={(e) => {
                const input = e.target as HTMLTextAreaElement;
                setContent(input.value);
              }}
            />
            <button
              className="self-start text-sm bg-emerald-500 text-white rounded py-1 px-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        {reviews.length === 0 ? (
          <p className="italic text-slate-400 text-sm">
            There are no reviews for this book yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {reviews.map((review, i) => {
              return <ReviewItem key={i} review={review} />;
            })}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookDetail;
