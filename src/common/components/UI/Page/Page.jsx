import React from 'react';
import styles from './Page.module.scss';

const Page = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default React.memo(Page);
