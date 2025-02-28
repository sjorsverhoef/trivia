import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [questionData, setQuestionData] = useState('');
    const [answers, setAnswers] = useState([[]]);

    const fetchAsync = async (url) => {
        return await fetch(url, {method: 'GET'}).then((response) => {
            return response.json()
        })
    }

    useEffect(() => {
        if (questionData === '') {
            setQuestionData('loading')
            fetchAsync('http://localhost:8080/question')
                .then((response) => {
                    setQuestionData(response);
                    setAnswers(response.incorrect_answers)
                })
                .catch(() => setQuestionData('error'))
        }
    }, [])

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
                                  value={answer}
                                  checked={!!answer?.checked}/>
                              <label htmlFor={`answer-${index}`}>{answer}</label>
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