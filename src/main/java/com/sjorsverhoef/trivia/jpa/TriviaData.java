package com.sjorsverhoef.trivia.jpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TriviaData {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String question;
    private String answer;

    protected TriviaData() {}

    public TriviaData(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%d, question='%s', answer='%s']",
                id, question, answer);
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }
}