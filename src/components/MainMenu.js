import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, Input } from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import { importArchFromUrl } from '../redux/actions/diagramActions';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 250,
    padding: '0 10px',
  },
}));

const MainMenu = (props) => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleImportFromUrl = () => {
    if (url) {
      dispatch(importArchFromUrl(url));
    }
  };

  const classes = useStyles();
  const colors = ['#88dee3', '#ffcf99', '#82ab79', '#ab93ad'];
  const { addNode, nodeTypes } = props;
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {nodeTypes &&
        Object.keys(nodeTypes).length &&
        Object.keys(nodeTypes).map((type, index) => (
          <Button
            style={{
              border: '1px solid gray',
              borderRadius: '5px',
              margin: '5px',
              padding: '5px 5px',
            }}
            key={uuidv4()}
            onClick={() => addNode(type, colors[index])}
          >
            {type}
          </Button>
        ))}
      <Input
        type="text"
        id="url-input"
        placeholder="Enter diagram url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleImportFromUrl}>Import from url</Button>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    nodeTypes: state.nodes.nodeTypes,
  };
};

export default connect(mapStateToProps)(MainMenu);
