package com.insightme.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 채팅방에서 주고받은 실제 메시지를 저장하는 Entity
 * 사용자 질문과 AI 답변을 각각 한 줄씩 chat_messages 테이블에 저장하기 위해
 */
@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {

    // 메시지 고유 ID(PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    // 어떤 채팅방의 메시지인지
    @Column(name = "chat_room_id", nullable = false)
    private Long chatRoomId;

    // 메시지를 작성한 주체
    // 예: USER, AI
    @Column(name = "role", nullable = false)
    private String role;

    // 실제 채팅 내용
    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    // 메시지 생성 시간
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // DB에 저장되기 직전에 생성 시간을 자동으로 넣는다.
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
