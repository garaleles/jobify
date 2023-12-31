import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  DeleteJob,
  EditJob,
  Error,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import {action as profileAction} from './pages/Profile';
import {loader as statsLoader} from './pages/Stats';


const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader },
          { path: 'stats', element: <Stats />, loader: statsLoader },
          { path: 'profile', element: <Profile />, action: profileAction },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader,
          },
          {
            path: 'delete-job/:id',
            element: <DeleteJob />,
            action: deleteJobAction,
          },
        ],
      },

      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },

      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
