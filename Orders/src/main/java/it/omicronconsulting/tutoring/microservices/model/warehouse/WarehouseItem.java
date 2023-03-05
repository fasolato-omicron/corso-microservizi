package it.omicronconsulting.tutoring.microservices.model.warehouse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public record WarehouseItem(UUID id, Integer quantity) {
}
