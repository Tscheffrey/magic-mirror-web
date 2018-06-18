import React, { Component } from 'react'

import './Setting.css'

class Setting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dirtyValue: this.props.value
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event){
    this.setState({dirtyValue: event.target.value})

    let args = {
      value:event.target.value,
      key:this.props.id
    }
    if(this.props.onChange) this.props.onChange(args)
  }

  handleBlur(event){
    //console.log('blur',event);
    // let args = {
    //   value:event.target.value,
    //   key:this.props.id
    // }
    // if(this.props.onChange) this.props.onChange(args);
  }

  renderInput(){
    let result = ''
    switch (this.props.type) {
      case 'text':
        result = (<input type='text' placeholder={this.props.label} onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.dirtyValue}></input>)
        break
      case 'toggle':
        result = (<button>{this.state.dirtyValue}</button>)
        break
      default:

    }
    return result
  }

  renderAnnotation(){
    if(this.props.annotation){
      return(
        <small>{this.props.annotation}</small>
      )
    }

  }

  render(){
    return(
      <div className='--mm-setting'>
        <label>{this.props.label}</label>
        {this.renderInput()}
        {this.renderAnnotation()}
      </div>
    )
  }

}

export default Setting
