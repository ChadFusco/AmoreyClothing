import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from './Banner/Banner.jsx';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import requests from '../requests.js';
import calculateAverageStars from '../util/calculateStarAverage.js';
import local from '../styles/Product.css';
import { setCookie, getCookie } from '../util/index.js';

const FAVS_COOKIE = 'amorey_favs';

export async function productLoader({ params }) {
  const current = await requests.getProductInfo(params.productId);
  document.title = current?.name ? `Amorey: ${current.name}` : document.title;
  console.log('current:', current);
  return { current };
}

function Product() {
  const [favorites, setFavorites] = useState(getCookie(FAVS_COOKIE) || []);
  const { current } = useLoaderData();
  // All states below are for the CURRENT product (the one displayed in Overview)
  // const [current, setCurrent] = useState({ features: [] });
  const [currentStyles, setCurrentStyles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [order, setOrder] = useState('relevant');
  const [darkMode, setDarkMode] = useState(false);
  const [relateArr, setRelatedArr] = useState([]);
  const ratingsReviewsRef = useRef(null);

  const getReviews = (sortMethod = order) => {
    requests.getReviews(current.id, sortMethod, (data) => {
      setReviews(data.results);
    });
  };

  const getQuestions = () => {
    requests.getQuestions(current.id, (data) => {
      setQuestions(data.results);
    });
  };

  // on app load, get product data, then get styles and metadata
  useEffect(() => {
    requests.getStyles(current.id, (styleData) => {
      setCurrentStyles(styleData.results);
    });
    requests.getMetadata(current.id, (metrics) => {
      setMetadata(metrics);
      setStars(calculateAverageStars(metrics.ratings));
    });
    requests.getRelated(current.id, (data) => {
      const unique = [...new Set(data)];
      const temp = unique.filter((item) => {
        return item !== current.id;
      });
      setRelatedArr(temp);
    });
    getReviews();
    getQuestions();
  }, [current]);

  // if favorites change, save favorites to cookie on client
  useEffect(() => {
    setCookie(FAVS_COOKIE, favorites);
  }, [favorites]);

  return (
    <div className={darkMode ? local.bodyDark : local.body}>
      <Banner darkMode={darkMode} setDarkMode={setDarkMode} />
      <Overview
        current={current}
        currentStyles={currentStyles}
        stars={stars}
        favorites={favorites}
        setFavorites={setFavorites}
        reviewsQty={reviews.length}
        darkMode={darkMode}
        ref={ratingsReviewsRef}
      />
      <RelatedOutfit
        current={current}
        favorites={favorites}
        setFavorites={setFavorites}
        curMeta={metadata}
        currentStyles={currentStyles}
        stars={stars}
        calculateAverageStars={calculateAverageStars}
        darkMode={darkMode}
        relateArr={relateArr}
      />
      <QuestionsAnswers
        current={current}
        questions={questions}
        getQuestions={getQuestions}
        darkMode={darkMode}
      />
      <RatingsReviews
        current={current}
        metadata={metadata}
        reviews={reviews}
        getReviews={getReviews}
        stars={stars}
        setOrder={setOrder}
        darkMode={darkMode}
        ref={ratingsReviewsRef}
      />
    </div>
  );
}

export default Product;
