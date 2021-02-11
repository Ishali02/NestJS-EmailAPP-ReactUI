import React from 'react';
import {Redirect} from 'react-router-dom'

class Protected extends React.Component {
    //console.log(props.comp);


    render() {
        const auth = localStorage.getItem('accessToken');

        return <div>
            {auth?< this.props.comp/>: <Redirect to='/'/>}
        </div>
    }

}

export default Protected;