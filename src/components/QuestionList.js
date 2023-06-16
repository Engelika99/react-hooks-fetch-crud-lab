/** @format */

import React from "react";
import QuestionItem from "./QuestionItem";
import url from "../constant";

function QuestionList({ questions, setQuestions }) {
  const handleDeletedQuestion = async (id) => {
    const config = { method: "DELETE" };
    await fetch(`${url.questions}/${id}`, config);
    const filteredQuestions = questions.filter((question) => question.id !== id);
    setQuestions(filteredQuestions);
  };

  const handleAnswerQuestion = async (selection, id) => {
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: selection }),
    };
    const response = await fetch(`${url.questions}/${id}`, config).then((r) => r.json());
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        return response;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  };

  const updatedQuestions = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onAnswerQuestion={handleAnswerQuestion}
      onDeletedQuestion={handleDeletedQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{updatedQuestions}</ul>
    </section>
  );
}

export default QuestionList;
