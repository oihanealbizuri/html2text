import './App.css';
import { Intent, TextArea, Button } from "@blueprintjs/core";
import { Component } from "react";
import GridLayout from "react-grid-layout";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      htmlText: "",
      plainText: ""
    };

    this.handleHtmlChange = this.handleHtmlChange.bind(this);
    this.convertToPlainText = this.convertToPlainText.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }

  componentDidMount() {
    const {htmlText, plainText} = this.state;
  }

  handleHtmlChange(event) {
    this.setState({htmlText: event.target.value});
  }

  convertToPlainText() {
    const {htmlText} = this.state;
    let plain = htmlText.replace(/<[^>]+>/g, '');
    this.setState({plainText: plain});
  }

  clearContent() {
    this.setState({
      htmlText: "",
      plainText: ""
    })
  }

  render() {
    const layout = [
      { i: "header", x: 0, y: 0, w: 11, h: 4, static: true },
      { i: "htmlText", x: 0, y: 4, w: 5, h: 33, static: true },
      { i: "controlPanel", x: 5, y: 4, w: 1, h: 33, static: true },
      { i: "plainText", x: 6, y: 4, w: 5, h: 33, static: true }
    ];
    return (
        <GridLayout
            className="mainLayout"
            layout={layout}
            cols={11}
            rowHeight={5}
            width={800}
        >
          <div className={"header"} key="header">header</div>
          <div className={"htmlText"} key="htmlText">
            <TextArea
                className={"textInput bp4-small"}
                fill={true}
                intent={Intent.PRIMARY}
                onChange={this.handleHtmlChange}
                value={this.state.htmlText}
            />
          </div>
          <div className={"controlPanel"} key="controlPanel">
            <Button
                className={"convertButton"}
                active={true}
                minimal={true}
                outlined={true}
                intent={Intent.PRIMARY}
                onClick={() => this.convertToPlainText()}
                icon={"circle-arrow-right"}
            />
            <Button
                className={"clearButton"}
                active={true}
                minimal={true}
                outlined={true}
                intent={Intent.DANGER}
                onClick={() => this.clearContent()}
                icon={"trash"}
            />
          </div>
          <div className={"plainText"} key="plainText">
            <TextArea
                className={"textInput bp4-small"}
                readOnly={true}
                fill={true}
                intent={Intent.PRIMARY}
                value={this.state.plainText}
            />
          </div>
        </GridLayout>
    );
  }
}

export default App;
