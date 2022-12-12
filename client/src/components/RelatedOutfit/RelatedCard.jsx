import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress, formatImg } from '../../util';

const RelatedCard = ({ relateOneId, current, CurMeta, setCurrent, setStars, calculateAverageStars, setMetadata }) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [relStar, setRelStar] = useState(5);

//   const priceStyle = {
//     color: `${onSale ? 'red' : 'inherit'}`,
//   };
//   <h6>
//   <span style={priceStyle}>
//     $
//     {price}
//     &nbsp;
//   </span>
//   <span className={local.oldPrice}>{onSale ? `$${origPrice}` : ''}</span>
// </h6>

// .oldPrice {
//   text-decoration: line-through;
// }

  useEffect(() => {
    if (relateOneId) {
      requests.getProductInfo(relateOneId, (infoData) => {
        setInfo(infoData);
      });
      requests.getStyles(relateOneId, (styleData) => {
        setStyle(styleData);
        setPic(styleData.results[0].photos[0].thumbnail_url);
        // setDiscount(styleData.results[0].sale_price);
        const saleCheck = !!styleData.results[0].sale_price;
        // console.log('saleCheck', saleCheck);
        // console.log('sale price', styleData.results[0].sale_price);
        // console.log('styleData', styleData);
        setOnSale(saleCheck);
        setPrice(saleCheck ? styleData.results[0].sale_price : styleData.results[0].original_price);
      });
      requests.getMetadata(relateOneId, (metaData) => {
        setRelStar(calculateAverageStars(metaData.ratings))
        setRel1Meta(metaData);
      });
    }
  }, [relateOneId]);
  const handleToggle = () => {
    setToggleTable(!toggleTable);
  };
  const handleChangeCurrent = () => {
    event.preventDefault();
    setCurrent(info);
    setMetadata(rel1Meta);
  };

  const deleteButton = <button type="button" className={local.action} onClick={handleToggle} onKeyPress={buildHandleEnterKeyPress(handleToggle)}>☆</button>

// scales for each component not whole div, also breaks everything else like buttons
  // const handleEnter = (e) => {
  //   e.target.style.transform = 'scale(1.025)';
  // };
  // const handleLeave = (e) => {
  //   e.target.style.transform = 'scale(1)';
  // };
  return (
    <div className={local.relatedCard}>
    {/* <div className={local.relatedCard} onMouseEnter={handleEnter} onMouseLeave={handleLeave}></div> */}
      {pic ? deleteButton : ''}
      <center>
        {pic
          ? <img src={pic} role="button" alt="card pic" tabIndex={0} className={local.cardpic} onClick={handleChangeCurrent} onKeyPress={buildHandleEnterKeyPress(handleChangeCurrent)} />
          : (
            <div className={local.noPhoto}>
              {deleteButton}
              Photo Unavailable
            </div>
          )}
        {/* <img src={pic} alt="card pic" className={local.cardpic} onClick={handleChangeCurrent} /> */}
      </center>
      <div>
        {/* Category: */}
        {info.category}
      </div>
      <div>
        {/* Name: */}
        {info.name}
      </div>
      <div>
        {/* Price: $ */}
        $
        {price}
      </div>
      <StarDisplay stars={relStar} />
      {toggleTable ? (
        <CompareTable handleToggle={handleToggle} current={current} rel1Info={info} rel1style={style} CurMeta={CurMeta} rel1Meta={rel1Meta} />
      ) : <div></div>}
    </div>
  );
};

export default RelatedCard;
