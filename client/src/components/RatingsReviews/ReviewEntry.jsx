import React from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/RatingsReviews/ReviewEntry.css';

const formatDate = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date[8] === '0' ? date.substring(9, 10) : date.substring(8, 10);
  let string = '';
  if (month === '01') {
    string = `January ${day}, ${year}`;
  } else if (month === '02') {
    string = `Feburary ${day}, ${year}`;
  } else if (month === '03') {
    string = `March ${day}, ${year}`;
  } else if (month === '04') {
    string = `April ${day}, ${year}`;
  } else if (month === '05') {
    string = `May ${day}, ${year}`;
  } else if (month === '06') {
    string = `June ${day}, ${year}`;
  } else if (month === '07') {
    string = `July ${day}, ${year}`;
  } else if (month === '08') {
    string = `August ${day}, ${year}`;
  } else if (month === '09') {
    string = `September ${day}, ${year}`;
  } else if (month === '10') {
    string = `October ${day}, ${year}`;
  } else if (month === '11') {
    string = `November ${day}, ${year}`;
  } else {
    string = `December ${day}, ${year}`;
  }
  return string;
};

const ReviewEntry = ({ review }) => {
  const handleClick = () => {
    event.preventDefault();
    console.log('hi Jake');
  };

  return (
    <div className={local.main}>
      <div className={local.header}>
        <span className={local.rating}>
          {review.rating}
          ★★★★★
        </span>
        <span className={local.user}>
          {review.reviewer_name}
          ,
          {formatDate(review.date)}
        </span>
      </div>
      <h4 className={local.summary}>{review.summary}</h4>
      <p>{review.body}</p>
      <div>
        {review.recommend && '✓ I recommend this product'}
      </div>
      <div className={local.response}>
        {review.response && (
          <div>
            Response:
            <div>{review.response}</div>
          </div>
        )}
      </div>
      <div className={local.footer}>
        Helpful?
        <a
          role="button"
          tabIndex={0}
          className={local.helpful}
          onClick={handleClick}
          onKeyPress={buildHandleEnterKeyPress(handleClick)}
        >
          YES
        </a>
        (
        {review.helpfulness}
        )|
        <a
          role="button"
          tabIndex={0}
          className={local.report}
          onClick={handleClick}
          onKeyPress={buildHandleEnterKeyPress(handleClick)}
        >
          Report
        </a>
      </div>
    </div>
  );
};

export default ReviewEntry;
