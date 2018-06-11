import React, { Component } from 'react'
//import interact from 'interactjs'

import BaseWidget from './BaseWidget'
import Setting from '../Setting'
import './WeatherWidget.css'

import icon from '../img/weather-widget-logo.svg'

class WeatherWidget extends BaseWidget {
  constructor(props){
    super(props)
    this.state.url = 'http://api.openweathermap.org/data/2.5/weather'
    this.state.mainContainerClasses.push('--mm-weather-widget')
    this.state.widgetName = "Weather Widget"
    this.state.placement.width = 30
    this.state.placement.height = 20
    this.requestState = 'none'
    this.refreshRate = 10 * 60 * 1000
    this.fetchData = this.fetchData.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  static icon = icon
  static widgetName = 'Temperature'

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
    let url = this.state.url + '?'  + 'q=' + this.state.settings.location.value + '&units=metric' + '&appid=' + this.state.settings.apiKey.value
    let self = this;
    let result = fetch(url)
    .then(function(response){
      if(!response.ok) throw response
      return response.json()
    })
    .then(function(json){
      let newState = self.state
      newState.response = json
      newState.settings.location.options.annotation = null
      //newState.settings.location.value = json.name
      self.setState(newState)
    })
    .catch(function(err){
      let newState = self.state
      newState.settings.location.options.annotation = 'not found!'
      newState.response = null
      self.setState(newState)
    })
  }

  onSettingChange(event){
    super.onSettingChange(event)
    this.startTimer()
  }

  initSettings(){
    return {
      location: {
          type: Setting,
          value: 'Mannheim',
          options:{
            type:'text',
            label: 'Location',
            visible:true
          }
        },
      apiKey: {
          type: Setting,
          value: '97070e55b18a4f2a81c27096a007f084',
          options:{
            type:'text',
            visible: false,
            label:'API key'
          }
        }
    }
  }

  renderContent() {
    let temperature = !!this.state.response ? Math.round(this.state.response.main.temp) + '°' : '';
    let location = !!this.state.response ? this.state.response.name + ', ' +  this.state.response.sys.country : this.state.settings.location.value;

    let locationTag
    if(location) locationTag = <span className="location">{location}</span>

    return (
      <div>
        <span className="temperature">{temperature}</span>
        {locationTag}
      </div>
    )
  }
}


export default WeatherWidget;
