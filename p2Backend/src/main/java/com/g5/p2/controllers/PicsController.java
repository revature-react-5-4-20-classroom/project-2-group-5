package com.g5.p2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.g5.p2.models.Pics;
import com.g5.p2.services.PicsServiceImplementation;

@RequestMapping(path = "/pics")
@RestController
public class PicsController {

  @Autowired
  PicsServiceImplementation picsService;
  
  @GetMapping("/{picId}")
  public Pics getPicById(@PathVariable Integer picId) {
     return picsService.getById(picId);
  }
  
//  @PostMapping("/{picId}")
//  public boolean savePic(@RequestBody Integer picId) {
//     return picsService.deletePic(picId);
//  }
  
  @DeleteMapping("/{picId}")
  public boolean deletePicById(@PathVariable Integer picId) {
     return picsService.deletePic(picId);
  }
  
}
