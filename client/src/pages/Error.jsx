import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div className='error'>
          <img src={img} alt='not-found' />
          <h1>404</h1>
          <h2>Sayfa Bulunamadı</h2>
          <p>Aradığınız sayfayı maalesef bulamadık :(</p>
          <br />
          <Link to='/dashboard'>
            <strong>Ana sayfaya dön</strong>
          </Link>
        </div>
      </Wrapper>
    );
  }
};
export default Error;
