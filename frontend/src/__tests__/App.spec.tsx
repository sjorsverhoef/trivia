import '@testing-library/jest-dom'
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from '../App';
import {act} from "react";

describe('App Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn((url) => {
            if (url === 'http://localhost:8080/question') {
                return Promise.resolve({
                    json: () => Promise.resolve({
                        difficulty: 'easy',
                        question: 'What is 2 + 2?',
                        incorrect_answers: ['3', '4', '5'],
                        type: 'multiple',
                        category: 'Math',
                    })
                });
            } else if (url === 'http://localhost:8080/checkanswer') {
                return Promise.resolve({
                    json: () => Promise.resolve({
                        correct_answer: '4'
                    })
                });
            }
            return Promise.reject(new Error('Unknown URL'));
        }) as jest.Mock;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders question and answers', async () => {
        await act(async () => {
            render(<App />);
        });

        await waitFor(() => {
            expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
            expect(screen.getByText('6')).toBeInTheDocument();
        });
    });

    it('validates correct answer', async () => {
        await act(async () => {
            render(<App />);
        });

        await waitFor(() => {
            expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
        });

        const answerButton = screen.getByText('4');
        fireEvent.click(answerButton);

        await waitFor(() => {
            expect(screen.getByText('✅ Correct !')).toBeInTheDocument();
        });
    });

    it('validates incorrect answer', async () => {
        await act(async () => {
            render(<App />);
        });

        await waitFor(() => {
            expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
        });

        const answerButton = screen.getByText('3');
        fireEvent.click(answerButton);

        await waitFor(() => {
            expect(screen.getByText('❌ Wrong !')).toBeInTheDocument();
        });
    });

    it('handles error state', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('API is down')));

        await act(async () => {
            render(<App />);
        });

        await waitFor(() => {
            expect(screen.getByText('An error occurred')).toBeInTheDocument();
        });
    });
});