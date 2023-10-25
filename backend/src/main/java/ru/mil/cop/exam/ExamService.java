package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mil.cop.attempt.dto.AttemptInfoDto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import com.opencsv.CSVWriter;

@Service
@AllArgsConstructor
public class ExamService {

    public byte[] generateCsvBytes(List<AttemptInfoDto> attempts) {

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (CSVWriter writer = new CSVWriter(new OutputStreamWriter(byteArrayOutputStream, StandardCharsets.UTF_8))) {
            String[] header = {"Фамилия", "Имя", "Отчество", "Группа", "Общее количество вопросов", "Количество правильных ответов", "Результат"};
            writer.writeNext(header);
            for (AttemptInfoDto attempt : attempts) {
                String[] data = {attempt.getSurname(), attempt.getName(), attempt.getSurname(), attempt.getGroupNumber(), String.valueOf(attempt.getTotalCount()), String.valueOf(attempt.getRightCount()), checkResult(attempt)};
                writer.writeNext(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return byteArrayOutputStream.toByteArray();
    }

    private static String checkResult(AttemptInfoDto attempt) {
        int total = attempt.getTotalCount();
        int right = attempt.getRightCount();

        if (total == 0 || right == 0) {
            return "Неудовлетворительно"; // Если total или right равны нулю, результат - "Неудовлетворительно"
        }

        int res = (total * 100) / right;
        return res > 75 ? "Отлично" : res > 50 ? "Хорошо" : res > 25 ? "Удовлетворительно" : "Неудовлетворительно";
    }
}
