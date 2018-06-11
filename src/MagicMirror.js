import React, { Component } from 'react'
import './style.css'

import BaseWidget from './BaseWidget'
import WeatherWidget from './WeatherWidget'
import ClockWidget from './ClockWidget'
import WeatherChart from './WeatherChart'
import Clock1 from './Clock1'

import idGenerator from './IdGenerator'
import storageHandler from './StorageHandler'
import WidgetStore from './WidgetStore'

class MagicMirror extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editMode:false,
      editButtonVisible:false,
      availableWidgets: [
        Clock1,
        ClockWidget,
        WeatherChart,
        WeatherWidget,
      ],
      widgets: {}
    }
    this.widgetIdCounter = 10
    this.editButtonDelay = 1000

    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.addWidgetFromStore = this.addWidgetFromStore.bind(this)
    this.removeWidget = this.removeWidget.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseStandingStill = this.onMouseStandingStill.bind(this)
    this.initializeWigets()
  }

  componentDidMount(){

  }

  initializeWigets(){
    // this.addWidget({
    // type: WeatherWidget,
    // props:{
    //   widgetName: 'Widget 1'
    //   }
    // })

    // this.addWidget({
    // type: ClockWidget,
    // props:{
    //   //widgetName: 'Widget 1'
    //   }
    // })


    // this.addWidget({
    // type: WeatherChart,
    // props:{
    //   //widgetName: 'Widget 1'
    //   }
    // })

    // this.addWidget({
    // type: Clock1,
    // props: {
    //   //widgetName: 'Widget 1'
    //   }
    // })

    // this.addWidget({
    // type:WeatherWidget,
    // props:{
    //   widgetName: 'Widget 2'
    //   }
    // });

    // this.addWidget({
    // type:BaseWidget,
    // props:{
    //   widgetName: 'Widget 1'
    //   }
    // });

    // this.addWidget({
    // type:SimpleWeatherWidget,
    // props:{
    //   widgetName: 'Widget 2'
    //   }
    // });
  }

  addWidget(widget){
    let widgetList = this.state.widgets
    let id = this.generateWidgetId()
    widgetList[id] = widget
    this.setState(
      {widgets: widgetList},
      () => storageHandler.setProperty('widgets', widgetList)
    )
    return id
  }

  removeWidget(widgetId){
    let newWidgetList = this.state.widgets
    delete newWidgetList[widgetId]
    this.setState(
      {widgets: newWidgetList},
      () => storageHandler.setProperty('widgets', newWidgetList)
    )
  }

  addWidgetFromStore(widgetType){
    if(widgetType) {
      this.addWidget({
      type: widgetType,
      props: {
        //widgetName: 'Widget 1'
        }
      })
    }
  }

  toggleEditMode(e){
    if(this.state.editMode) this.unsetEditMode(e)
    else this.setEditMode(e)
  }

  setEditMode(e){
    this.setState({editMode:true})
  }

  unsetEditMode(e){
    this.setState({editMode:false})
  }

  generateWidgetId(){
    let id = this.widgetIdCounter
    this.widgetIdCounter++
    return id
  }

  onMouseMove(){
    this.setState({editButtonVisible:true})
    if(this.mouseMoveTimeout) clearTimeout(this.mouseMoveTimeout)
    this.mouseMoveTimeout = setTimeout(this.onMouseStandingStill, this.editButtonDelay)
  }

  onMouseStandingStill(){
    if(!this.state.editMode)this.setState({editButtonVisible:false})
    clearTimeout(this.mouseMoveTimeout)
  }

  renderWidgets(){
    let renderedWidgets = []
    for (let i in this.state.widgets) {
      let widget = this.state.widgets[i]
      let props = widget.props
      props.key = props.id = i
      props.canvasInEditMode = this.state.editMode
      props.onRemove = this.removeWidget
      let element = React.createElement(widget.type,props,null)
      renderedWidgets.push(element)
    }

    return renderedWidgets
  }

  render(){
    let mainContainerClasses = ['--mm-mainCanvas']
    if(this.state.editMode) mainContainerClasses.push('--mm-editMode')

    let editButtonClasses = ['--mm-editButton']
    if(!this.state.editButtonVisible) editButtonClasses.push('invisible')

    return (
      <section className={mainContainerClasses.join(' ')} onMouseMove={this.onMouseMove}>
          <button onClick={this.toggleEditMode} className={editButtonClasses.join(' ')}></button>
            {this.renderWidgets()}
          <WidgetStore visible={this.state.editMode} availableWidgets={this.state.availableWidgets} addWidget={this.addWidgetFromStore}/>
      </section>
    )
  }

}


export default MagicMirror
