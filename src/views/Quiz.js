import React, { Component } from "react";
import { StaticModal } from "../containers/StaticModal";
import PopulateQuestion from "../containers/PopulateQuestion";
import SuccesfulScore from "../containers/SuccesfulScore";
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
