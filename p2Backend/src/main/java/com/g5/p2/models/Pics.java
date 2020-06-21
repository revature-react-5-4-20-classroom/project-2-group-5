package com.g5.p2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "pics")
public class Pics {

  @Id
  @Column(name = "pic_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer picId;
  @Column(name = "picture_name")
  private String pictureName;
  @Column(name = "picture_type")
  private String pictureType;
  @Lob
  private byte[] pic;
  
  public Pics() {
    super();
  }

  public Pics(Integer picId, String pictureName, String pictureType, byte[] pic) {
    super();
    this.picId = picId;
    this.pictureName = pictureName;
    this.pictureType = pictureType;
    this.pic = pic;
  }

  public Integer getPicId() {
    return picId;
  }

  public void setPicId(Integer picId) {
    this.picId = picId;
  }

  public String getPictureName() {
    return pictureName;
  }

  public void setPictureName(String pictureName) {
    this.pictureName = pictureName;
  }

  public String getPictureType() {
    return pictureType;
  }

  public void setPictureType(String pictureType) {
    this.pictureType = pictureType;
  }

  public byte[] getPic() {
    return pic;
  }

  public void setPic(byte[] pic) {
    this.pic = pic;
  }
  
  
  
}
