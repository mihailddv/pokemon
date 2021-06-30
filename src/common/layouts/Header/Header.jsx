import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'UI/Container';

import logo from '/assets/images/pokeball.png';
import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <Container>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.logoImg}>
              <img src={logo} />
            </div>
            <div className={styles.title}>Pokemons</div>
          </Link>
        </div>
        <div className={styles.compare}>
          <Link to="/compare">Compare</Link>
        </div>
      </div>
    </Container>
  </div>
);

export default React.memo(Header);
