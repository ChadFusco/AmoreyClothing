import React from 'react';
import local from '../../../styles/RatingsReviews/NewReview/Photos.css';

const Photos = ({ numberOfPhotos, uploadPhoto }) => (
  <label className={local.header} htmlFor="photos">
    {'Upload Up To 5 Images (Optional) '}
    <input
      ref={uploadPhoto}
      className={local.uploadPhoto}
      id="uploadPhoto"
      type="file"
      accept="image/*"
      onChange={numberOfPhotos}
      multiple
    />
  </label>
);

export default Photos;