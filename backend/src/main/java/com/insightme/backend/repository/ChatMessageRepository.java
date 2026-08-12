package com.insightme.backend.repository;

import com.insightme.backend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 채팅 메시지 DB 접근 Repository
 */
public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {

    /**
     * 특정 채팅방의 전체 메시지를 오래된 순서대로 조회한다.
     * 사용자 질문과 AI 답변을 저장하고, 나중에 기존 상담을 이어서 할 때 같은 채팅방의 메시지를 시간순으로 불러
     */
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtAsc(Long chatRoomId);
}
