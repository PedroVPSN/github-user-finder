import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

 class App extends Component {
   //initial state
   state = {
     users: [],
     user: {},
     loading: false,
     alert: null
   };

   // show some users
   async componentDidMount() {
     this.setState({
       loading: true
      })

     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      console.log(res.data);

    this.setState({users: res.data, loading: false});
   };

   //Get single Github user
   getUser = async(username) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
   
   }

   //Search github users
   searchUsers = async text => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false});
   };
   // clear users from state
   clearUsers = () => this.setState({
    users: [],
    loading: false
   })

   //set alert
   setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})

    setTimeout(() => this.setState({alert: null}), 3000)
   }

  render() {
    const {users, loading, user} = this.state;
    return (
      <Router>
      <div className='App'>
        <Navbar title="GitHub User Finder" icon="fab fa-github"/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert}/>
                <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading}/>
            )} />
          </Switch>
          
        </div>
      </div>
      </Router>
    );
  };
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