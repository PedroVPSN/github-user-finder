import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/githubState';

import './App.css';

const App = () => {
   //initial state
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState({});
   const [repos, setRepos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [alert, setAlert] = useState(null);

   //Get single Github user
   const getUser = async(username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
   
   }

   //Get users repos
   const getUserRepos = async(username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
   }

   //Search github users
   const searchUsers = async text => {
     setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
   };
   // clear users from state
   const clearUsers = () => {
    setUsers([]);
    setLoading(false)
   };

   //set alert
   const showAlert = (msg, type) => {
    setAlert({msg, type})
    setTimeout(() => setAlert(null), 3000)
   };

  return (
    <GithubState>
    <Router>
    <div className='App'>
      <Navbar title="GitHub User Finder" icon="fab fa-github"/>
      <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
              <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert}/>
              <Users loading={loading} users={users}/>
            </Fragment>
          )}/>
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" render={props => (
            <User {...props}
            getUser={getUser}
            getUserRepos={getUserRepos}
            user={user}
            repos={repos}
            loading={loading}/>
          )} />
        </Switch>
        
      </div>
    </div>
    </Router>
    </GithubState>
  );
};
export default App;

// class App extends Component {
//   render() {
//     const name = 'Joe Doe';
//     const loading = false;
//     const showName = true;

//     return (
//       <div className='App'>
//       {/* if loading is true than show h4 'Loading...', else hello name. */}
//       {/* if loading is true than show h4 'Loading...', else hello name. 
//       If show name is true, than show name*/}
//         {loading ? <h4>Loading...</h4> : <h1>Hello {showName && name}</h1>} 
//       </div>
//     )
//   }
// }
// export default App;