import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import MyDiagram from "./components/MyDiagram";
import "normalize.css";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <MyDiagram />
        </div>
      </Provider>
    );
  }
}
