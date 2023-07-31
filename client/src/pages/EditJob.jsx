import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constans.js';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.respoonse?.data?.msg || error.message);
    return redirect('/dashboard/all-jobs');
  }
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`jobs/${params.id}`, data);
    toast.success('İş İlanı Başarıyla Düzenlendi');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Bir hata oluştu.');
    return redirect('/dashboard/all-jobs');
  }
};

const EditJob = () => {
  const { job } = useLoaderData();


  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>İş İlanı Düzenle</h4>
        <div className='form-center'>
          <FormRow
            type={'text'}
            name={'position'}
            labelText={'Pozisyon'}
            defaultValue={job.position}
          />
          <FormRow
            type={'text'}
            name={'company'}
            labelText={'Firma'}
            defaultValue={job.company}
          />
          <FormRow
            type={'text'}
            name={'jobLocation'}
            labelText={'Lokasyon'}
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name={'jobStatus'}
            labelText={'İş Durumu'}
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name={'jobType'}
            labelText={'İş Tipi'}
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />

          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
