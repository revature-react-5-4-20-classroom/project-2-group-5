package com.g5.p2.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g5.p2.models.Messages;
import com.g5.p2.models.Users;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Integer>{
  Messages findByMessageId(Integer messageId);
  List<Messages> findByAuthor(Integer authorId); // Changed from (Users userId)
  //List<Messages> findByConversation(Users author, Users receiver);
}
