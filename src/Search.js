import React, { Component } from 'react';
export default class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            value: '',
        }
    }
    handleChange = (event) => {
        let val = event.target.value;
        this.setState((state)=>{
            return{
                value: val
            }
        }, () => {
            this.props.onSearch(this.state.value)
        })
    }
    handleClick = (event) => {
      let val = event.target.value
      val = '';
      this.setState((state)=>{
        return{
            value: val
        }
      }, () => {
          this.props.onSearch(this.state.value)
      })
    }
    render(){
        return (
          <div className="search__container">
            <button className="search__erase" onClick={this.handleClick}/>
            <input
              className="search__input"
              placeholder="Search"
              value={this.state.value}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </div>
          )
    }
}