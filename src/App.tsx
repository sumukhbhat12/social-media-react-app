import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navibar } from './components/navbar';
import { Login } from './pages/login';
import { Main } from './pages/main/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CreatePost } from './pages/create-post/createpost';
import background from "./resources/SocialMediaBackground.png";
import { Profile } from './pages/profile';

const styles = {
  header: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },

  content: {
    // height: '100%',
    // width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
}

function App() {
  return (
    <div style={styles.header}>
      <div style={styles.content}>
        <div className="App" >
          <Router>
            <Navibar/>
            <Routes>
              <Route path='/' element={ <Login /> } />
              <Route path='/main' element={<Main /> } />
              {/* <Route path='/login' element={ <Login /> } /> */}
              <Route path='/createpost' element={ <CreatePost /> } />
              <Route path='/profile' element={ <Profile /> } />
              <Route path='*' element={ <h3 className='text-center'>Error 404, Page Not Found!</h3> } />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
