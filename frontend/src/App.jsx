import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [questionData, setQuestionData] = useState('');

    const fetchAsync = async (url) => {
        return await fetch(url, {method: 'GET'}).then((response) => {
            return response.json()
        })
    }

    useEffect(() => {
        if (questionData === '') {
            setQuestionData('loading')
            fetchAsync('http://localhost:8080/question')
                .then((response) => setQuestionData(response))
                .catch(() => setQuestionData('error'))
        }
    }, [questionData])

    return (
    <>
      <div>
          {questionData === 'error' && <div>An error occurred</div>}
          {questionData === 'loading' && <div>loading</div>}
          {typeof questionData !== 'string' &&
              <div>
                  <ul>
                      <li>Category: <span>{questionData.category}</span></li>
                      <li>difficulty: <span>{questionData.difficulty}</span></li>
                  </ul>
                  <h1>{questionData.question}</h1>
                  {questionData.incorrect_answers.map((answer) => <option>{answer}</option>)}
              </div>
          }


      </div>
    </>
    )
}

export default App