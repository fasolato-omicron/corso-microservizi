FROM maven:3.9.0-eclipse-temurin-19-alpine as build

RUN mkdir -p /usr/orders && cd /usr/orders
WORKDIR /usr/orders

COPY ./src/ ./src
COPY ./pom.xml .

RUN mvn verify --fail-never
RUN mvn clean package

FROM eclipse-temurin:19

RUN mkdir -p /usr/orders && cd /usr/orders
WORKDIR /usr/orders

COPY --from=build /usr/orders/target/Orders-1.0-SNAPSHOT.jar ./

ENTRYPOINT [ "java", "-jar", "Orders-1.0-SNAPSHOT.jar"]
