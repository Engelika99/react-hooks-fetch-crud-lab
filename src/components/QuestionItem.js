/** @format */

import React from "react";
import url from "../constant";

function QuestionItem({ question, onDeletedQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleAnswerQuestion = async (selection, id) => {
    const config = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: parseInt(selection) }),
    };

    await fetch(`${url.questions}/${id}`, config);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e) => handleAnswerQuestion(e.target.value, id)} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={() => onDeletedQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
