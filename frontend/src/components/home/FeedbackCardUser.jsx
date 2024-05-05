import React from 'react';
import FeedbackSingleCardUser from './FeedbackSingleCardUser'

const FeedbackCardUser = ({ feedbacks }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {feedbacks.map((feedback) => (
        <FeedbackSingleCardUser key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackCardUser;
