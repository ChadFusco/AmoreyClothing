import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import Characteristic from './Characteristic.jsx';
import local from '../../../styles/RatingsReviews/NewReview/Index.css';

const WriteNewReview = ({ current, details }) => {
  const [letterCount, setLetterCount] = useState(50);

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
  };

  return (
    <div className={local.modal}>
      <div className={local.reviewForm}>
        <form id="newReview" className="form">
          <h2>Write Your Review</h2>
          <h4>{`About the ${current}`}</h4>
          <StarRating />
          <h6>Do You recommend this product?</h6>
          <label htmlFor="recYes">Yes</label>
          <input type="radio" name="recommend" id="recYes" required />
          <label htmlFor="recNo">No</label>
          <input type="radio" name="recommend" id="recNo" />
          {details && (
            Object.keys(details).map((detail, index) => {
              return <Characteristic detail={detail} index={index} />;
            })
          )}
          <h6>
            <input placeholder="Example: Best purchase ever!" />
            {' Summary (Optional)'}
          </h6>
          <h6>
            <input placeholder="Why did you like the product or not?" minLength="50" maxLength="1000" onChange={() => updateLetterCount(event.target.value)} required />
            {' Body'}
          </h6>
          <p>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
          <h6>
            <input placeholder="Example: Jackson11!" maxLength="60" required />
            {' Username'}
          </h6>
          <p>For privacy reasons, do not use your full name or email address</p>
          <h6>
            <input type="email" placeholder="jackson11@email.com" maxLength="60" required />
            {' Email Address'}
          </h6>
          <p>For authentication reasons, you will not be emailed</p>
          <button type="button">Upload Images (Optional)</button>
          <button type="submit">Submit Review!</button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewReview;
