package com.sjorsverhoef.trivia.jpa;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class TriviaRepositoryTest {

    @Autowired
    private TriviaRepository triviaRepository;

    @BeforeEach
    public void setUp() {
        triviaRepository.deleteAll();
        triviaRepository.save(new TriviaData("What is 2+2?", "4"));
        triviaRepository.save(new TriviaData("What is the capital of France?", "Paris"));
    }

    @Test
    public void testFindByQuestion() {
        List<TriviaData> result = triviaRepository.findByQuestion("What is 2+2?");
        assertEquals(1, result.size());
        assertEquals("4", result.getFirst().getAnswer());
    }

    @Test
    public void testFindById() {
        TriviaData triviaData = new TriviaData("What is the capital of Germany?", "Berlin");
        triviaRepository.save(triviaData);
        TriviaData result = triviaRepository.findById(triviaData.getId()).orElse(null);
        assertNotNull(result);
        assertEquals("Berlin", result.getAnswer());
    }
}