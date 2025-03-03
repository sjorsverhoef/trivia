import '@testing-library/jest-dom'
import {decodeHtml} from "../utils/utils";

describe('App Component', () => {

    describe("decodeHtml", () => {
        it('decodes special html characters', () => {
            expect(decodeHtml("What was Genghis Khan&#039;s real name?")).toBe("What was Genghis Khan's real name?")
        })
    })
})