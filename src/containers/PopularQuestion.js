import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../assets/css/style.css";
import ReactHtmlParser from "react-html-parser";
import headerImg from "../Image/head.png";

export default function PopulateQuestion(props) {
  if (!props.question) {
    return null;
  }

  let { question, correct_answer, incorrect_answers } = props.question;

  let options = [];
  if (props.shuffleOptionsValue.length == 0) {
    options = [...incorrect_answers];
    options.push(correct_answer);
    options = props.shuffleOptions(options);
  } else {
    options = props.shuffleOptionsValue;
  }
  return (
    <div className="container-fluid">
      <Image src={headerImg} fluid />
      <div className="d-flex justify-content-center align-item-center">
        <Card className="w-auto">
          <Card.Body>
            <div>
              <span className="font-weight-bold">
                {ReactHtmlParser(question)}
              </span>
              <div className="mt-4">
                {options.map((option) => {
                  return (
                    <Card
                      className="mb-3 p-2 w-75 hover"
                      id={option}
                      onClick={
                        props.enableNext ? null : props.handleSubmitQuestion
                      }
                    >
                      {ReactHtmlParser(option)}
                    </Card>
                  );
                })}
                {props.questionNo == props.totalQuestions - 1 ? (
                  <div>
                    <Button
                      variant="primary"
                      onClick={props.nextQuestion}
                      disabled={!props.enableNext}
                    >
                      Finish
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="primary"
                      onClick={props.nextQuestion}
                      disabled={!props.enableNext}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
