package com.g5.p2.services;

import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.g5.p2.exceptions.PictureNotFoundException;
import com.g5.p2.models.Pics;
import com.g5.p2.models.Users;
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

  // Pics savePic(MultipartFile file);

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



  @Override
  public Pics saveFile(MultipartFile file, Integer id) {
    String docname = file.getOriginalFilename();
    try {
//      Users user = this.getById(id);
//      user.setPictureName(docname);
//      user.setPictureType(file.getContentType());
//      user.setPic(file.getBytes());

      // Users user = new Users("username1513", "password15", "alias15", "role15", docname,
      // file.getContentType(),
      // file.getBytes());
      // user.setUserId(usersRepository.findAll().get(usersRepository.findAll().size() -
      // 1).getUserId() + 1);
      Pics pic = new Pics(id,docname,file.getContentType(),file.getBytes());
      return picsRepository.save(pic);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  // getting image by user id
  @Override
  public Optional<Pics> getfile(Integer fileId) {
    Optional<Pics> pic= picsRepository.findById(fileId);
    if(pic.isPresent()) {
      return pic;
    }
    else {
     throw new PictureNotFoundException();
    }
  }
}
