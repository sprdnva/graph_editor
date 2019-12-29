import React from "react";
import * as go from "gojs";
import { connect } from "react-redux";
import { ToolManager, Diagram } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";

import MainMenu from "./MainMenu";
import { EditPanel } from "./EditPanel";
import { getNodeTypes } from "../redux/actions/nodesActions";
import { exportArch } from "../redux/actions/diagramActions";
import "./MyDiagram.css";
import Modal from "./Modal";
import { Button } from "@material-ui/core";
import createJson from "../helpers/createJson";

class MyDiagram extends React.Component {
  nodeId = 0;
  state = {
    open: false,
    contextNode: "",
    selectedNode: "",
    selectedNodeKeys: [],
    model: {
      nodeDataArray: [
        { key: "Alpha", label: "name", color: "pink", type: "Alpha" },
        { key: "Betta", label: "name2", color: "blue", type: "Betta" }
      ],
      linkDataArray: [{ from: "Alpha", to: "Betta" }]
    }
  };

  componentWillMount() {
    this.props.getNodeTypes();
  }

  handleModal(state) {
    this.setState({
      open: state.contextNode.label
    });
  }

  render() {
    const { model } = this.state;
    const { exportArch } = this.props;
    return (
      <section>
        <MainMenu addNode={this.addNode} />
        <GojsDiagram
          key="gojsDiagram"
          diagramId="myDiagramDiv"
          model={this.state.model}
          className="myDiagram"
          createDiagram={this.createDiagram}
          onModelChange={this.modelChangeHandler}
          linkKeyProperty="key"
        />
        <Button
          style={{ float: "right" }}
          onClick={() => exportArch({ ...model })}
        >
          Export JSON
        </Button>
        <EditPanel
          node={this.state.contextNode}
          onClose={this.onEditPanelClose}
          onSubmit={this.onNameChange}
        />
      </section>
    );
  }

  onEditPanelClose = () => {
    this.setState({ ...this.state, contextNode: "" });
  };

  onNameChange = newName => {
    const newModel = this.state.model.nodeDataArray.map(node => {
      if (node.key === this.state.contextNode.key) {
        node.label = newName;
        console.log(node);
      }
      return node;
    });
    console.log(newModel);
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        nodeDataArray: newModel
      }
    });
    this.modelChangeHandler({ eventType: "" });
    this.onEditPanelClose();
  };

  createDiagram = diagramId => {
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, diagramId, {
      initialContentAlignment: go.Spot.Center,
      "undoManager.isEnabled": true
    });
    myDiagram.nodeTemplate = $(
      go.Node,
      "Vertical",
      new go.Binding("location", "loc"),
      $(
        go.Shape,
        "Circle",
        { strokeWidth: 0 },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { position: "relative" },
        new go.Binding("text", "label")
      ),
      $(
        go.TextBlock,
        { margin: 8, font: "Italic small-caps bold 13px Georgia, Serif" },
        new go.Binding("text", "type")
      )
    );
    const that = this;
    myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
      let part = e.subject.part;
      if (!(part instanceof go.Link)) {
        if (e.diagram.selection.count === 1) {
          that.setState({ selectedNode: part.data.key });
        } else if (e.diagram.selection.count === 2 && that.state.selectedNode) {
          let hasParent;
          console.log(that.state.model.linkDataArray);
          that.state.model.linkDataArray.map(connection => {
            console.log(connection.to);
            console.log(part.data.key);
            if (connection.to === part.data.key) {
              hasParent = true;
              return;
            }
          });
          if (hasParent) {
            that.setState({
              ...that.state,
              model: {
                ...that.state.model,
                linkDataArray: [
                  ...that.state.model.linkDataArray,
                  { from: that.state.selectedNode, to: part.data.key }
                ]
              }
            });
          } else {
            alert("Can not connect");
          }
        }
      }
    });
    myDiagram.addDiagramListener("ObjectContextClicked", function(e) {
      let part = e.subject.part;
      if (!(part instanceof go.Link)) {
        that.setState(
          {
            ...that.state,
            contextNode: part.data
          },
          () => {
            console.log(that.state.contextNode);
          }
        );
      }
    });
    return myDiagram;
  };

  removeNode = nodeKey => {
    const nodeToRemoveIndex = this.state.model.nodeDataArray.findIndex(
      node => node.key === nodeKey
    );
    if (nodeToRemoveIndex === -1) {
      return;
    }
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        nodeDataArray: [
          ...this.state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
          ...this.state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
        ]
      }
    });
  };

  removeLink = linKToRemove => {
    const linkToRemoveIndex = this.state.model.linkDataArray.findIndex(
      link => link.from === linKToRemove.from && link.to === linKToRemove.to
    );
    if (linkToRemoveIndex === -1) {
      return;
    }
    return {
      ...this.state,
      model: {
        ...this.state.model,
        linkDataArray: [
          ...this.state.model.linkDataArray.slice(0, linkToRemoveIndex),
          ...this.state.model.linkDataArray.slice(linkToRemoveIndex + 1)
        ]
      }
    };
  };

  nodeSelectionHandler = (nodeKey, isSelected) => {
    if (isSelected) {
      this.setState({
        ...this.state,
        selectedNodeKeys: [...this.state.selectedNodeKeys, nodeKey]
      });
    } else {
      const nodeIndexToRemove = this.state.selectedNodeKeys.findIndex(
        key => key === nodeKey
      );
      if (nodeIndexToRemove === -1) {
        return;
      }
      this.setState({
        ...this.state,
        selectedNodeKeys: [
          ...this.state.selectedNodeKeys.slice(0, nodeIndexToRemove),
          ...this.state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
        ]
      });
    }
  };

  addNode = (label, color) => {
    const newNodeId = "node" + this.nodeId;
    const linksToAdd = this.state.selectedNodeKeys.map(parent => {
      return { from: parent, to: newNodeId };
    });
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        nodeDataArray: [
          ...this.state.model.nodeDataArray,
          {
            key: newNodeId,
            label: label || "New Node",
            color: color || "Blue",
            type: label || "Node type"
          }
        ],
        linkDataArray:
          linksToAdd.length > 0
            ? [...this.state.model.linkDataArray].concat(linksToAdd)
            : [...this.state.model.linkDataArray]
      }
    });
    this.nodeId += 1;
  };

  modelChangeHandler = event => {
    switch (event.eventType) {
      case ModelChangeEventType.Remove:
        if (event.nodeData) {
          this.removeNode(event.nodeData.key);
        }
        if (event.linkData) {
          this.removeLink(event.linkData);
        }
        break;
      default:
        break;
    }
  };
}

const mapDispatchToProps = {
  getNodeTypes,
  exportArch
};

export default connect(null, mapDispatchToProps)(MyDiagram);
