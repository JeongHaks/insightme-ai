# 1단계: Spring Boot 프로젝트를 빌드할 Java 17 환경
FROM eclipse-temurin:17-jdk AS build

# Docker 내부에서 작업할 폴더
WORKDIR /app

# backend 프로젝트의 모든 파일을 Docker 내부 /app으로 복사
COPY . .

# Gradle Wrapper에 실행 권한 부여
RUN chmod +x gradlew

# Spring Boot 프로젝트를 빌드해서 실행 가능한 jar 파일 생성
# 테스트는 배포 빌드 시간을 줄이고 테스트 실패로 배포가 막히는 것을 방지하기 위해 제외
RUN ./gradlew clean bootJar -x test


# 2단계: 실제 Spring Boot 서버를 실행할 Java 17 환경
# 빌드 도구가 필요 없으므로 JRE만 사용해서 이미지 크기를 줄임
FROM eclipse-temurin:17-jre

# 실제 서버가 실행될 Docker 내부 폴더
WORKDIR /app

# 위 build 단계에서 만들어진 jar 파일만 가져옴
COPY --from=build /app/build/libs/*.jar app.jar

# Render가 전달하는 PORT 환경변수를 Spring Boot 서버 포트로 사용
# PORT가 없으면 로컬 Docker 실행 시 8080 사용
ENV SERVER_PORT=${PORT:-8080}

# 컨테이너가 시작되면 Spring Boot를 prod 프로필로 실행
# → application-prod.properties 사용
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]