package com.g5.p2.services;

import org.springframework.web.multipart.MultipartFile;
import com.g5.p2.models.Pics;

public interface PicsService {

  Pics getById(Integer picId);
  
  //Pics savePic(MultipartFile file);
  
  boolean deletePic(Integer picId);
}
