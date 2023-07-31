import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {Logo, FormRow, SubmitBtn} from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg || error);
    return redirect('/register');
  }
};

const Register = () => {

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Kayıt Ol</h4>
        <FormRow type='text' labelText='Ad' name='name' />
        <FormRow type='text' labelText='Soyad' name='lastName' />
        <FormRow type='text' labelText='Lokasyon' name='location' />
        <FormRow type='email' labelText='E-posta' name='email' />
        <FormRow type='password' labelText='Şifre' name='password' />
        <SubmitBtn formBtn/>
        <p className='form-text'>
          Zaten bir hesabın var mı?{' '}
          <Link to='/login' className='member-btn'>
            Giriş Yap
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
