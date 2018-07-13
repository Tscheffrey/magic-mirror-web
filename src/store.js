import Shortid from 'shortid'


import { applyMiddleware, combineReducers, createStore } from 'redux'

// actions.js
export const addWidget = widget => ({
  type: 'ADD_WIDGET',
  widget,
})

export const removeWidget = widget => ({
  type: 'REMOVE_WIDGET',
  widget,
})

export const moveWidget = widget => ({
  type: 'MOVE_WIDGET',
  widget,
})

// reducers.js

const initialState = {
    widget: [
    'H1S_s4Lmm' : {
      text: 'this is just some dummy content'
    },
    'B1x_sNLm7' : {
      text : 'this is just some dummy content (2)'
    }
  ]
}

export const todo = (state = initialState, action) => {
  switch (action.type) {
    // case 'ADD_TODO':
    //   let newTodo = {text: action.todo.text}
    //   let newState = Object.assign({}, state)
    //   newState.todo[Shortid.generate()] = newTodo
    //   return newState;
    //
    // case 'REMOVE_TODO':
    //   let newState2 = Object.assign({}, state)
    //   delete newState2.todo[action.todo.id]
    //   return newState2
    //
    // case 'TOGGLE_TODO':
    //   let newState3 = Object.assign({}, state)
    //   newState3.todo[action.todo.id].done = !!!newState3.todo[action.todo.id].done
    //   return newState3

    default:
      return state
  }
};

export const reducers = combineReducers({
  todo,
})

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState)
  return store
}

export const store = configureStore();


// Selectors

export const widgetSelector = (state) => {
  // let todos = []
  // for (let todoId in state.todo) {
  //   todos.push(Object.assign({}, state.todo[todoId], {id: todoId}))
  // }
  // return todos
  return state.widget
}
