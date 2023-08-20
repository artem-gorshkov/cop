package ru.mil.cop.model;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import ru.mil.cop.exam.ExamEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "attempts")
@NoArgsConstructor
@AllArgsConstructor
@TypeDefs(@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class))
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

    @Type(type = "jsonb")
    @Column(columnDefinition = "json")
    private List<List<Integer>> userAnswers;

    private Integer totalCorrectAnswers;
}
