package it.omicronconsulting.tutoring.microservices.model.warehouse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WarehouseRequest(UUID id, List<WarehouseItem> items) {
}
