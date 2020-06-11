import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Button, Row, Col } from "antd";
import ReactTurnPlate from "react-turnplate";
import Confetti from "react-dom-confetti";
import { Typography } from "antd";
import Swal from "sweetalert2";
import {CopyOutlined} from '@ant-design/icons'

const { Title } = Typography;

const avocado = require("./images/icon_avocado.png");
const doughnut = require("./images/icon_doughnut.png");
const pecan = require("./images/icon_pecan.png");
const pudding = require("./images/icon_pudding.png");
const starwberry = require("./images/icon_starwberry.png");

const line = "918slot.th";
const lineMsg = `https://line.me/R/oaMessage/@${line}/?`;
const whatsapp = ``;

const configLeft = {
  angle: "90",
  spread: 45,
  startVelocity: "50",
  elementCount: 500,
  dragFriction: 0.1,
  duration: 5000,
  stagger: "5",
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const configRight = {
  angle: 125,
  spread: 45,
  startVelocity: "50",
  elementCount: 500,
  dragFriction: 0.1,
  duration: 15000,
  stagger: "25",
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const reward_list = [
  { icon: avocado, name: "100", id: 1 },
  { icon: doughnut, name: "300", id: 2 },
  { icon: pecan, name: "200", id: 3 },
  { icon: pudding, name: "100", id: 4 },
  { icon: starwberry, name: "0", id: 5 },
  { icon: avocado, name: "100", id: 1 },
  { icon: doughnut, name: "300", id: 2 },
  { icon: pecan, name: "200", id: 3 },
  { icon: pudding, name: "100", id: 4 },
  { icon: starwberry, name: "0", id: 5 },
  { icon: avocado, name: "100", id: 1 },
  { icon: doughnut, name: "300", id: 2 },
  { icon: pecan, name: "200", id: 3 },
  { icon: pudding, name: "100", id: 4 },
  { icon: starwberry, name: "0", id: 5 },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      canStartRotate: false,
      award: "",
      win: false,
      isCopied: false
    };
  }

  onTryRotate = async () => {
    /* do some check stuff,if can not rotate return*/
    this.setState({ canStartRotate: true });

    this.timer();
  };

  timer = () => {
    setTimeout(
      function () {
        this.setState({ canStartRotate: false, award: reward_list[0] });
        console.log("done");
      }.bind(this),
      1000
    );
  };

  rotateFinish = () => {
    console.log("rotate finish");
    const { winningText, isCopied } = this.state;

    this.setState({
      win: true
    })

    let promoteCode = this.getRandomCode(10);
    Swal.fire({
      type: "info",
      title: "Please copy the code",
      html:
        '<div id="containerSwal"><h4 id="promoteCode">' +
        promoteCode +
        '<i class="far fa-copy clickable" style="margin-left: 10px;"></i></h4></div> ' +
        "Click to redeem your topup bonus 😊",
      confirmButtonText: '<a style="color: white;" href="#">Redeem</a>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.value) {
        window.open(
          this.getContact(promoteCode),
          "_blank" //
        );
      }
    });
    document.querySelector("#containerSwal").addEventListener("click", () => {
      Swal.update({ type: "success" });
      this.copyToClipboard(promoteCode);
      this.state.isCopied = true;
      if (isCopied) {
        Swal.update({ title: "Copied" });
      }
    });
  };

  copyToClipboard(str){
    this.state.isCopied = true;
    Swal.update( { title: "Copied"});
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};


  getRandomCode(length) {
    let result = "";
    let characters =
      "0123456789ABCDEF0123456789GHIJKLMN0123456789OPQRSTUVWXYZ0123456789abcdef0123456789ghijklmn0123456789opqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getContact(code, type = 'line') {
    switch(type) {
      case "line":
        return `${lineMsg}/${code}`;

      case "whatsapp":
        return `https://wa.me/${whatsapp}?text=My%20promote%20code%20is%20${code}`;

    }
  }

  render() {
    const { canStartRotate, award, win } = this.state;
    return (
      <div className="App">
        <div
          className="container"
          align="middle"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
            <div className="logo" />
            <Title style={{ color: "white" }}>Lucky Wheel</Title>
          </div>
          <div style={{ flex: 6, display: "flex", flexDirection: "column" }}>
            <ReactTurnPlate
              prizeList={reward_list}
              award={award}
              image_spin={require("./images/btn_spin.png")}
              background_1={require("./images/circle1_img.jpg")}
              background_2={require("./images/circle2_img.jpg")}
              canStartRotate={canStartRotate}
              onTryRotate={this.onTryRotate}
              rotateFinish={this.rotateFinish}
            />
            <img
              style={{
                width: "60%",
                margin: "0 auto",
                height: 40,
                marginBottom: 10,
              }}
              onClick={this.onTryRotate}
              src={require("./images/Button_SpinNow.gif")}
            />
            {/* <Button style={{width: "60%", margin: '0 auto', height: 40, marginBottom: 10}} onClick={() => window.location.href=`https://line.me/R/home/public/main?id=${line}`} type="primary" shape="round" >Join Our Group</Button> */}
            <Button
              style={{
                width: "60%",
                margin: "0 auto",
                height: 40,
                marginBottom: 10,
              }}
              onClick={() => (window.location.href = lineMsg)}
              type="primary"
              shape="round"
            >
              Join Our Group
            </Button>
          </div>
          <div
            style={{
              flex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <h6 style={{ color: "white" }}>
              © 2019 Lucky Wheel. The games are provided by online sites for
              demonstration purpose and just for fun or practice play. No
              download required to play the games.
            </h6>
          </div>
        
        </div>
        <Confetti className="confettiLeft" active={win} config={configLeft} />
        <Confetti className="confettiRight" active={win} config={configLeft} />
      </div>
    );
  }
}

export default App;
