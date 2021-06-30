import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'Layouts/Header';
import Routes from 'Src/routes';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes />
      </Router>
    </div>
  );
};

export default React.memo(App);
