import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Layouts/Home';
import Pokemon from 'Layouts/Pokemon';
import Compare from 'Components/Compare';

export default () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/pokemon/:id" component={Pokemon} />
      <Route path="/compare/" component={Compare} />
      <Redirect to="/" />
    </Switch>
  );
};
