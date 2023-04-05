//install react router dom : npm i react-router-dom -S
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';

import EditPost from './EditPost';

import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

// dataContext
// import { DataProvider } from './context/DataContext';

import {Route, Routes} from 'react-router-dom';

//// now everything is in the Data Context file ////

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');


  useEffect(() => {
      setPosts(data);
  }, [data, setPosts])

  return (
    <div className="App">
      <Header title="React Js Blog "/>
      {/* <DataProvider> */}
        <Nav/>
        <Routes>
          <Route exact path='/' element={<Home isLoading={isLoading} fetchError={fetchError}/>}/>
          <Route exact path='/post' element={<NewPost/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
          <Route path='/post/:id' element={<PostPage/>} />
          <Route path='/about' Component={About}/>
          <Route path="*" Component={Missing}/>
        </Routes>
      {/* </DataProvider> */}
      <Footer/>
      
    </div>
  );
}

export default App;
