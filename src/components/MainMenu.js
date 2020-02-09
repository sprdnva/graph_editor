import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button } from "@material-ui/core";
import uuidv4 from "uuid/v4";
import _ from "lodash";

import { getNodeTypes } from "../redux/actions/nodesActions";

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 200
  }
}));

const MainMenu = props => {
  const classes = useStyles();
  const colors = ["#88dee3", "#ffcf99", "#82ab79", "#ab93ad"];
  const { addNode, nodeTypes } = props;
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      {nodeTypes &&
        Object.keys(nodeTypes).length &&
        Object.keys(nodeTypes).map((type, index) => (
          <Button
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              margin: "5px",
              padding: "5px 5px"
            }}
            key={uuidv4()}
            onClick={() => addNode(type, colors[index])}
          >
            {type}
          </Button>
        ))}
    </Drawer>
  );
};

const mapStateToProps = state => {
  return {
    nodeTypes: state.nodes.nodeTypes
  };
};

export default connect(mapStateToProps)(MainMenu);
