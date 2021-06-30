import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SortArrow = ({ fill }) => (
  <svg viewBox="0 0 512 512">
    <title>arrow-triangle-down-glyph</title>
    <path d="M3,111.67,247.67,418.4c4,5.06,12.6,5.06,16.65,0L509,111.64a15.21,15.21,0,0,0,2.2-13.9,14.2,14.2,0,0,0-1-2.32,10.66,10.66,0,0,0-9.39-5.62H11.14a10.64,10.64,0,0,0-9.38,5.62,13.93,13.93,0,0,0-1,2.27A15.26,15.26,0,0,0,3,111.67Z" />
  </svg>
);

SortArrow.propTypes = {};

SortArrow.defaultProps = {
  fill: '#000',
};

export default memo(SortArrow);
