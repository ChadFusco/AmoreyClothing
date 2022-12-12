import React from 'react';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import local from '../../styles/RatingsReviews/RatingBreakdown.css';

const RatingBreakdown = ({
  ratings, recommend, stars, changeSearch, sort,
}) => {
  const handleClick = (index) => {
    event.preventDefault();
    changeSearch(index);
  };

  const reviewGraph = (starCount) => {
    const percent = ratings
      ? (ratings[starCount]
      / Object.keys(ratings).reduce((total, key) => (total + Number(ratings[key])), 0)).toFixed(2)
      * 100
      : 0;

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
          style={{ width: `${percent}%`, border: sort[starCount - 1] ? 'solid 1px gold' : '' }}
        />
      </div>
    );
  };

  const recommenedPercent = () => {
    if (!recommend) {
      return 0;
    }
    const approve = Number(recommend.true);
    const reject = Number(recommend.false);
    return Math.floor((approve / (approve + reject)) * 100);
  };

  return (
    <div className={local.ratingMain}>
      <div className={local.starHeader}>
        <div className={local.starRating}>
          {stars && (Math.round(stars * 4) / 4).toFixed(1)}
        </div>
        <StarDisplay stars={stars} />
      </div>
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
