import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/logo1.png';
import background from '@/assets/background.png';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password); //
  };

  const styles = {
    loginContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
    },
    logo: {
      width: '100%',
      maxWidth: '1440px',
      height: '100%',
      margin: 'auto',
      alignItems: 'center',
      marginLeft: '-10px',
    },
    formBackground: {
      width: '300px',

      height: '337px',
      backgroundImage: `url(${background})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

      boxSizing: 'border-box' as 'border-box',
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '40px',
    },
    loginForm: {
      width: '100%',
      textAlign: 'center' as 'center',
    },
    formGroup: {
      marginBottom: '15px',
      textAlign: 'left' as 'left',
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as 'column',
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      textAlign: 'left' as 'left',
      width: '100%',
      fontSize: '13px',
      color: '#333333',
    },
    input: {
      width: '100%',
      height: '40px',

      fontSize: '16px',
      boxSizing: 'border-box' as 'border-box',
      color: '#333333',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '50px',
      gap: '10px',
    },
    button: {
      width: '125px',
      height: '32px',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      cursor: 'pointer',
    },
    loginButton: {
      backgroundColor: '#e6e6e6',
      color: '#fff',
    },
    registerButton: {
      backgroundColor: '#bb0c0c',
      color: '#fff',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <img id='logo' src={logo} alt='Logo' style={styles.logo} />
      <div style={styles.formBackground}>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.formGroup}>
            <label htmlFor='email' style={styles.label}>
              ユーザー名
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor='password' style={styles.label}>
              パスワード
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button
              type='button'
              style={{ ...styles.button, ...styles.loginButton }}
            >
              ログイン
            </button>
            <button
              type='button'
              style={{ ...styles.button, ...styles.registerButton }}
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
