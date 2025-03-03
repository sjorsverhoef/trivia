import '@testing-library/jest-dom'
import {render} from '@testing-library/react';
import App from '../App';
import {decodeHtml} from "../utils/utils";
import {act} from "react";

describe('App Component', () => {

    describe("decodeHtml", () => {
        it('decodes special html characters', () => {
            expect(decodeHtml("What was Genghis Khan&#039;s real name?")).toBe("What was Genghis Khan's real name?")
        })
    })

    it('renders correctly', async () => {
        await act(() => render(<App />))
    })
})