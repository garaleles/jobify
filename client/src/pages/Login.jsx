import {
  Link,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Başarıyla giriş yaptınız.');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Bir hata oluştu.');
    return error;
  }
};
const Login = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    try {
      await customFetch.post('/auth/login', {
        email: 'test@test.com',
        password: 'secret123',
      });
      toast.success('Başarıyla giriş yaptınız. Uygulamayı test edebilirsiniz.');
      return navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Bir hata oluştu.');
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Giriş Yap</h4>
        <FormRow type='email' labelText='E-posta' name='email' />
        <FormRow type='password' labelText='Şifre' name='password' />
        <SubmitBtn formBtn />
        {/* <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          Demo Kulanıcı Olarak Giriş Yap
        </button> */}
        <p className='form-text'>
          Henüz üye değil misiniz?{' '}
          <Link to='/register' className='member-btn'>
            Kayıt Ol
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
