import {FormRow, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext, redirect } from 'react-router-dom';
import { Form} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';



export const action = async ({request}) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if(file && file.size > 500000){
    toast.error('Avatar dosyası 500kb den büyük olamaz');
    return null;
  }
  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profil başarıyla güncellendi');
    return redirect('/dashboard');

  } catch (error) {
    toast.error(error?response?.data?.msg || error.message : 'Bir hata oluştu');
    return null;
  }

};


const Profile = () => {
  const {user } = useOutletContext();
  const {name, lastName, email, location} = user;


  return (
  <Wrapper>
    <Form method="post" className='form' encType='multipart/form-data'>
      <h4 className='form-title'>
        Profil
      </h4>
      <div className='form-center'>
        <div className='form-row'>
          <label className='form-label' htmlFor='avatar'>
            Avatar
          </label>
            <input
                className='form-input'
                type='file'
                name='avatar'
                id='avatar'
                accept='image/*'
            />
        </div>
        <FormRow
           defaultValue={name}
            name='name'
            type='text'
           labelText='İsim'
        />
        <FormRow
            defaultValue={lastName}
            name='lastName'
            type='text'
            labelText='Soyisim'
        />
        <FormRow
            defaultValue={email}
            name='email'
            type='email'
            labelText='E-posta'
        />
        <FormRow
            defaultValue={location}
            name='location'
            type='text'
            labelText='Konum'
        />

        <SubmitBtn formBtn/>

      </div>
    </Form>
  </Wrapper>
    );
};
export default Profile;
