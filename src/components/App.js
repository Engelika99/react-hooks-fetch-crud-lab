/** @format */

import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const questionFetch = async () => {
    const response = await fetch("http://localhost:4000/questions").then((r) => r.json());
    setQuestions(response);
  };
  useEffect(() => {
    questionFetch();
  }, []);

  const onAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };
  function handleDeleteQuestion(id) {
    const newQuestionList = questions.filter((q) => {
      if (q.id === parseInt(id)) {
        return false;
      }
      return true;
    });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((question) => setQuestions(newQuestionList));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={onAddQuestion} />
      ) : (
        <QuestionList questions={questions} setQuestions={setQuestions} handleDeleteQuestion={handleDeleteQuestion} />
      )}
    </main>
  );
}

export default App;
