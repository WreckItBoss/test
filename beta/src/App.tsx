import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import { TopPage } from './pages/top';
import { LoginPage } from './pages/login';
import SignupPage from './pages/signup/SignupPage';
import { ScorePage } from './pages/score';
import { FormPage } from './pages/form';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<TopPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/form' element={<FormPage />} />
          <Route path='/score' element={<ScorePage />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
