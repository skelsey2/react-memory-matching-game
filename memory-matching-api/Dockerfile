FROM openjdk:8-jdk-alpine
COPY target/memory-matching-api-*.jar app.jar
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]
