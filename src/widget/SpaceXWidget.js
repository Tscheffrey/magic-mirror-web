import React, { Component } from 'react'

import BaseWidget from './BaseWidget'
import Setting from '../Setting'
import './SpaceXWidget.css'

import UrlAssembler from 'url-assembler'
import moment from 'moment'

import icon from '../img/spacex-logo.svg'

import Config from '../Config'

class SpaceXWidget extends BaseWidget {
  constructor(props){
    super(props)
    this.state.url = 'http://api.openweathermap.org/data/2.5/weather'
    this.state.mainContainerClasses.push('spacex-widget')
    this.state.placement.width = 35
    this.state.placement.height = 50
    this.requestState = 'none'
    this.refreshRate = 10 * 60 * 1000
    this.fetchData = this.fetchData.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.url = UrlAssembler('https://api.spacexdata.com').segment('/v2').segment('/launches').segment('/upcoming')
  }

  static icon = icon
  static widgetName = 'SpaceX'

  componentDidMount(){
    super.componentDidMount()
    this.startTimer()
  }

  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout)
    }
    this.timeout = undefined
  }

  startTimer(){
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this.startTimer, this.refreshRate)
    this.fetchData()
  }

  fetchData(){
    let url = this.url.toString()
    let self = this
    let result = fetch(url)
    .then(function(response){
      if(!response.ok) throw response
      return response.json()
    })
    .then(function(json){
      let newState = self.state
      newState.response = json
      self.setState(newState)
    })
    .catch(function(err){
      let newState = self.state
      newState.response = null
      self.setState(newState)
    })
  }

  onSettingChange(event){
    super.onSettingChange(event)
    this.startTimer()
  }

  initSettings(){

  }

  formatDate(unixDate){
    return moment(unixDate).fromNow()
  }

  renderContent() {
    let launchesList = 'loading...'
    if(this.state.response){
      if(this.state.response.length > 0){
        launchesList = (
          <ul  className="launches-list">
            {this.state.response.map((launch) => (
              <li className="launch" key={launch.flight_number}>
                <span className='name'>🚀 {launch.mission_name}</span>
                <span className="metadata">
                  <span className='date'>{this.formatDate(launch.launch_date_utc)}</span>
                  <span className='site'>from {launch.launch_site.site_name}</span>
                </span>
              </li>
            ))}
          </ul>
        )
      }
      else launchesList = 'currently no SpaceX launches in sight'
    }


    return (
      <div>
        <h2>SpaceX Launches</h2>
        {launchesList}
      </div>
    )
  }
}


export default SpaceXWidget;
