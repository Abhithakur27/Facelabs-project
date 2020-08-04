import React, { Component } from "react";
import { StaticModal } from "../containers/StaticModal";

import axios from "axios";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNameModal: true,
      name: "",
      questions: [],
      score: 0,
      questionNo: 0,
    };
  }

  componentDidMount = () => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
      )
      .then(({ data }) => {
        this.setState({
          questions: data.results,
          totalQuestions: data.results.length,
        });
      })

      .catch((err) => console.error("Error in fetching qustions", err));
  };
}

onChangeName = (e) => {
  this.setState({
    name: e.target.value,
  });
};

startQuiz = () => {
  if (this.state.name.trim().length === 0) {
    // user doesno't fill anything
  } else {
    this.setState({
      openNameModal: false,
    });
  }
};

handleSubmitQuestion = (e) => {
  let correct_answer = this.state.questions[this.state.questionNo][
    "correct_answer"
  ];
  if (e.target.id == correct_answer) {
    this.state.score += 1;
    e.target.classList.add("border-success");
  } else {
    e.target.classList.add("border-danger");
  }

  // Color the correct answer

  //enable next questions
};
