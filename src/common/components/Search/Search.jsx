import React from 'react';
import PropTypes from 'prop-types';
import Input from 'UI/Input';

import styles from './Search.module.scss';

const Search = ({ placeholder, value, onChange }) => {
  return (
    <form>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </form>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Search.defaultProps = {
  placeholder: 'Search',
  value: '',
};

export default React.memo(Search);
