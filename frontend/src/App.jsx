import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [questionData, setQuestionData] = useState('');
    const [answers, setAnswers] = useState([[]]);

    const fetchAsync = async (url, method, body) => {
        return await fetch(url, {method, body}).then((response) => {
            return response.json()
        })
    }

    useEffect(() => {
        if (questionData === '') {
            setQuestionData('loading')
            fetchAsync('http://localhost:8080/question', 'GET')
                .then((response) => {
                    setQuestionData(response);
                    setAnswers(response.incorrect_answers.map((answer) => ({text: answer, checked: false})))
                })
                .catch(() => setQuestionData('error'))
        }
    }, [])

    const validate = async (answer, index) => {
        const checkedAnswers = answers;
        checkedAnswers.map((answer) => answer.checked = false);
        checkedAnswers[index].checked = true;
        setAnswers(checkedAnswers); // TODO: doesnt update jsx for some reason?

        console.log('the question: ', questionData.question)

        const formData = new FormData();
        formData.append("question", questionData.question);

        const data = await fetchAsync('http://localhost:8080/checkanswer', 'POST', formData)
        console.log('the data is', data); // todo: not correct json
    }

    return (
    <>
      <div>
          {questionData === 'error' && <div>An error occurred</div>}
          {questionData === 'loading' && <div>loading</div>}
          {typeof questionData !== 'string' &&
              <div>
                  <ul className="question_info">
                      <li>Category: <span>{questionData.category}</span></li>
                      <li>difficulty: <span>{questionData.difficulty}</span></li>
                  </ul>
                  <h1>{questionData.question}</h1>
                  <ul className="question_answers">
                      {answers?.map((answer, index) =>
                          <li key={`answer-${index}`}>
                              <input
                                  id={`answer-${index}`}
                                  type="radio"
                                  name={`answer-${index}`}
                                  value={answer.text}
                                  checked={answer.checked}
                                  onChange={() => validate(answer, index)}/>
                              <label htmlFor={`answer-${index}`}>{answer.text}</label>
                          </li>
                      )}
                  </ul>
                  <button onClick={() => location.reload()}>Next question</button>
              </div>
          }


      </div>
    </>
    )
}

export default App