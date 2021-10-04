import { FaHome, FaBook } from 'react-icons/fa';
export const RouterPath = [
  {
    path: '',
    pathname:'/',
    name: 'Home',
    icon: <FaHome />,
  },
  {
    path: 'story',
    pathname:'/story',
    name: 'Our Story',
    icon: <FaBook />
  },
  {
    path: 'kinh-nghiem',
    pathname:'/story/kinh-nghiem',
    name: 'Kinh Nghiệm',
  },
  {
    path: 'chia-se',
    pathname:'/story/chia-se',
    name: 'Chia Sẻ',
  },
  {
    path: 'for-english',
    pathname: '/for-english',
    name: 'For English',
  },
  {
    path: 'about-us',
    pathname: '/about-us',
    name: 'About Us',
  },
  {
    path: 'project-program',
    pathname: '/project-program',
    name: 'Project/Programs',
  },
  {
    path: 'contact',
    pathname: '/contact',
    name: 'Contact',
  },
];
