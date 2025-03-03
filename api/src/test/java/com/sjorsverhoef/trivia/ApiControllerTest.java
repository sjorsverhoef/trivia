package com.sjorsverhoef.trivia;

import com.sjorsverhoef.trivia.jpa.TriviaData;
import com.sjorsverhoef.trivia.jpa.TriviaRepository;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ApiControllerTest {

    @Mock
    private TriviaRepository repository;

    @Mock
    private HttpClient httpClient;

    @Mock
    private HttpResponse<String> httpResponse;

    @InjectMocks
    private ApiController apiController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testQuestion() throws IOException, InterruptedException, JSONException {
        String jsonResponse = "{\"results\":[{\"question\":\"What is 2+2?\",\"correct_answer\":\"4\",\"incorrect_answers\":[\"3\",\"5\",\"6\"]}]}";
//      // FIXME: [sv 03-03-2025] httpResponse mock is not working properly, test will fail
        when(httpResponse.body()).thenReturn(jsonResponse);

        ResponseEntity<String> response = apiController.question();

        assertEquals(200, response.getStatusCodeValue());
        JSONObject responseBody = new JSONObject(response.getBody());
        assertEquals("What is 2+2?", responseBody.getString("question"));
        JSONArray incorrectAnswers = responseBody.getJSONArray("incorrect_answers");
        assertEquals(4, incorrectAnswers.length());
    }


    @Test
    public void testQuestionInvalidJsonResponse() throws IOException, InterruptedException {
        String invalidJsonResponse = "invalid json";
        // FIXME: [sv 03-03-2025] httpResponse mock is not working properly, test could fail
        when(httpResponse.body()).thenReturn(invalidJsonResponse);

        ResponseEntity<String> response = apiController.question();

        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    public void testCheckAnswer() throws IOException, InterruptedException, JSONException {
        String question = "What is 2+2?";
        String answer = "4";
        TriviaData triviaData = new TriviaData(question, answer);
        when(repository.findByQuestion(question)).thenReturn(List.of(triviaData));

        ResponseEntity<String> response = apiController.checkanswer(question);

        assertEquals(200, response.getStatusCodeValue());
        JSONObject responseBody = new JSONObject(response.getBody());
        assertEquals(answer, responseBody.getString("correct_answer"));
    }

    @Test
    public void testCheckAnswerRepositoryException() throws IOException, InterruptedException {
        String question = "What is 2+2?";
        when(repository.findByQuestion(question)).thenThrow(RuntimeException.class);

        ResponseEntity<String> response = apiController.checkanswer(question);

        assertEquals(500, response.getStatusCodeValue());
    }
}