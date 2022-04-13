import './App.css';
import { Intent, TextArea, Button, Switch } from "@blueprintjs/core";
import React, { useState, Component } from "react";
import GridLayout from "react-grid-layout";
import { ReactComponent as Html2text } from "./html2text_logo.svg";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      htmlText: "",
      plainText: "",
      nightTheme: false
    };

    this.handleHtmlChange = this.handleHtmlChange.bind(this);
    this.convertToPlainText = this.convertToPlainText.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  componentDidMount() {
    const {htmlText, plainText, nightTheme} = this.state;
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

  changeTheme() {
    this.setState({nightTheme: !this.state.nightTheme});
  }

  render() {
    const layout = [
      { i: "header", x: 0, y: 0, w: 11, h: 5, static: true },
      { i: "htmlText", x: 0, y: 5, w: 5.2, h: 32, static: true },
      { i: "controlPanel", x: 5.2, y: 5, w: 0.6, h: 32, static: true },
      { i: "plainText", x: 5.8, y: 5, w: 5.2, h: 32, static: true }
    ];
    return (
        <ThemeProvider theme={this.state.nightTheme ? darkTheme : lightTheme}>
          <>
            <GlobalStyles />
            <GridLayout
                className="mainLayout"
                layout={layout}
                cols={11}
                rowHeight={5}
                width={800}
            >
              <div className={"header"} key="header">
                <Html2text className={"logo"} />
                <Switch
                    /*{...this.state}}*/
                    className={"dayNightSwitch"}
                    innerLabel="day"
                    innerLabelChecked="night"
                    checked={this.state.nightTheme}
                    large={true}
                    onChange={() => this.changeTheme()}
                />
              </div>
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
                    intent={Intent.NONE}
                    value={this.state.plainText}
                />
              </div>
            </GridLayout>
            <footer>
            </footer>
          </>
        </ThemeProvider>
    );
  }
}

export default App;
