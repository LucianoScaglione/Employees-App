import { Outlet } from 'react-router';
import NavBar from './components/NavBar';

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default Layout;