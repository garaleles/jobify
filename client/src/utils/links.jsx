import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { RiAdminFill } from 'react-icons/ri';

const links = [
  {
    text: 'iş ekle',
    path: '.',
    icon: <FaWpforms />,
  },
  {
    text: 'bütün işler',
    path: 'All-jobs',
    icon: <MdQueryStats />,
  },
  {
    text: 'istatistik',
    path: 'Stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profil',
    path: 'Profile',
    icon: <ImProfile />,
  },
  {
    text: 'admin',
    path: 'Admin',
    icon: <RiAdminFill />,
  },
];

export default links;
