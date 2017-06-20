import React, { Component } from 'react';
import logo from './logo.svg';
import redux from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
  }
  render() {
    var reducer_0 = (state={}, action) => {
      console.log('reducer_0 was called with state', state, 'and action', action)
      switch (action.type) {
        case 'SAY_SOMETHING':
          return {
            ...state,
            message: action.message
          }
        default:
          return state;
      }
    }
    var reducer_1 = (state=[], action) => {
      switch (action.type) {
        case 'ADD_ITEM':
          return [
            ...state,
            {message: action.message}
          ];
        default:
          return state;
      }
    }
    var store_0 = createStore(
      combineReducers({
        item: reducer_0,
        items: reducer_1
      }),
      composeWithDevTools(
        applyMiddleware(thunk)
      )
    )
    var changeContent = () => {
      store_0.dispatch({type: "SAY_SOMETHING", message: 'Hello, Redux123'})
    }
    var addContent = () => {
      store_0.dispatch({type: 'ADD_ITEM', message: 'Hello, Andrew'})
    }
    store_0.dispatch({type: "SAY_SOMETHING", message: 'Hello, Redux'})
    // TODO how to pass this.state.messages as first params to reducer_1
    store_0.subscribe(() => this.setState({'message': store_0.getState().item.message, messages: this.state.messages.concat(store_0.getState().items)}))
    return (
      <div>
      <h1>{this.state.message}</h1>
      {this.state.messages.map((object, i) => <h1 key={i}>{object.message}</h1>)}
      <br/>
      <button onClick={changeContent.bind(this)}>display message</button>
      <button onClick={addContent.bind(this)}>add message</button>
      </div>
    );
  }
}

export default App;
