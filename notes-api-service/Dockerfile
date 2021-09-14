#get a base image
FROM golang:1.16-buster
MAINTAINER Elias Frykholm <elias.frykholm@cygni.se>
WORKDIR /app
COPY ./src .
RUN go mod download
RUN go build -v -o ./notes-api-service ./cmd/api
CMD ["./notes-api-service"]