import MagicMirror from './MagicMirror'

import React, { Component } from 'react'

import { connect } from 'react-redux';

import {
  addWidget,
  removeWidget,
  moveWidget,
  widgetSelector
} from './redux';

const mapStateToProps = (state, ownProps) => ({
  widgets: widgetSelector(state.widget),
});

const mapDispatchToProps = {
  addWidget,
  removeWidget,
  moveWidget,
};

const MagicMirrorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MagicMirror);

export default MagicMirrorContainer
