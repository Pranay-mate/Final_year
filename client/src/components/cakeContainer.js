
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProfile} from '../redux/profile/profileActions.js';

 class profiles extends Component {
    componentDidMount(){
        this.props.getProfile()
        
    }
    render() {
        const {profiles} = this.props.profiles
        return (
            <div>
                {profiles.map(u => 
                     <React.Fragment key={u.id}>
                         <h6 >{u.id}</h6>
                         <h6 >{u.title}</h6>
                         <h6 >{u.author}</h6> 
                         <h6 >{u.skill}</h6> 
                     </React.Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({profiles:state.profiles})

export default connect(mapStateToProps, {getProfile})(profiles)