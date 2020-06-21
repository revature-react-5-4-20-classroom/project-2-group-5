package com.g5.p2.controllers;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.g5.p2.exceptions.PictureNotFoundException;
import com.g5.p2.models.Pics;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.server.ResponseStatusException;
import com.g5.p2.services.PicsServiceImplementation;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import com.google.common.net.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RequestMapping(path = "/pics")
@RestController
public class PicsController {

  @Autowired
  PicsServiceImplementation picsService;

  @GetMapping("/{picId}")
  // public Pics getPicById(@PathVariable Integer picId) {
  // return picsService.getById(picId);
  public ResponseEntity<ByteArrayResource> downloadfile(@PathVariable Integer picId) {
    try {
      Pics pics = picsService.getfile(picId).get();
      return ResponseEntity.ok().contentType(MediaType.parseMediaType(pics.getPictureType()))
          .header(HttpHeaders.CONTENT_DISPOSITION,
              "attachment:filename=\"" + pics.getPictureName() + "\"")
          .body(new ByteArrayResource(pics.getPic()));
    } catch (PictureNotFoundException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Picture Not Found", e);
    }
  }

  // @PostMapping("/{picId}")
  // public boolean savePic(@RequestBody Integer picId) {
  // return picsService.deletePic(picId);
  // }

//  @DeleteMapping("/{picId}")
//  public boolean deletePicById(@PathVariable Integer picId) {
//    return picsService.deletePic(picId);
//  }

  @PostMapping(path = "/upload/{picId}", consumes = "multipart/form-data")
  public ResponseEntity<?> saveEnvironmentConfig(MultipartHttpServletRequest request,
      @PathVariable Integer picId) {
    // System.out.println(request.getContentType());
    MultipartFile file = request.getFile("file");
    picsService.saveFile(file, picId);
    return ResponseEntity.ok().body("picture uploaded");

    // public String uploadImage(@RequestParam("files") MultipartHttpServletRequest request) {
    // MultipartFile mPF = request.getFile(files);
    // System.out.println("vlsigje");
    // usersService.saveFile(mPF);
    // return "redirect:/";
  }


  // NEEDS ATTENTION TO BE COMPATIBLE WITH PICS TABLE
  // @GetMapping("showFile/{userId}")
  // public ResponseEntity<ByteArrayResource> downloadfile(@PathVariable Integer userId) {
  // Users users = usersService.getfile(userId).get();
  // return ResponseEntity.ok().contentType(MediaType.parseMediaType(users.getPictureType()))
  // .header(HttpHeaders.CONTENT_DISPOSITION,
  // "attachment:filename=\"" + users.getPictureName() + "\"")
  // .body(new ByteArrayResource(users.getPic()));
  //
  // }
}
