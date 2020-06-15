package com.g5.p2.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import com.g5.p2.exceptions.MessageNotFoundException;
import com.g5.p2.exceptions.NotYetImplementedException;
import com.g5.p2.models.Messages;
import com.g5.p2.models.Users;
import com.g5.p2.repositories.MessagesRepository;
import com.g5.p2.repositories.UsersRepository;

@Service
@Primary
public class MessagesServiceImplementation implements MessagesService {

  @Autowired
  MessagesRepository messagesRepository;
  @Autowired
  UsersRepository usersRepository;
  
  @Override
  public List<Messages> getAll() {
    return messagesRepository.findAll(); 
  }

  @Override
  public Messages getById(Integer messageId) {
    Optional<Messages> m = messagesRepository.findById(messageId);
    if(m.isPresent()) {
        return m.get();
    }
    else {
        throw new MessageNotFoundException();
    }
  }
  
  @Override
  public List<Messages> getByAuthor(Integer authorId) {
    Optional<Users> author = usersRepository.findById(authorId);
    return messagesRepository.findByReceiver(author.get());
  }

  @Override
  public List<Messages> getByAuthorAndUser(Integer authorId, Integer userId) {
    Optional<Users> author = usersRepository.findById(authorId);
    Optional<Users> currUser = usersRepository.findById(userId);
    List<Messages> authToUserMessages = messagesRepository.findByAuthorAndReceiver(author.get(), currUser.get());
    List<Messages> userToAuthMessages = messagesRepository.findByAuthorAndReceiver(currUser.get(), author.get());
    authToUserMessages.addAll(userToAuthMessages);
    return authToUserMessages; // think this had (User userid too?)
  }


  @Override
  public Messages create(Messages m, Integer author, Integer receiver) {
    m.setMessageId(messagesRepository.findAll().get(messagesRepository.findAll().size()-1).getMessageId() + 1);
    m.setAuthor(usersRepository.findByUserId(author));
    m.setReceiver(usersRepository.findByUserId(receiver));
    return messagesRepository.save(m);
  }

  @Override
  public Messages update(Messages m, Integer author, Integer receiver) {
    m.setAuthor(usersRepository.findByUserId(author));
    m.setReceiver(usersRepository.findByUserId(receiver));
    Optional<Messages> existingMessage = messagesRepository.findById(m.getMessageId());
    if(existingMessage.isPresent()) {
        return messagesRepository.save(m);
    }
    else {
        throw new MessageNotFoundException();
    }
  }

  @Override
  public Messages createOrUpdate(Messages m) {
    return messagesRepository.save(m);
  }

  @Override
  public boolean delete(Integer messageId) {
    Optional<Messages> existingMessage = messagesRepository.findById(messageId);
    if(existingMessage.isPresent()) {
        messagesRepository.deleteById(messageId);
        return true;
    }
    else {
        return false;
    }
  }

}
