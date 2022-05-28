import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AssetManagement } from './components/AssetManagement/AssetManagement';
import { Auth } from './components/Auth/Auth';
import { Calendar } from './components/Calendar/Calendar';
import { UserManagement } from './components/UserManagement/UserManagement';
import { AuthContext } from './utils/AuthContext';

const routes: ReadonlyArray<{
  readonly path: string
  readonly component: React.FC
  readonly exact?: boolean
}> = [
    {
      path: '/home-page',
      component: Calendar,
    },
    {
      path: '/user-management',
      component: UserManagement,
    },
    {
      path: '/asset-management',
      component: AssetManagement,
    },
    // {
    //   path: '/auth',
    //   component: Auth,
    // },
  ]

function App() {
  return (
    <div className="App">
      <AuthContext>
      <BrowserRouter
      // basename={
      //   process.env.REACT_APP_BASE_NAME ? process.env.REACT_APP_BASE_NAME : '/ontelo/'
      // }
      >
        <Routes>
          <Route
            path="/"
            element={<Auth />}
          />
          {routes.map((each, index) => (
            <Route key={index} {...each} />
          ))}
          <Route path="*" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
      </AuthContext>
    </div>
  );
}

export default App;
