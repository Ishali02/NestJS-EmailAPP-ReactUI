import React from 'react';
import api from '../api/api-config';
import {Redirect} from "react-router-dom";
class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state ={isReg : null, username:'', password:'', message:'', authToken:''};
    }

     onRegister = async (e) =>{
        e.preventDefault();
        await this.setState({isReg:true});
        console.log('this.state.isRegister' + this.state.isReg);

        this.props.onLoginOrSignIn(this.state.isReg);


    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        await api({
            method: 'post',
            url: '/auth/signin',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(response=>{
            console.log(`response ${JSON.stringify(response.data.accessToken)}`);
            const access = JSON.stringify(response.data.accessToken);
            localStorage.setItem('accessToken',access);
            this.props.showHome(access);
            this.setState({message:'Successfully LoggedIn', authToken:access});

        }).catch(err => {
            console.log(err);
            localStorage.removeItem("accessToken");
            this.props.showHome('');
            this.setState({message:'Invalid Credentials',authToken:''});
        });


    };

    render() {
        return (<div>
            {!this.state.authToken ?
            <div className="ui container" style={{marginTop:'10%'}}>
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="email" name="username" placeholder="Enter Email"
                                       value={this.state.username}
                                       onChange={event => this.setState({username : event.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="password" name="password" placeholder="Enter Password"
                                       value={this.state.password}
                                       onChange={event => this.setState({password:event.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="ui labeled icon button ui primary button">
                        <i className="sign-in icon"></i>
                        Login
                    </button>
                    <button  className="ui right labeled icon button" onClick={this.onRegister}>
                        <i className="right arrow icon"></i>
                        Register
                    </button>
                </form>
            </div>
                    :<Redirect to='/home'/>}
            </div>

        );
    }
}

export default Login;