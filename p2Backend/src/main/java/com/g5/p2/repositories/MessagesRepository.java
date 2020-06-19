package com.g5.p2.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.g5.p2.models.Messages;
import com.g5.p2.models.Users;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Integer>{
  Messages findByMessageId(Integer messageId);

  @Query(value = "SELECT * FROM messages m WHERE (author = :userId) OR (receiver = :userId) ORDER BY message_id", nativeQuery=true)
  List<Messages> findByReceiverorAuthor(Users userId); 
  
  @Query(value = "SELECT * FROM messages WHERE (author = :author and receiver = :receiver) or (author = :receiver and receiver = :author) ORDER BY message_id",  nativeQuery = true)
  List<Messages> findByAuthorAndReceiver(Users author, Users receiver); 
  
}
