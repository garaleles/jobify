import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { SmallSidebar, BigSidebar, NavBar } from '../components';
import { useState, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import {toast} from "react-toastify";

export const loader = async () => {
    try {
      const {data } = await customFetch.get('/users/current-user');
        return data;
    } catch (error) {
        return redirect('/');
    }
};

const DashboardContext = createContext();



const DashboardLayout = (isDarkThemeEnabled) => {
  const {user} = useLoaderData();
  const navigate = useNavigate();

  //temp
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  //ikona tıkladığımızda dark theme olsun, tekrar tıkladığımızda light theme olsun
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('dark-theme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = () => {
    customFetch.get('/auth/logout');
    navigate('/');
    toast('Başarıyla çıkış yaptınız.')
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className='dashboard-page'>
              <Outlet context={{user}}/>
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
