import React, { Component } from 'react'
import moment from 'moment'

import BaseWidget from './BaseWidget'
import Setting from './Setting'
import './ClockWidget.css'

class ClockWidget extends BaseWidget {
  constructor(props){
    super(props)
    this.state.mainContainerClasses.push('--mm-clock-widget')
    this.state.widgetName = "Clock"
    this.state.placement.width = 30
    this.state.placement.height = 8
    this.state.time =  moment()
    this.state.previousTime = undefined;

    this.startTimer = this.startTimer.bind(this)
  }

  static widgetName = 'Clock'

  componentDidMount(){
    super.componentDidMount();
    this.startTimer()
  }

  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.timeout = undefined;
  }

  startTimer(){
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this.startTimer, 10)
    let time = moment();
    let previousTime = this.state.previousTime;
    if(
      this.state.time.seconds() !== time.seconds()
        || this.state.time.minutes() !== time.minutes()
        || this.state.time.hours() !== time.hours()
    ) this.setState({time, previousTime})

  }

  // onSettingChange(event){
  //
  // }

  initSettings(){
    return {
      // location: {
      //     type: Setting,
      //     value: 'Mannheim',
      //     options:{
      //       type:'text',
      //       label: 'Location',
      //       visible:true
      //     }
      //   }
    }
  }

  renderContent() {
    return (
      <div className='clock-wrapper'>
        <span>{this.state.time.format('HH')}</span>
        <span>:</span>
        <span>{this.state.time.format('mm')}</span>
        <span>:</span>
        <span>{this.state.time.format('ss')}</span>
      </div>
    )
  }
}


export default ClockWidget;
