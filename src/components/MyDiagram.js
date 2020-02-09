import React from "react";
import * as go from "gojs";
import { connect } from "react-redux";
import { ToolManager, Diagram } from "gojs";
import { GojsDiagram, ModelChangeEventType } from "react-gojs";

import MainMenu from "./MainMenu";
import EditPanel from "./EditPanel";
import { getNodeTypes } from "../redux/actions/nodesActions";
import { exportArch, addNode } from "../redux/actions/diagramActions";
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
      nodeDataArray: [],
      linkDataArray: []
    }
  };

  componentWillMount() {
    this.props.getNodeTypes();
  }

  componentDidUpdate() {
    console.log(this.props.model);
  }

  handleModal(state) {
    this.setState({
      open: state.contextNode.label
    });
  }

  render() {
    const { exportArch, model } = this.props;
    return (
      <section>
        <MainMenu addNode={this.addNode} />
        <GojsDiagram
          key="gojsDiagram"
          diagramId="myDiagramDiv"
          model={this.props.model}
          className="myDiagram"
          createDiagram={this.createDiagram}
          onModelChange={this.modelChangeHandler}
          linkKeyProperty="key"
        />
        <Button
          style={{
            float: "right",
            border: "1px solid gray",
            borderRadius: "5px",
            margin: "5px 5px"
          }}
          onClick={() => this.onExportArch({ ...model })}
        >
          Export JSON
        </Button>
        {this.state.contextNode && (
          <EditPanel
            node={this.state.contextNode}
            onClose={this.onEditPanelClose}
            onSubmit={this.onNodeChange}
          />
        )}
      </section>
    );
  }

  onEditPanelClose = () => {
    this.setState({ ...this.state, contextNode: "" });
  };

  onExportArch = async model => {
    const blob = await this.props.exportArch(model);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "model.py" || "download";
    const clickHandler = elem => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        elem.removeEventListener("click", () => clickHandler(elem));
      }, 150);
    };
    a.addEventListener("click", () => clickHandler(a), false);
    a.click();
    return a;
  };

  onNodeChange = (newName, formData) => {
    const { nodeDataArray, linkDataArray } = this.props.model;
    let oldName;
    const newModel = nodeDataArray.map(node => {
      for (let link of linkDataArray) {
        for (let key in link) {
          if (link[key] === oldName) {
            link[key] = newName;
          }
        }
      }
      if (node.key === this.state.contextNode.key) {
        oldName = node.key;
        node.key = newName;
        node.label = newName;
        node.params = { ...formData };
        console.log(node);
      }
      return node;
    });
    console.log(newModel);
    this.props.addNode({
      linkDataArray,
      nodeDataArray: newModel
    });
    // this.modelChangeHandler({ eventType: "" });
    this.onEditPanelClose();
  };

  createDiagram = diagramId => {
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, diagramId, {
      "undoManager.isEnabled": true,
      initialContentAlignment: go.Spot.Center
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
    const { addNode } = this.props;
    myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
      let part = e.subject.part;
      if (!(part instanceof go.Link)) {
        if (e.diagram.selection.count === 1) {
          that.setState({ selectedNode: part.data.label });
        } else if (e.diagram.selection.count === 2 && that.state.selectedNode) {
          addNode({
            nodeDataArray: [...that.props.model.nodeDataArray],
            linkDataArray: [
              ...that.props.model.linkDataArray,
              { from: that.state.selectedNode, to: part.data.label }
            ]
          });
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
    const { model, addNode } = this.props;
    const nodeToRemoveIndex = model.nodeDataArray.findIndex(
      node => node.key === nodeKey
    );
    if (nodeToRemoveIndex === -1) {
      return;
    }
    addNode({
      ...model,
      nodeDataArray: [
        ...model.nodeDataArray.slice(0, nodeToRemoveIndex),
        ...model.nodeDataArray.slice(nodeToRemoveIndex + 1)
      ]
    });
  };

  removeLink = linKToRemove => {
    const { model, addNode } = this.props;
    const linkToRemoveIndex = model.linkDataArray.findIndex(
      link => link.from === linKToRemove.from && link.to === linKToRemove.to
    );
    if (linkToRemoveIndex === -1) {
      return;
    }
    addNode({
      ...model,
      linkDataArray: [
        ...model.linkDataArray.slice(0, linkToRemoveIndex),
        ...model.linkDataArray.slice(linkToRemoveIndex + 1)
      ]
    });
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

  addNode = async (label, color) => {
    const { addNode, model } = this.props;
    const newNodeId = "node" + this.nodeId;
    const linksToAdd = this.state.selectedNodeKeys.map(parent => {
      return { from: parent, to: newNodeId };
    });
    await addNode({
      nodeDataArray: [
        ...model.nodeDataArray,
        {
          key: newNodeId,
          label: newNodeId || "New Node",
          color: color || "Blue",
          type: label || "Node type",
          params: {}
        }
      ],
      linkDataArray:
        linksToAdd.length > 0
          ? [...model.linkDataArray].concat(linksToAdd)
          : [...model.linkDataArray]
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

const mapStateToProps = state => ({
  nodeTypes: state.nodes.nodeTypes,
  model: state.diagram.model
});

const mapDispatchToProps = {
  getNodeTypes,
  exportArch,
  addNode
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiagram);
