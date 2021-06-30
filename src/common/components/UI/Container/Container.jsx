import React from 'react';
import styles from './Container.module.scss';

const Container = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default React.memo(Container);
