import React, { Component } from 'react'
import moment from 'moment'

import BaseWidget from './BaseWidget'
import ClockWidget from './ClockWidget'
import Setting from './Setting'
import './Clock1.css'

import icon from './img/clock-widget-logo.svg'

class Clock1 extends ClockWidget {
  constructor(props){
    super(props)
    this.state.mainContainerClasses.push('--mm-clock1')
    this.state.placement.width = this.state.placement.height = 30

    this.clockAngles = {}
    this.clockAngles.seconds
    this.clockAngles.minutes
    this.clockAngles.hours

    // revolutions counter to prevent handle from going backwards once clock comes over 12
    this.revolutions = {}
    this.revolutions.seconds = 0
    this.revolutions.minutes = 0
    this.revolutions.hours = 0

    this.calculateClockAngles()
  }

  static icon = icon
  static widgetName = 'Analogue Clock'

  componentDidMount(){
    super.componentDidMount()
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState)
    if(prevState.time.seconds() > this.state.time.seconds()) this.revolutions.seconds++;
    if(prevState.time.minutes() > this.state.time.minutes()) this.revolutions.minutes++;
    //if(parseInt(prevState.time.format('h')) > parseInt(this.state.time.format('h'))) this.revolutions.hours++;

    this.calculateClockAngles();

  }


  calculateClockAngles(){
    this.clockAngles.seconds = 360 * ( this.revolutions.seconds + (this.state.time.seconds() / 60))
    this.clockAngles.minutes = 360 * ( this.revolutions.minutes + (this.state.time.minutes() / 60))

    let exactHoursOfDay = parseInt(this.state.time.format('h')) + (this.state.time.minutes() / 60)  + (this.state.time.seconds() / 3600)
    this.clockAngles.hours = 360 * ( exactHoursOfDay / 12)

  }

  renderContent() {
    let secondsStyle = {transform: 'rotate(' + this.clockAngles.seconds +'deg)'}
    let minutesStyle = {transform: 'rotate(' + this.clockAngles.minutes +'deg)'}
    let hoursStyle = {transform: 'rotate(' + this.clockAngles.hours +'deg)'}

    return (
      <div className='clock-wrapper'>
        <svg xmlns="http://www.w3.org/2000/svg" width="177.342" height="177.342" viewBox="0 0 177.34188 177.34188">
          <circle cx="88.671" cy="88.671" r="88.671" fill="#fff" />
          <path d="M76.99369,11.17387h5.90039v16.2373H80.29252V13.61235H76.99369Z"
          />
          <path d="M93.78862,17.51567a3.24341,3.24341,0,0,0,.69726-1.92871,2.17507,2.17507,0,0,0-.74316-1.66016,2.66926,2.66926,0,0,0-1.88184-.68555,3.88277,3.88277,0,0,0-3.32226,2.04395l-2.20606-1.27735a8.08729,8.08729,0,0,1,2.35742-2.416,6.13753,6.13753,0,0,1,3.32227-.81348,5.37043,5.37043,0,0,1,3.56543,1.29,4.35281,4.35281,0,0,1,1.5332,3.51856,4.74784,4.74784,0,0,1-.65039,2.39257,16.10189,16.10189,0,0,1-2.39258,2.92774l-3.80957,3.8789h7.36328v2.625H86.51811V25.08793l4.9248-4.94726A26.12937,26.12937,0,0,0,93.78862,17.51567Z"
          />
          <path d="M47.09037,145.9102v-4.66895H58.52006v2.43848l-6.877,13.79883H48.62358l6.71386-13.752H49.57573v2.1836Z"
          />
          <path d="M23.24467,116.34574A6.10049,6.10049,0,0,1,27.148,115.1143a6.09953,6.09953,0,0,1,3.90234,1.23144,3.79944,3.79944,0,0,1,1.55665,3.10157,4.22274,4.22274,0,0,1-1.74219,3.30957,4.68976,4.68976,0,0,1,2.3457,4.18164,4.42157,4.42157,0,0,1-1.67187,3.50781,6.5641,6.5641,0,0,1-4.39063,1.417,6.56228,6.56228,0,0,1-4.39062-1.417,4.41957,4.41957,0,0,1-1.67286-3.50781,4.68869,4.68869,0,0,1,2.34668-4.18164,4.21986,4.21986,0,0,1-1.74218-3.30957A3.79847,3.79847,0,0,1,23.24467,116.34574Zm1.627,12.4629a4.12217,4.12217,0,0,0,4.55274,0,2.198,2.198,0,0,0,1.06836-1.9629,2.25124,2.25124,0,0,0-1.02246-1.9746,4.21743,4.21743,0,0,0-4.64551,0,2.25124,2.25124,0,0,0-1.02246,1.9746A2.19689,2.19689,0,0,0,24.87162,128.80864Zm.22071-7.38672a3.33828,3.33828,0,0,0,4.11132,0,2.16707,2.16707,0,0,0,.8711-1.74317,2.13451,2.13451,0,0,0-.8711-1.73047,3.38261,3.38261,0,0,0-4.11132,0,2.1355,2.1355,0,0,0-.87207,1.73047A2.16806,2.16806,0,0,0,25.09233,121.42192Z"
          />
          <path d="M44.41948,20.00981h5.90039v16.2373H47.71733V22.44828H44.41948Z"
          />
          <path d="M53.27006,20.00981h5.90039v16.2373H56.56791V22.44828H53.27006Z"
          />
          <path d="M15.40483,46.1641h5.90039V62.40239H18.70365V48.60356H15.40483Z"
          />
          <path d="M26.60209,60.29985a10.249,10.249,0,0,1-1.64941-6.1211,10.24894,10.24894,0,0,1,1.64941-6.12109,5.723,5.723,0,0,1,4.97071-2.28809,5.726,5.726,0,0,1,4.97168,2.28809,10.25583,10.25583,0,0,1,1.64941,6.12109,10.25584,10.25584,0,0,1-1.64941,6.1211,5.726,5.726,0,0,1-4.97168,2.28808A5.723,5.723,0,0,1,26.60209,60.29985ZM28.565,49.78813a8.73367,8.73367,0,0,0-.96386,4.39062,8.73623,8.73623,0,0,0,.96386,4.39063,3.22784,3.22784,0,0,0,3.00782,1.67187,3.18215,3.18215,0,0,0,2.98535-1.66015,8.91293,8.91293,0,0,0,.94043-4.40235,8.91287,8.91287,0,0,0-.94043-4.40234,3.18463,3.18463,0,0,0-2.98535-1.66113A3.22861,3.22861,0,0,0,28.565,49.78813Z"
          />
          <path d="M119.18022,20.00981h5.90039v16.2373h-2.60254V22.44828h-3.29785Z"
          />
          <path d="M150.86283,51.44535a3.24064,3.24064,0,0,0,.69727-1.92773,2.1751,2.1751,0,0,0-.74316-1.66016,2.66925,2.66925,0,0,0-1.88184-.68554,3.8828,3.8828,0,0,0-3.32227,2.04394l-2.20605-1.27832a8.09866,8.09866,0,0,1,2.35742-2.416,6.14615,6.14615,0,0,1,3.32227-.8125,5.37452,5.37452,0,0,1,3.56543,1.28906,4.35476,4.35476,0,0,1,1.5332,3.51953,4.7505,4.7505,0,0,1-.65039,2.39258,16.13621,16.13621,0,0,1-2.39258,2.92773l-3.80957,3.87891h7.36328v2.625H143.59233V59.0186l4.9248-4.94825A26.01675,26.01675,0,0,0,150.86283,51.44535Z"
          />
          <path d="M150.271,125.10258v-2.97266h2.60156v2.97266h1.95215v2.48633H152.8726v4.08789H150.271v-4.08789h-6.96875v-2.416l5.96972-9.7334h2.99707l-5.87695,9.66309Z"
          />
          <path d="M127.49565,141.21781v2.48536h-6.85254v3.99609a4.76644,4.76644,0,0,1,2.32324-.55762,5.94994,5.94994,0,0,1,3.92578,1.37012,4.57925,4.57925,0,0,1,1.64844,3.7168,5.00775,5.00775,0,0,1-1.71875,3.8916,6.0929,6.0929,0,0,1-4.22754,1.54492,6.66406,6.66406,0,0,1-5.22656-2.18359l1.46386-1.99805c.123.124.29.27051.499.44141a6.46956,6.46956,0,0,0,1.28906.68457,5.2324,5.2324,0,0,0,2.1377.43066,3.49516,3.49516,0,0,0,2.11328-.69727,2.36234,2.36234,0,0,0,.95312-2.0332,2.40639,2.40639,0,0,0-1.01074-2.06738,4.252,4.252,0,0,0-2.55566-.73145,6.01338,6.01338,0,0,0-2.93848.76661l-1.16113-1.25391v-7.80567Z"
          />
          <path d="M88.608,152.29985a3.61178,3.61178,0,0,0-3.18262,1.46386,6.89112,6.89112,0,0,0-1.04492,3.94825,5.84437,5.84437,0,0,1,1.67188-1.21875,5.14325,5.14325,0,0,1,2.416-.56934,5.011,5.011,0,0,1,3.65918,1.45215,5.16524,5.16524,0,0,1,1.47461,3.85547,5.00519,5.00519,0,0,1-1.59082,3.86816,5.69137,5.69137,0,0,1-4.00683,1.46387,5.38881,5.38881,0,0,1-5.38965-3.48535,11.56621,11.56621,0,0,1-.83594-4.50586,13.93034,13.93034,0,0,1,.53418-4.18164,6.75231,6.75231,0,0,1,1.46289-2.64844,5.90361,5.90361,0,0,1,4.44922-1.90527,7.62831,7.62831,0,0,1,4.77344,1.64941l-1.3711,2.02148a5.21932,5.21932,0,0,0-1.42773-.83593A4.22088,4.22088,0,0,0,88.608,152.29985Zm-.499,6.04a3.554,3.554,0,0,0-2.34668.77832,2.49945,2.49945,0,0,0-.94043,2.0205,2.90034,2.90034,0,0,0,.90527,2.1377,3.112,3.112,0,0,0,2.27735.89355,3.3113,3.3113,0,0,0,2.27636-.80078,2.61009,2.61009,0,0,0,.90625-2.04492,2.9237,2.9237,0,0,0-3.07812-2.98437Z"
          />
          <path d="M19.06791,93.70317a3.61243,3.61243,0,0,0,3.1836-1.46387,6.904,6.904,0,0,0,1.04492-3.94824,5.83232,5.83232,0,0,1-1.67285,1.21875,5.14061,5.14061,0,0,1-2.416.56933A5.00868,5.00868,0,0,1,15.54838,88.627a5.16748,5.16748,0,0,1-1.47461-3.85546,5.0026,5.0026,0,0,1,1.5918-3.86817,5.69143,5.69143,0,0,1,4.00683-1.46387,5.39044,5.39044,0,0,1,5.38965,3.48536,11.5875,11.5875,0,0,1,.83594,4.50586,13.93038,13.93038,0,0,1-.53418,4.18164,6.7655,6.7655,0,0,1-1.46387,2.64843,5.90151,5.90151,0,0,1-4.44824,1.90528,7.62518,7.62518,0,0,1-4.77441-1.64942l1.37109-2.02148a5.17227,5.17227,0,0,0,1.42871.83594A4.22074,4.22074,0,0,0,19.06791,93.70317Zm.5-6.04a3.5514,3.5514,0,0,0,2.34571-.77832,2.4975,2.4975,0,0,0,.9414-2.02051,2.9028,2.9028,0,0,0-.90625-2.1377,3.09515,3.09515,0,0,0-2.26465-.89355,3.20475,3.20475,0,0,0-2.24121.80078,2.64726,2.64726,0,0,0-.88281,2.05566,2.982,2.982,0,0,0,.80078,2.11426A2.8682,2.8682,0,0,0,19.56791,87.66313Z"
          />
          <path d="M152.95365,82.18071V79.74223h9.501V81.879l-3.92578,4.39062a4.76545,4.76545,0,0,1,3.48438,1.40528,4.5055,4.5055,0,0,1,1.25488,3.19433,4.825,4.825,0,0,1-1.68457,3.90235,6.497,6.497,0,0,1-4.332,1.417,9.20654,9.20654,0,0,1-5.18067-1.69629l1.16114-2.20606a7.20347,7.20347,0,0,0,4.18164,1.39356,3.89368,3.89368,0,0,0,2.335-.66211,2.20543,2.20543,0,0,0,.917-1.9043,2.33825,2.33825,0,0,0-1.02149-1.98633,4.7369,4.7369,0,0,0-2.834-.74414,5.936,5.936,0,0,0-1.74219.25586V86.54789l3.7627-4.36718Z"
          />
          <g className="seconds"style={secondsStyle} fill="none" stroke="#000" strokeMiterlimit="10" >
              <line x1="88.672" y1="22.637" x2="88.672" y2="97.879" />
              <line x1="88.67" y1="22.637" x2="88.669" y2="154.705" opacity="0" />
          </g>
          <g className="minutes" style={minutesStyle} fill="none" stroke="#000" strokeMiterlimit="10"
          strokeWidth="3">
              <line x1="88.671" y1="97.795" x2="88.671" y2="22.553" />
              <line x1="88.671" y1="154.789" x2="88.671" y2="22.553" opacity="0" />
          </g>
          <g className="hours"  style={hoursStyle} fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="3">
              <line x1="88.664" y1="96.243" x2="88.664" y2="51.106" />
              <line x1="88.678" y1="126.236" x2="88.678" y2="51.121" opacity="0" />
          </g>
          <g>
              <path d="M88.67078,92.27367a3.60254,3.60254,0,1,1,3.60254-3.60254A3.60594,3.60594,0,0,1,88.67078,92.27367Z"
              fill="#fff" />
              <path d="M88.67118,86.31862a2.35233,2.35233,0,1,1-2.35233,2.35232,2.35231,2.35231,0,0,1,2.35233-2.35232m0-2.5a4.85233,4.85233,0,1,0,4.85232,4.85232,4.85784,4.85784,0,0,0-4.85232-4.85232Z"
              />
          </g>
        </svg>
      </div>
    )

  }


}


export default Clock1;
