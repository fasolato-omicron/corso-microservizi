package it.omicronconsulting.tutoring.microservices.model;

import java.util.List;
import java.util.UUID;

public class OrderRequest {
    private UUID id;
    private UUID userId;
    private UUID paymentId;
    private List<Item> items;
    private String status;
    private String notes;

    public OrderRequest() {
    }

    public OrderRequest(UUID id, UUID userId, UUID paymentId, List<Item> items, String status, String notes) {
        this.id = id;
        this.userId = userId;
        this.paymentId = paymentId;
        this.items = items;
        this.status = status;
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "OrderRequest{" +
                "id=" + id +
                ", userId=" + userId +
                ", paymentId=" + paymentId +
                ", items=" + items +
                ", status='" + status + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(UUID paymentId) {
        this.paymentId = paymentId;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
