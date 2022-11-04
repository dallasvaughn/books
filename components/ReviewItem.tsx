import { Review } from './BookDetail';

type Props = {
  review: Review;
};

const ReviewItem = ({ review }: Props) => {
  const { author, content } = review;

  return (
    <div className="bg-slate-100 p-2 rounded-lg">
      <p className="text-xs mb-2">
        Written by <span className="text-emerald-600">{author}</span>:
      </p>
      <p className="text-sm">"{content}"</p>
    </div>
  );
};

export default ReviewItem;
