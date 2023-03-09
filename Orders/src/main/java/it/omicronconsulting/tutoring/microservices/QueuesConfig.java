package it.omicronconsulting.tutoring.microservices;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class QueuesConfig {
    private PropertiesBean propertiesBean;

    public QueuesConfig(PropertiesBean propertiesBean) {
        this.propertiesBean = propertiesBean;
    }

    @Bean
    public Queue queueA() {
        return new Queue(propertiesBean.servicesQueueQueueA(), false);
    }

    @Bean
    public Queue queueB() {
        return new Queue(propertiesBean.servicesQueueQueueB(), false);
    }
}
