import React, { Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Login = React.lazy(() => import('./components/pages/Login/Login'));
const Table = React.lazy(() => import('./components/pages/Table/Table'));

interface Props { }

const AppView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Route path="/login" component={Login} />
      <Route path="/table" component={Table} />
    </Suspense>
  </BrowserRouter>
);

AppView.displayName = 'AppView';
AppView.defaultProps = {};

export default React.memo(AppView);
