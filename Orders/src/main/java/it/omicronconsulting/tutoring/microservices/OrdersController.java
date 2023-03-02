package it.omicronconsulting.tutoring.microservices;

import it.omicronconsulting.tutoring.microservices.model.OrderRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    private static Logger log = LoggerFactory.getLogger(OrdersController.class);

    @GetMapping("/healthcheck")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("");
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmOrder(@RequestBody OrderRequest orderRequest) {
        log.info("Received order {}", orderRequest);

        if(orderRequest.getId() == null) {
            return ResponseEntity.internalServerError().body("Order ID must be a valid UUID");
        }
        if(orderRequest.getUserId() == null) {
            return ResponseEntity.internalServerError().body("Order user ID must be a valid UUID");
        }
        if(orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            return ResponseEntity.internalServerError().body("An order must have at least an item");
        }

        return ResponseEntity.internalServerError().body("TODO");
    }
}
