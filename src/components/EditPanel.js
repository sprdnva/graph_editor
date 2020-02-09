import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 200
  },
  content: {
    padding: 10
  }
}));

const EditPanel = props => {
  const classes = useStyles();
  const { node, onClose, onSubmit, nodeTypes } = props;
  console.log(node.params);
  const [newName, setNewName] = useState(node.label);
  console.log(nodeTypes[node.type]);
  let nodeSchema = nodeTypes[node.type];

  const toggleDrawer = () => event => {
    if (event.type === "keydown" && event.key === "Escape") {
      onClose();
    }
  };

  const handleSubmit = ({ formData }, e) => {
    console.log("Data submitted: ", formData);
    onSubmit(newName, formData);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {nodeSchema && (
        <section>
          <Input
            type="text"
            placeholder={node.label}
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Form
            schema={{
              title: "Schema",
              ...nodeSchema.properties.params
            }}
            formData={{ ...node.params }}
            onChange={console.log("changed")}
            onSubmit={handleSubmit}
            onError={console.log("errors")}
          />
        </section>
      )}
      <div className="content">{node.type}</div>
    </div>
  );

  return (
    <div>
      <Drawer anchor="right" open={!!node} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => ({
  nodeTypes: state.nodes.nodeTypes
});

export default connect(mapStateToProps)(EditPanel);
