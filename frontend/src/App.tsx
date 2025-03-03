import './App.css'
import {useEffect, useState} from "react";

type QuestionResponse = {
    difficulty: string,
    question: string,
    incorrect_answers: string[],
    type: string,
    category: string,
}
type Answer = {text: string, checked: boolean};
type Answers = Answer[]

function App() {
    const [questionData, setQuestionData] = useState<'' | 'loading' | 'error' | QuestionResponse>('');
    const [answers, setAnswers] = useState<Answers | []>([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [status, setStatus] = useState('not_set');

    const fetchAsync = async (url: string, method: 'POST' | 'GET', body?: BodyInit) => {
        return await fetch(url, {method, body}).then((response) => {
            return response.json()
        })
    }

    useEffect(() => {
        if (questionData === '') {
            setQuestionData('loading')
            fetchAsync('http://localhost:8080/question', 'GET')
            .then((response: QuestionResponse) => {
                    console.log(response)
                    setQuestionData(response);
                    setAnswers(response.incorrect_answers.map((answer) => ({text: answer, checked: false})))
                })
                .catch(() => setQuestionData('error'))
        }
    }, [])

    const validate = async (answer: Answer) => {
        const formData = new FormData();

        if (typeof questionData === 'string') {
            setQuestionData('error')
            return;
        }

        formData.append("question", questionData.question);

        if (correctAnswer) {
            setStatus(correctAnswer === answer.text ? 'correct' : 'wrong')
            return;
        }

        try {
            const data = await fetchAsync('http://localhost:8080/checkanswer', 'POST', formData)
            setCorrectAnswer(data.correct_answer);
            setStatus(data.correct_answer === answer.text ? 'correct' : 'wrong')
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