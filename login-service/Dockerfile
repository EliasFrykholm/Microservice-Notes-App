#
# Build stage
#
FROM maven:3.8.2-openjdk-16-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM adoptopenjdk:16-jre
COPY --from=build /home/app/target/login-service-0.0.1-SNAPSHOT.jar /usr/app/login-service.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/login-service.jar"]