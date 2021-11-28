import React, { Suspense } from 'react';
import { 
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

const Login = React.lazy(() => import('./components/pages/Login/Login'));
const Table = React.lazy(() => import('./components/pages/Table/Table'));

interface Props {
  readonly isLoggedIn: string | null;
}

const AppView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Switch>
        <Route path="/auth" component={Login} />
        <Route path="/table" component={Table} />
      </Switch>
    </Suspense>
  </BrowserRouter>  
);

AppView.displayName = 'AppView';
AppView.defaultProps = {};

export default React.memo(AppView);