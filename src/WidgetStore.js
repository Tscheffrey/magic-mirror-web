import React, { Component } from 'react'
import './WidgetStore.css'

class WidgetStore extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      styleClasses:[]
    }
    this.state.styleClasses.push('-mm-widget-store')

    this.widgetSelected = this.widgetSelected.bind(this)
  }

  widgetSelected(e){
    let index = e.target.getAttribute('data-key')
    let widgetType = this.props.availableWidgets[index]
    if(this.props.addWidget) this.props.addWidget(widgetType)
  }


  render(){
    let widgets;
    if(this.props.availableWidgets.length > 0) {
      widgets = []
      let  indexCounter = 0;
      for (let widget of this.props.availableWidgets) {
        widgets.push(
          <div className="available-widget" key={indexCounter} data-key={indexCounter}>
            <div className='icon'>
              <img src={widget.icon} />
            </div>
            <p>{widget.widgetName}</p>
          </div>
        )
        indexCounter++;
      }
    }

    let containerClasses = this.state.styleClasses.slice()
    if(!this.props.visible) containerClasses.push('invisible')



    return (
      <div onClick={this.widgetSelected} className={containerClasses.join(' ')}>
        {widgets}
      </div>
    )
  }

}


export default WidgetStore
