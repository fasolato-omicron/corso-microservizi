package it.omicronconsulting.tutoring.microservices;

import it.omicronconsulting.tutoring.microservices.model.OrderRequest;
import it.omicronconsulting.tutoring.microservices.model.warehouse.WarehouseItem;
import it.omicronconsulting.tutoring.microservices.model.warehouse.WarehouseRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    private static Logger log = LoggerFactory.getLogger(OrdersController.class);

    private PropertiesBean propertiesBean;

    public OrdersController(PropertiesBean propertiesBean) {
        this.propertiesBean = propertiesBean;
    }

    @GetMapping("/healthcheck")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("");
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmOrder(@RequestBody OrderRequest orderRequest) {
        log.info("Received order {}", orderRequest);

        if(orderRequest.getId() == null) {
            return ResponseEntity.badRequest().body("Order ID must be a valid UUID");
        }
        if(orderRequest.getUserId() == null) {
            return ResponseEntity.badRequest().body("Order user ID must be a valid UUID");
        }
        if(orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("An order must have at least an item");
        }

        WarehouseRequest warehouseRequest = new WarehouseRequest(
                orderRequest.getId(),
                orderRequest.getItems().stream().map(i -> new WarehouseItem(i.getId(), i.getQuantity())).toList()
        );

        WebClient warehouseClient = WebClient.create(propertiesBean.servicesWarehouseUrl());
        try {
            String res = warehouseClient
                    .post()
                    .uri("/send_items")
                    .bodyValue(warehouseRequest)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(Duration.ofSeconds(10));
            log.info("Result {}", res);
        } catch (WebClientResponseException e) {
            log.error("Client returned an error", e);
        }

        return ResponseEntity.internalServerError().body("TODO");
    }
}
