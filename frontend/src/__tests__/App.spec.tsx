import '@testing-library/jest-dom'
import {render} from '@testing-library/react';
import App from '../App';
import {act} from "react";

describe('App Component', () => {
    it('renders correctly', async () => {
        await act(() => render(<App />))
    })
})