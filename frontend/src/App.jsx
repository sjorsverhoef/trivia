import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [questionData, setQuestionData] = useState('');
    const [answers, setAnswers] = useState([[]]);
    const [status, setStatus] = useState('not_set');

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

    useEffect(() => {}, [setAnswers])

    const validate = async (answer) => {
        const formData = new FormData();
        formData.append("question", questionData.question);

        try {
            const data = await fetchAsync('http://localhost:8080/checkanswer', 'POST', formData)
            if(data.correct_answer === answer.text) setStatus('correct')
            else setStatus('wrong')
        } catch {
            setQuestionData('error')
        }
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
                              <button
                                  className={answer.checked ? 'een' : 'twee'}
                                  onClick={() => validate(answer)}>
                                  {answer.text}
                              </button>
                          </li>
                      )}
                  </ul>
                  {status !== 'not_set' &&
                      <div className="question_status">
                          {status === 'correct' && <span className="question_status--correct">✅ Correct !</span>}
                          {status === 'wrong' && <span className="question_status--incorrect">❌ Wrong !</span>}
                      </div>
                  }
                  <button onClick={() => location.reload()}>Next question</button>
              </div>
          }


      </div>
    </>
    )
}

export default App