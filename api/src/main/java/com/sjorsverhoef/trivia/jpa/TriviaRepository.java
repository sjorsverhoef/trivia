package com.sjorsverhoef.trivia.jpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface TriviaRepository extends CrudRepository<TriviaData, Long> {

    List<TriviaData> findByQuestion(String question);

    TriviaData findById(long id);
}


