import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
    width: 180,
    padding: 10
  }
}));

export const EditPanel = props => {
  const classes = useStyles();
  const { node, onClose, onSubmit } = props;
  //   const [isOpen, setState] = useState(true);
  const [newName, setNewName] = useState("");

  const toggleDrawer = () => event => {
    if (event.type === "keydown" && event.key === "Escape") {
      onClose();
    }
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <FormControl>
        <InputLabel htmlFor="my-input">New node name</InputLabel>
        <Input
          id="my-input"
          onChange={e => setNewName(e.target.value)}
          value={newName}
        />
        <Button onClick={() => onSubmit(newName)}>Change name</Button>
      </FormControl>
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
