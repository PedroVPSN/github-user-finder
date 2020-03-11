import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

    state = {
        text: ""
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    // this function will search the user and clear the field after submit
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === "") {
            this.props.setAlert("Please entrer the user name", "light");
        }
        else{
        this.props.searchUsers(this.state.text); // search the users
        this.setState({text:""}); //clear the form after submit
        }
        
    };

    render() {
        const {showClear, clearUsers} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                </form>
                {showClear && (
                    <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                )}
            </div>
        )
    };
};
export default Search