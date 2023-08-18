package ru.mil.cop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mil.cop.exam.ExamEntity;

import javax.persistence.*;

@Entity
@Data
@Table(name = "attempts")
@NoArgsConstructor
@AllArgsConstructor
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "examId")
    private ExamEntity exam;

    @Enumerated(EnumType.STRING)
    @Column(name = "attemptStatus")
    private AttemptStatus attemptStatus;
}
