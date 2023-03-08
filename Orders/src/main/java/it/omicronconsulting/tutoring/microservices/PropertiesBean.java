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
}
