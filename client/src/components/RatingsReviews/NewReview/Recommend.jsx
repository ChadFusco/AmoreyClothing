import React from 'react';
import local from '../../../styles/RatingsReviews/NewReview/Recommend.css';

const Recommend = ({ updateInput, setRecommend }) => (
  <div className={local.main}>
    <h6 className={local.header}>Do You recommend this product?</h6>
    <label className={local.rating} htmlFor="recommend">
      Yes
      <input
        type="radio"
        name="recommend"
        onChange={() => updateInput(setRecommend, true)}
        required
      />
    </label>
    <label className={local.rating} htmlFor="recommend">
      No
      <input
        type="radio"
        name="recommend"
        onChange={() => updateInput(setRecommend, false)}
      />
    </label>
  </div>
);

export default Recommend;
