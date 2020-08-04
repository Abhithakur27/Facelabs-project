import React, { Component } from "react";
import { StaticModal } from "../containers/StaticModal";
import PopulateQuestion from "../containers/PopulateQuestion";
import SuccesfulScore from "../containers/SuccesfulScore";

import axios from "axios";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNameModal: false,
      name: "",
      questions: [],
      score: 0,
      questionNo: 0,
      length: "",
      totalQuestions: 10,
      enableNext: false,
      shuffleOptions: [],
      styleOptions: {},
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
    document.getElementById(correct_answer).classList.add("border-success");

    //enable next questions
    this.setState({
      enableNext: true,
      styleOptions: {
        correct: correct_answer,
        wrong: e.target.id,
      },
    });
  };

  shuffleOptions = (array) => {
    // Create a copy of the original array to be randomized
    let shuffle = [...array];

    // Defining function returning random value from i to N
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

    // Shuffle a pair of two elements at random position j
    shuffle.forEach(
      (elem, i, arr, j = getRandomValue(i, arr.length)) =>
        ([arr[i], arr[j]] = [arr[j], arr[i]])
    );

    this.setState({
      shuffleOptions: shuffle,
    });
    return shuffle;
  };

  nextQuestion = () => {
    let { styleOptions } = this.state;

    //Remove the class from selected options
    document
      .getElementById(styleOptions.correct)
      .classList.remove("border-success");
    document
      .getElementById(styleOptions.wrong)
      .classList.remove("border-danger");

    this.setState({
      questionNo: this.state.questionNo + 1,
      enableNext: false,
      styleOptions: {},
      shuffleOptions: [],
    });
  };

  render() {
    return (
      <>
        <div>
          <StaticModal
            openModal={this.state.openNameModal}
            onChangeName={this.onChangeName}
            startQuiz={this.startQuiz}
          />

          <PopulateQuestion
            question={this.state.questions[this.state.questionNo]}
            handleSubmitQuestion={this.handleSubmitQuestion}
            shuffleOptions={this.shuffleOptions}
            nextQuestion={this.nextQuestion}
            score={this.state.score}
            questionNo={this.state.questionNo}
            totalQuestions={this.state.totalQuestions}
            enableNext={this.state.enableNext}
            shuffleOptionsValue={this.state.shuffleOptions}
          />
        </div>
        {this.state.questionNo == this.state.totalQuestions ? (
          <div>
            <SuccesfulScore totalQuestions={this.state.totalQuestions} />
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}
