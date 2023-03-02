package it.omicronconsulting.tutoring.microservices.model;

import java.util.UUID;

public class Item {
    private UUID id;
    private Integer quantity;
    private Double unitPrice;

    public Item() {
    }

    public Item(UUID id, Integer quantity, Double unitPrice) {
        this.id = id;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                '}';
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
