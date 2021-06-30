import React from 'react';
import PropTypes from 'prop-types';

import styles from './Error.module.scss';

const Error = ({ text }) => {
  return <div className={styles.container}>{text}</div>;
};

Error.propTypes = {
  text: PropTypes.string,
};

Error.defaultProps = {
  text: 'Something went wrong :-(',
};

export default React.memo(Error);
