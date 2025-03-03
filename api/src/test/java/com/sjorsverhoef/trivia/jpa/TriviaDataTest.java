package com.sjorsverhoef.trivia.jpa;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TriviaDataTest {

    @Test
    public void testTriviaDataConstructorAndGetters() {
        String question = "What is 2+2?";
        String answer = "4";
        TriviaData triviaData = new TriviaData(question, answer);

        assertEquals(question, triviaData.getQuestion());
        assertEquals(answer, triviaData.getAnswer());
    }

    @Test
    public void testTriviaDataToString() {
        String question = "What is 2+2?";
        String answer = "4";
        TriviaData triviaData = new TriviaData(question, answer);
        String expectedString = String.format("Customer[id=null, question='%s', answer='%s']", question, answer);

        assertEquals(expectedString, triviaData.toString());
    }
}