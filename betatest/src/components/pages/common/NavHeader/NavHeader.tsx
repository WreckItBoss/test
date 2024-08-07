import { FlexBox } from '@/components/common';
import { useNavigate } from 'react-router-dom';
import styles from './NavHeader.module.scss';
import logo from '@/assets/whiteIcon.svg';

const NavHeader = () => {
  const navigate = useNavigate();

  return (
    <FlexBox
      alignItems='center'
      justifyContent='center'
      className={styles.headerContainer}
    >
      <FlexBox className={styles.headerContainerInner}>
        <img src={logo} alt='logo' width={155} />
      </FlexBox>
      <button onClick={() => navigate('/login')} className={styles.loginButton}>
        ログイン
      </button>
    </FlexBox>
  );
};
export default NavHeader;
