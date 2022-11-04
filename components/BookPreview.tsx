import { useState } from 'react';
import { Book } from '../pages';
import BookDetail from './BookDetail';

type Props = {
  book: Book;
};

const BookPreview = ({ book }: Props) => {
  const [openDetail, setOpenDetail] = useState(false);

  const closeDetail = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <div
        className="max-w-[128px] flex flex-col gap-2 shadow-lg hover:scale-110 transition-all cursor-pointer"
        onClick={() => setOpenDetail(true)}
      >
        {book.volumeInfo.imageLinks ? (
          <img
            className="h-[200px] object-contain"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="book cover"
          />
        ) : (
          <div className="h-[200px] flex items-center content-center text-center text-slate-400">
            No Cover Art Available
          </div>
        )}
        <p className="text-sm p-2 text-center">{book.volumeInfo.title}</p>
      </div>
      {openDetail ? <BookDetail onClick={closeDetail} book={book} /> : null}
    </>
  );
};

export default BookPreview;
