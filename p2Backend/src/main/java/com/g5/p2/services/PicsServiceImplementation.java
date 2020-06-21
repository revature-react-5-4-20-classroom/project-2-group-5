package com.g5.p2.services;

import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import com.g5.p2.models.Pics;
import com.g5.p2.repositories.PicsRepository;

@Service
@Primary
@Transactional
public class PicsServiceImplementation implements PicsService {

  @Autowired
  PicsRepository picsRepository;
  
  @Override
  public Pics getById(Integer picId) {
    
    return picsRepository.findByPicId(picId);
  }

  //Pics savePic(MultipartFile file);
  
  @Override
  public boolean deletePic(Integer picId) {
    Optional<Pics> existingPic = picsRepository.findById(picId);
    if (existingPic.isPresent()) {
      picsRepository.deleteById(picId);
      return true;
    } else {
      return false;
    }
  }

}
