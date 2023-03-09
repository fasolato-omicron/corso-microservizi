package it.omicronconsulting.tutoring.microservices;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:application.properties")
public class PropertiesBean {
    private Environment env;

    public PropertiesBean(Environment env) {
        this.env = env;
    }

    public String servicesOrdersUrl() {
        return env.getProperty("services.orders.url");
    }

    public String servicesWarehouseUrl() {
        return env.getProperty("services.warehouse.url");
    }

    public String springRabbitmqHost() {
        return env.getProperty("spring.rabbitmq.host");
    }
    public String springRabbitmqPort() {
        return env.getProperty("spring.rabbitmq.port");
    }
    public String springRabbitmqUsername() {
        return env.getProperty("spring.rabbitmq.username");
    }
    public String springRabbitmqPassword() {
        return env.getProperty("spring.rabbitmq.password");
    }
    public String rabbitmqQueue() {
        return env.getProperty("rabbitmq.queue");
    }
    public String rabbitmqExchange() {
        return env.getProperty("rabbitmq.exchange");
    }

    public String servicesQueueQueueA() {
        return env.getProperty("services.queue.queueA");
    }
    public String servicesQueueQueueB() {
        return env.getProperty("services.queue.queueB");
    }
}
