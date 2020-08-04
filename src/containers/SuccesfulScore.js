import React, { Component } from "react";
import "../assets/css/style.css";
import headerImg from "../Image/head.png";
import Image from "react-bootstrap/Image";

export default function SuccesfulScore(props) {
  return (
    <div>
      <div className="container-fluid">
        <Image src={headerImg} fluid />
        <div className="page-wrap d-flex flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <span className="display-1 d-block">
                  <h2>Congratulations</h2>
                </span>
                <div className="mb-4 lead">
                  <h3>
                    you Score Out of {props.score} / {props.totalQuestions}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
