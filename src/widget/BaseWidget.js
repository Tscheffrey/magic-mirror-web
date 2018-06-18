import React, { Component } from 'react'
import Interact from 'interactjs'

import Setting from '../Setting'
import icon from '../img/base-widget-logo.svg'

import Confetti from 'react-dom-confetti'


class BaseWidget extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      widgetName: this.constructor.widgetName,
      settingsViewOpen: false,
      cssWidgetPrefix: "baseWidget",
      //widgetName: "Standard Widget",
      mainContainerClasses: ['--mm-widget'],
      placement: {
        height: 20,
        width: 30,
        offsetX: 0,
        offsetY: 0,
        isBeingDragged: false
      },
      settings: this.initSettings(),
      confetti: false
    }
    this.displayConfetti = false

    this.toggleSettings = this.toggleSettings.bind(this)
    this.onSettingChange = this.onSettingChange.bind(this)
    this.remove = this.remove.bind(this)

  }

  static icon = icon
  static widgetName = 'Widget'

  componentWillReceiveProps(nextProps){
    if(!nextProps.canvasInEditMode) this.setState({settingsViewOpen:false})
  }

  remove(){
    if(this.props.onRemove) this.props.onRemove(this.props.id)
  }


  convertIntToRem(number){
    return number.toString() + 'rem';
  }

  toggleSettings(){
    this.setState({settingsViewOpen: !this.state.settingsViewOpen})
  }

  initSettings(){

  }

  componentDidMount(){
    this.setState({confetti:true})
    if(this.props.canvasInEditMode) this.initDraggable()
    else this.removeDraggable
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.canvasInEditMode !== prevProps.canvasInEditMode){
      if(this.props.canvasInEditMode) this.initDraggable()
      else this.removeDraggable();
    }
  }

  initDraggable(){
    let draggableElement = this.domRef

    this.interObj = Interact(draggableElement).draggable({
      //allowFrom: '.drag-handle',
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        inertia: true,
        onstart: this.onDragStart.bind(this),
        onend:this.onDragEnd.bind(this),
        onmove:this.onDrag.bind(this)
      }
    );
  }

  removeDraggable(){
    this.interObj.draggable(false)
  }


  onDrag(e){
    let placement = this.state.placement
    if(e.dx !== 0) placement.offsetX += e.dx
    if(e.dy !== 0) placement.offsetY += e.dy
    this.setState({placement})
  }

  onDragStart(){
    this.setState({isBeingDragged:true})
  }

  onDragEnd(){
    this.setState({isBeingDragged:false})
  }

  onSettingChange(event){
    if(!this.state) return
    if(this.state.settings){
      let settings = this.state.settings
      if(settings[event.key]){
        settings[event.key].value = event.value
        this.setState({settings})
      }
    }


    // console.log('value', event.value)
    // console.log('key', event.key)
  }

  renderSettings(){
    let renderedSettings = []
    for (let key in this.state.settings) {
      let setting = this.state.settings[key]
      if(setting.options.visible){
        let params = setting.options
        params.value = setting.value
        params.key = params.id = key
        params.onChange = this.onSettingChange
        let newElement = React.createElement(setting.type, params, null)
        renderedSettings.push(newElement)
      }
    }

    return renderedSettings;
  }

  renderContent(){
    return (
      <p>content</p>
    )

  }

  render(){
    let mainContainerClasses = this.state.mainContainerClasses.slice()
    if(this.state.cssWidgetPrefix) mainContainerClasses.push('--mm-' + this.state.cssWidgetPrefix)
    if(this.state.settingsViewOpen) mainContainerClasses.push('--mm-widget-flipped')
    if(this.state.isBeingDragged) mainContainerClasses.push('--mm-widget-isBeingDragged')

    let mainContainerStyle = {
      height: this.convertIntToRem(this.state.placement.height),
      width: this.convertIntToRem(this.state.placement.width),
      transform: 'translate(' + this.state.placement.offsetX  + 'px,' + this.state.placement.offsetY + 'px)'
    }

    if(this.state.editMode) mainContainerClasses.push('--mm-editMode')

    let widgetName = this.state.widgetName

    let confettiConfig = {
      angle: 90,
      spread: 360,
      startVelocity: 28,
      elementCount: 72,
      decay: 0.75
    }

    let confetti
    if(this.displayConfetti) confetti = <Confetti active={ this.state.confetti } config={confettiConfig}/>

    return (
      <div
        className={mainContainerClasses.join(' ')}
        style={mainContainerStyle}
        ref={(ref) => { this.domRef = ref }}
        id={'widget' + this.props.id}>

        {confetti}

        <div className="--mm-widget-front">
          {this.renderContent()}
        </div>

        <div className="--mm-widget-back">
          {this.renderSettings()}
        </div>

        <div className="--mm-widget-nameTag">
          {widgetName}
        </div>

        <button onClick={this.toggleSettings} className='--mm-widget-settingsButton --mm-visible'></button>
        <button onClick={this.remove} className='--mm-widget-deleteButton --mm-visible'></button>

      </div>
    )
  }

}


export default BaseWidget
