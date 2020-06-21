package com.g5.p2.services;

import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import com.g5.p2.models.Pics;
import com.g5.p2.models.Users;

public interface PicsService {

  Pics getById(Integer picId);
  
  //Pics savePic(MultipartFile file);
  
  boolean deletePic(Integer picId);
  
  Pics saveFile(MultipartFile file, Integer id);

  Optional<Pics> getfile(Integer fileId);
}
