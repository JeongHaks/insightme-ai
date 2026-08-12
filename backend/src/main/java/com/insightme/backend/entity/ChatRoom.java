package com.insightme.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

// Java 클래스가 DB 테이블과 연결되는 객체 !
@Entity
@Table(name = "chat_rooms")
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    // chat_rooms 테이블의 기본키(PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    // 어떤 테스트 결과에서 시작된 상담방인지 구분하기 위한 ID
    @Column(name = "attempt_id", nullable = false)
    private UUID attemptId;

    // 채팅방 생성 시간
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // DB에 처음 저장되기 직전에 생성 시간을 넣는다.
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}