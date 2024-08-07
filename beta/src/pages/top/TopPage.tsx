import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TopPage.module.scss';

const TopPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/login')}>Log in</button>
      <Link to='/login'>
        <p>管理者はこちら</p>
      </Link>
    </div>
  );
};

export default TopPage;
