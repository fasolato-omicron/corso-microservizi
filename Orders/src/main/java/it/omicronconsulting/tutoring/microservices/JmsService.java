package it.omicronconsulting.tutoring.microservices;

import com.google.gson.Gson;
import it.omicronconsulting.tutoring.microservices.model.OrderRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class JmsService {
    private static Logger log = LoggerFactory.getLogger(JmsService.class);

    private PropertiesBean propertiesBean;

    private Gson gson;
    private RabbitTemplate rabbitTemplate;
    private Queue queueA;

    public JmsService(PropertiesBean propertiesBean, Gson gson, RabbitTemplate rabbitTemplate, Queue queueA) {
        this.propertiesBean = propertiesBean;
        this.gson = gson;
        this.rabbitTemplate = rabbitTemplate;
        this.queueA = queueA;
    }

    public void sendTestMessage(OrderRequest body) {
        rabbitTemplate.convertAndSend(queueA.getName(), gson.toJson(body));
    }


    @RabbitListener(queues = "queueB")
    public void listenToTestQueue(String message) {
        log.info("Message received {}", message);
    }
}
