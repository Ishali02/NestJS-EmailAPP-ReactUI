import React from 'react';
import './App.css';
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import Protected from "./components/proetected";


class App extends React.Component{

  state = { isRegister : false , isHome:'', message:'', showMsg:false};

  onLoginSubmit = (data) => {
    this.setState({isHome:data});
    if(!this.state.isHome){
      this.setState({message:'Invalid Credentials'});
      this.setState({showMsg:true});
    }
    else{
      this.setState({showMsg:false});
    }

  }


  handleRegister = (ip) =>{
    this.setState({isRegister:ip});
    console.log(this.state.isRegister);
    return <Redirect to='/register' />;
  };
  onRegisterSubmit = (data) => {
    this.setState({message:data});
    console.log(this.state.message);
    this.setState({showMsg:true});
  }

  render() {
    return (

        <div className='ui container'>
          <Router>
            <div>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/reg">Register</Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/home">
                  <Protected comp={Home}
                  ></Protected>
                </Route>
                <Route path="/reg">
                  <Register onLoginOrSignIn = {this.handleRegister}
                            onSubmit = {this.onRegisterSubmit}
                  ></Register>
                </Route>
                <Route path="/">
                  <Login onLoginOrSignIn = {this.handleRegister}
                         showHome = {this.onLoginSubmit}
                  ></Login>
                </Route>
                <Route path="/home">
                  <Protected comp={Home}/>
                </Route>
              </Switch>
            </div>
            {!this.state.isRegister  ?  <Redirect to= '/'></Redirect>:<Redirect to= '/reg'></Redirect>}
          </Router>
          {this.state.showMsg ?
              <div className='two fields'>
                <div className=" field" style={{marginTop:'10px', width:'50%'}}>
                  <div className='ui yellow message '>
                    <i className="icon play"></i>
                    {this.state.message}
                  </div>

                </div>
              </div>: ''
          }
        </div>

    );
  }
}

export default App;
