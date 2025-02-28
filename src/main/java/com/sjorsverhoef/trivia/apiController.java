package com.sjorsverhoef.trivia;

import com.sjorsverhoef.trivia.jpa.TriviaData;
import com.sjorsverhoef.trivia.jpa.TriviaRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.http.HttpStatus;

@RestController
public class apiController {

    private static final Logger log = LogManager.getLogger(apiController.class);

    @Autowired
    TriviaRepository repository;

    @GetMapping("/question")
    public ResponseEntity<String> question() throws IOException, InterruptedException {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://opentdb.com/api.php?amount=1"))
                    .build();
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());


            JSONObject responseBody = new JSONObject(response.body());
            JSONArray responseArray  = responseBody.getJSONArray("results");
            JSONObject responseData = responseArray.getJSONObject(0);

            String question = responseData.getString("question");
            String answer = responseData.getString("correct_answer");

            repository.save(new TriviaData(question, answer));

            responseData.getJSONArray("incorrect_answers").put(answer);
            responseData.remove("correct_answer");

            return ResponseEntity.ok(responseData.toString());
        } catch (Exception e) {
            log.error("Error: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkanswer")
    public ResponseEntity<String> checkanswer(@RequestParam(name = "question", required = true) String question) throws IOException, InterruptedException {
        try {
            String matchFound = repository.findByQuestion(question).getFirst().getAnswer();
            return ResponseEntity.ok(matchFound);
        } catch (Exception e) {
            log.error("Error: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}