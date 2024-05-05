import React from 'react';
import FeedbackSingleCard from './FeedbackSingleCard'

const FeedbackCard = ({ feedbacks }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 '>
      {feedbacks.map((feedback) => (
        <FeedbackSingleCard key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackCard;
