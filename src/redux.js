import Shortid from 'shortid'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



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

const initialState = {widgets:{}}

export const widget = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      let newWidget = {type: action.widget.type, typeString: 'test'}
      let newState = Object.assign({}, state)
      newState.widgets[Shortid.generate()] = newWidget
      return newState

    case 'REMOVE_WIDGET':
      let newState2 = Object.assign({}, state)
      delete newState2.widgets[action.widget.id]
      return newState2

    case 'MOVE_WIDGET':
      let newState3 = Object.assign({}, state)
      return newState3

    default:
      return state
  }
};

export const reducers = combineReducers({
                          widget,
                        })

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState)
  return store
}

export const store = configureStore()

// export const store = createStore(persistedReducer)
// export const persistor = persistStore(store)


// Selectors

export const widgetSelector = (state) => {
  // let todos = []
  // for (let todoId in state.todo) {
  //   todos.push(Object.assign({}, state.todo[todoId], {id: todoId}))
  // }
  // return todos
  return state.widgets
}
