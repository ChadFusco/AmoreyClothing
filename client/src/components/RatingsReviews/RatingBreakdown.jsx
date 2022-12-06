import React from 'react';
import local from '../../styles/RatingsReviews/RatingBreakdown.css';
import { buildHandleEnterKeyPress } from '../../util';

const RatingBreakdown = ({ ratings, recommend, stars, filter, sort }) => {
  const handleClick = (index) => {
    event.preventDefault();
    filter(index);
  };

  const reviewGraph = (starCount) => {
    const totalStars = Object.keys(ratings).reduce((total, key) => {
      return total + Number(ratings[key]);
    }, 0);
    const percent = (ratings[starCount] / totalStars).toFixed(2) * 100;

    return (
      <div
        role="button"
        tabIndex={0}
        className={local.graphDimensions}
        onClick={() => handleClick(starCount, sort)}
        onKeyPress={buildHandleEnterKeyPress(handleClick)}
      >
        <div
          className={local.graphDisplay}
          style={{ width: `${percent}%`, border: sort[starCount - 1] ? 'solid 1px red' : '' }}
        />
      </div>
    );
  };

  const recommenedPercent = () => {
    const approve = Number(recommend.true);
    const reject = Number(recommend.false);
    return Math.floor((approve / (approve + reject)) * 100);
  };

  return (
    <div className={local.ratingMain}>
      <h1 className={local.starHeader}>
        <div className={local.starRating}>
          {(Math.round(stars * 4) / 4).toFixed(1)}
        </div>
        <div className={local.starDimensions}>
          <div className={local.starDisplay} style={{ width: `${stars * 20}%` }} />
        </div>
      </h1>
      <div className={local.recommend}>
        {recommenedPercent()}
        % of reviews recommend this product
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>5 Stars</p>
        {reviewGraph(5)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>4 Stars</p>
        {reviewGraph(4)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>3 Stars</p>
        {reviewGraph(3)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>2 Stars</p>
        {reviewGraph(2)}
      </div>
      <div className={local.graph}>
        <p className={local.graphText}>1 Stars</p>
        {reviewGraph(1)}
      </div>
    </div>
  );
};

export default RatingBreakdown;
