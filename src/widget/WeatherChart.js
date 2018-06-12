import React, { Component } from 'react'
import moment from 'moment'

import BaseWidget from './BaseWidget'
import Setting from '../Setting'
import { Bar,  BarChart, LineChart, ComposedChart, Legend, CartesianGrid, CartesianAxis, Line, ReferenceLine, ResponsiveContainer, XAxis, AreaChart, Area, YAxis, Label, LabelList } from 'recharts'
import './WeatherChart.css'

import icon from '../img/weather-chart-logo.svg'

class WeatherChart extends BaseWidget {
  constructor(props){
    super(props)

    this.state.url = 'http://api.openweathermap.org/data/2.5/forecast/daily'
    this.state.mainContainerClasses.push('--mm-weather-chart')
    this.state.placement.width = 60
    this.state.placement.height = 40
    this.state.days = 6
    this.requestState = 'none'
    this.refreshRate = 10 * 60 * 1000
    this.fetchData = this.fetchData.bind(this)
    this.startTimer = this.startTimer.bind(this)

  }

  static icon = icon
  static widgetName = 'Weather Chart'

  componentDidMount(){
    super.componentDidMount();
    this.startTimer();
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

  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.timeout = undefined;
  }

  startTimer(){
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this.startTimer, this.refreshRate)
    this.fetchData()
  }

  fetchData(){
    let url = this.state.url + '?'  + 'q=' + this.state.settings.location.value + '&units=metric&cnt=' + this.state.days + '&appid=' + this.state.settings.apiKey.value
    let self = this;
    let result = fetch(url)
    .then(function(response){
      if(!response.ok) throw response
      return response.json()
    })
    .then(function(json){
      let newState = self.state
      newState.response = self.processResponse(json)
      newState.settings.location.options.annotation = null
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

  processResponse(response){
    for (var i in response.list) {
      let date = moment().add(i, 'days').utc().format();
      response.list[i].date = date;
    }

    return response
  }

  formatTemperature(val){
    if(val) return Math.round(val).toString() + '°'
  }

  formatPrecipation(val){
    if(val) return Math.round(val).toString() + 'mm'
  }

  formatDay(val){
    if(val) return moment.utc(val).calendar(null, {
        sameDay: '[now]',
        nextDay: 'dd',
        nextWeek: 'dd'
    });
  }

              //<LabelList dataKey="rain" position="top" formatter={this.formatPrecipation}/>
              // <Bar dataKey="rain" barSize={20} fill="red" />
              // <Bar dataKey="snow" barSize={20} fill="lightblue" />

  renderChart(){

    if(!!this.state.response) {
      let data = this.state.response.list
      return (
        <span>
          <span className="loadingPlaceholder invisible">
            loading..
          </span>

          <span className='contentContainer'>
          <ResponsiveContainer height="80%">
            <ComposedChart data={data} fill="white" margin={{ top: 20, right: 20, bottom: 0, left: 20 }}>

              <XAxis dataKey="date" hide={true} tickFormatter={this.formatDay} stroke="rgba(255,255,255,0.6)" strokeWidth="0"/>
              <YAxis yAxisId="temp" domain={['dataMin - 2', 'dataMax + 2']} allowDecimals={false} hide={true} />

              <Line yAxisId="temp" type="monotoneX" name="Day" strokeWidth="2.5" strokeLinecap="round" isAnimationActive={false} type="monotone" dot={false} dataKey="temp.day" stroke="yellow">
                <LabelList dataKey="temp.day" position="insideBottom" offset={12} formatter={this.formatTemperature}/>
              </Line>



              <Line yAxisId="temp"  type="monotoneX" name="Night" strokeWidth="2.5" strokeLinecap="round" isAnimationActive={false} type="monotone" dot={false} dataKey="temp.night" stroke="lightblue">
                <LabelList dataKey="temp.night" position="insideTop" offset={12} formatter={this.formatTemperature}/>
              </Line>
            </ComposedChart>
          </ResponsiveContainer>

          <ResponsiveContainer height="20%">
            <ComposedChart data={data} fill="white" margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="date"  tickFormatter={this.formatDay} stroke="rgba(255,255,255,0.8)" strokeWidth="0"/>

              <Bar stackId="a" isAnimationActive={false} dataKey="rain" barSize={40} fill="lightblue" />
              <Bar stackId="a" isAnimationActive={false} dataKey="snow" barSize={40} fill="white" />
            </ComposedChart>
          </ResponsiveContainer>
          </span>
        </span>
      )
    }

    else return (
      <span>
        <span className="loadingPlaceholder">
          loading..
        </span>
        <span className='contentContainer invisible'>
        </span>
      </span>
    )

  }

  renderContent() {
    return this.renderChart();
  }
}


export default WeatherChart;
