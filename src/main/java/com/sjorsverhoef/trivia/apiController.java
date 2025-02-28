package com.sjorsverhoef.trivia;

import com.sjorsverhoef.trivia.jpa.TriviaData;
import com.sjorsverhoef.trivia.jpa.TriviaRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/questions")
    public ResponseEntity<String> questions() throws IOException, InterruptedException {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://opentdb.com/api.php?amount=1"))
                    .build();
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            repository.save(new TriviaData("test", "test"));

            return ResponseEntity.ok(response.body());
        } catch (Exception e) {
            log.error("Error: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkanswer")
    public ResponseEntity<String> checkanswer() throws IOException, InterruptedException {
        try {
            String matchFound = repository.findByQuestion("test").getFirst().getAnswer();
            return ResponseEntity.ok(matchFound);
        } catch (Exception e) {
            log.error("Error: ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}