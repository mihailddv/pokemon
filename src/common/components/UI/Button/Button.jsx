import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ text, onClick }) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {};

export default React.memo(Button);
