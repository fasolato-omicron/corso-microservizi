# Corso Microservizi

Progetto con gli esercizi del corso microservizi. Il progetto si compone di tre progetti, organizzati secondo questo schema:

![](.img/Esercizio%201%20overview.png)

I progetti sono:

- **Orders**: applicazione SpringBoot richiamata dall'utente per avviare la conferma di un ordine
- **Warehouse** - applicazione node (ExpressJs) per la gestione di giacenza del magazzino
- **Payments** - applicazione node (ExpressJs) per la gestione dei pagamenti ordine

Il processo prevede che venga richiesta la conferma di un ordine a **Orders**, che a sua volta fa scattare una chiamata a **Warehouse** per il controllo di giacenza a magazzino e una chiamata a **Payments** per il controllo del pagamento dell'ordine. Se entrambi i servizi rispondono OK si può dare conferma all'utente finale.

## Orders

Applicazione SpringBoot, senza DB, che funge da front-end verso l'utente.

### Configurazione

### Build ed esecuzione

L'applicazione è SpringBoot standard su JDK 19. Per compilare il progetto si lancia `mvn clean package`, dopodichè il jar da lanciare si trova in `Orders/target/Orders-1.0-SNAPSHOT.jar` e può essere lanciato con `java -jar Orders/target/Orders-1.0-SNAPSHOT.jar <paramteri>`

### Uso

Il servizio ha i seguenti endpoint:

- `GET localhost:8080/orders/healthcheck`
  - Metodo che risponde sempre `200 OK`
- `POST localhost:8080/orders/confirm`

  - Body:

    ```json
    {
      "id": "6f7a80b9-6e65-4483-80d4-00011b94a584",
      "items": [
        {
          "id": "c83aec45-1df1-4a1b-816e-6e980c020e6d",
          "quantity": 2,
          "unitPrice": 12.45
        }
      ],
      "userId": "0e979720-52cf-4349-8930-98315da8373d"
    }
    ```

  - Il metodo controlla la disponibilità degli Item dell'ordine e il pagamento dell'ordine e in base a quello restituisce un risultato positivo o negativo

## Warehouse

Applicazione node js (node versione 16.19), su DB sqlite che espone un'API Rest.

### Configurazione

Tramite il file `.env` si possono impostare:

- `PORT`: la porta su cui si avvia il server
- `DATABASE_PATH`: il path del database sqlite

Il database va creato e configurato utilizzando lo script `Warehouse/db.sql`

### Build ed esecuzione

Dopo aver installato le dipendenze con `npm install` si avvia l'applicazione con `npm start`

### Uso

- `GET localhost:3000/warehouse/healthcheck`
  - Metodo che risponde sempre `200 OK`
- `POST localhost:3000/warehouse/send_items`
  - Body:

    ```json
    {
    "id": "fb7890ce-314c-430f-8e4f-82039bbb8566",
    "items": [
        { "id": "c83aec45-1df1-4a1b-816e-6e980c020e6d", "quantity": 2 },
        { "id": "15fc188f-963b-4df4-8065-85f1c03f44e4", "quantity": 10 }
    ]
    }
    ```
  - Il metodo controlla la disponibilità dei pezzi e se presenti ne aggiorna la giacenza e risponde con uno stato OK

## Payments

Applicazione node js (node versione 16.19), su DB sqlite che espone un'API Rest.

### Configurazione

Tramite il file `.env` si possono impostare:

- `PORT`: la porta su cui si avvia il server
- `DATABASE_PATH`: il path del database sqlite

Il database va creato e configurato utilizzando lo script `Payments/db.sql`

### Build ed esecuzione

Dopo aver installato le dipendenze con `npm install` si avvia l'applicazione con `npm start`

### Uso

- `GET localhost:3001/payments/healthcheck`
  - Metodo che risponde sempre `200 OK`
- `POST localhost:3001/payments/pay/{id}/{userId}`
  - Metodo che conferma il pagamento con id e userId passati in input
- `GET localhost:3001/payments/{id}/check`
  - Metodo che restituisce OK se il pagamento con ID passato e' stato confermato
