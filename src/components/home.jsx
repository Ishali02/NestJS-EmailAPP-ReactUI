import React from 'react';
import api from '../api/api-config';
class Home extends React.Component {
    state= {items:[], sw:[] , itTeam:[], softwareTeam:[]};
    async componentDidMount() {
        const auth = localStorage.getItem('accessToken');
        console.log(JSON.parse(auth));
        await api({
            method: 'get',
            url: '/request/data',
            headers: {'Authorization': `Bearer ${JSON.parse(auth)}`},

        }).then(async response=>{
             console.log(`response ${JSON.stringify(response.data)}`);
            await this.setState({items:response.data[1]});
            await this.setState({sw:response.data[4]});
            await this.setState({itTeam:response.data[2]});
            await this.setState({softwareTeam:response.data[3]});
            console.log(this.state.items);
        }).catch(async (err) => {
            console.log(`msg ${JSON.stringify(err.message)}`);

        });

    }
    populateManagerDD =() =>{
        let item =[];
        const data = this.state.items;
        for (let i = 0; i < this.state.items.length; i++) {
            console.log(`i ${JSON.stringify(data[i].user_id)}`);
            item.push(<option key={data[i].user_id} value={data[i].user_fullName}>{data[i].user_fullName}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return item;
    };
    populateSoftwareDD =() =>{
        let item =[];
        const data = this.state.sw;

        for (let i = 0; i < this.state.sw.length; i++) {
            console.log(`i ${JSON.stringify(data[i].user_id)}`);
            item.push(<option key={data[i].id} value={data[i].swName}>{data[i].swName}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return item;
    };

    populateItTeamDD =() =>{
        let item =[];
        const data = this.state.itTeam;

        for (let i = 0; i < this.state.itTeam.length; i++) {
            console.log(`i ${JSON.stringify(data[i].user_id)}`);
            item.push(<option key={data[i].user_id} value={data[i].user_fullName}>{data[i].user_fullName}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return item;
    };
    populateSoftwareTeamDD =() =>{
        let item =[];
        const data = this.state.softwareTeam;

        for (let i = 0; i < this.state.softwareTeam.length; i++) {
            console.log(`i ${JSON.stringify(data[i].user_id)}`);
            item.push(<option key={data[i].user_id} value={data[i].user_fullName}>{data[i].user_fullName}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return item;
    };

    onDropdownSelected=(e) =>{
        console.log("THE VAL", e.target.value);
        //here you will see the current selected value of the select input
    };
    render() {
        return (
            <div className = 'ui container' style={{marginTop:'40px'}}>
                <form className="ui form">
                    <h4 className="ui dividing header">Raise Request</h4>
                    <div className="two fields">
                        <div className="field">
                            <label>Software</label>
                            <select className="ui search dropdown" onChange={this.onDropdownSelected}>
                                {this.populateSoftwareDD()}</select>
                        </div>
                        <div className="field">
                            <label>Manager</label>
                            <select className="ui search dropdown" onChange={this.onDropdownSelected}>
                                {this.populateManagerDD()}</select>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>IT Team</label>
                            <select className="ui search dropdown" onChange={this.onDropdownSelected}>
                                {this.populateItTeamDD()}
                            </select>
                        </div>
                        <div className="field">
                            <label>Software</label>
                            <select className="ui search dropdown" onChange={this.onDropdownSelected}>
                                {this.populateSoftwareTeamDD()}
                            </select>
                        </div>

                    </div>
                    <button type='submit' className="ui labeled icon button ui primary button">
                        <i className="save icon"></i>
                        Submit
                    </button>
                </form>

            </div>
        );
    }
}

export default Home;
