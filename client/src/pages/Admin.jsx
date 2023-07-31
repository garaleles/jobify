import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import {StatItem} from '../components';

export const loader = async () => {
    try {
        const response = await customFetch.get('/users/admin/app-stats');
        return response.data;
    } catch (error) {
        toast.error('Bu sayfa için tetkiniz yok!');
        return redirect('/dashboard');
    }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
        <StatItem
            count={users}
            title='kullanıcılar'
            icon={<FaSuitcaseRolling />}
            color='#e9b949'
            bcg='#fcefc7'
        />
        <StatItem
            count={jobs}
            title='toplam işler'
            icon={<FaCalendarCheck />}
            color='#647acb'
            bcg='#e0e8f9'
        />

    </Wrapper>
  );
};

export default Admin;
