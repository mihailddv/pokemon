import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Cross = ({ fill }) => (
  <svg viewBox="0 0 512 512">
    <g>
      <g>
        <polygon
          points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256"
        />
      </g>
    </g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
    <g></g>
  </svg>
);

Cross.propTypes = {};

Cross.defaultProps = {
  fill: '#000',
};

export default memo(Cross);
