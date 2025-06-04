// npm installs
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

// project imports
import Auth        from './components/Auth/Auth';
import Home        from './components/Home/Home';
import Navbar      from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';


/** ----------------------------------------------------------------------------------------
* 
* @returns Main Component of web app
* ----------------------------------------------------------------------------------------*/
function App() {
  
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth='xl' sx={{mb:4}}>
        <Navbar />
          <Routes>
            <Route path='/'             element       = { <Navigate replace to='/posts'/>                    } />
            <Route path='/posts'        element       = { <Home/>                                            }  />
            <Route path='/posts/search' exact element = { <Home/>                                            } />
            <Route path='/posts/:id'    element       = { <PostDetails/>                                     } />
            <Route path='/auth'         element       = { (!user ? <Auth/> : <Navigate replace to='/posts'/>)} />
          </Routes>
      </Container> 
    </Router>
      
  );
}

export default App;