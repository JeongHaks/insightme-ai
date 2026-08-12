package com.insightme.backend.repository;

import com.insightme.backend.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

/**
 * 채팅방 DB 접근 Repository
 * attemptId로 이미 만들어진 채팅방이 있는지 찾고, 없으면 새로 만들기 위해
 */
public interface ChatRoomRepository
        extends JpaRepository<ChatRoom, Long> {

    /**
     * 특정 테스트 실행에 연결된 채팅방을 조회한다.
     * UUID : 중복 방지를 위한 고유한 ID
     */
    Optional<ChatRoom> findByAttemptId(UUID attemptId);
}
