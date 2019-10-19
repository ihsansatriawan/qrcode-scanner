import "./styles.css";

import React, { memo } from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";
import QrScan from "./components/QrScan";


const TodoApp = memo(props => {

  return (
    <Layout>
      <QrScan />
    </Layout>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
