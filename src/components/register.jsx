import React from 'react';
import api from '../api/api-config';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state ={isReg : null, username:'', password:'', fullName:'', message:''};
    }

    onRegister = async (e) =>{
        e.preventDefault();
        await this.setState({isReg:false});
        console.log('this.state.isRegister' + this.state.isReg);
        this.props.onLoginOrSignIn(this.state.isReg);

    };
    onFormSubmit = async (e) =>{
        e.preventDefault();
        await api({
            method: 'post',
            url: '/auth/signup',
            headers: {"Content-Type": "application/json"},
            data: {
                username: this.state.username,
                password: this.state.password,
                fullName: this.state.fullName
            }
        }).then(response=>{
            console.log(`response ${JSON.stringify(response)}`);
            this.setState({message:'Check Your Email for Verification'});
            this.props.onSubmit(this.state.message);
        }).catch(async (err) => {
            console.log(`msg ${JSON.stringify(err.message)}`);
            if(JSON.stringify(err.message.includes('409')))
            {
                this.setState({message:'Email already exists'});
                console.log(`message ${this.state.message}` );
            }
            this.props.onSubmit(this.state.message);
        });
    };

    render() {
        return(
            <div className="ui container" style={{marginTop:'15%'}}>
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="field">
                        <label>FullName</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="text" name="fullName" placeholder="Enter FullName"
                                       value={this.state.fullName} required
                                       onChange={event => this.setState({fullName : event.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Username</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="email" name="username" placeholder="Enter Email"
                                       value={this.state.username} required
                                       onChange={event => this.setState({username : event.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="password" name="password" placeholder="Enter Password"
                                       value={this.state.password} required
                                       onChange={event => this.setState({password:event.target.value})}/>
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="ui labeled icon button ui primary button">
                        <i className="sign-in icon"></i>
                        Register
                    </button>
                    <button  className="ui right labeled icon button" onClick={this.onRegister}>
                        <i className="right arrow icon"></i>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;