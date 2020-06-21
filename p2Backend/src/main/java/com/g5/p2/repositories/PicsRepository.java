package com.g5.p2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g5.p2.models.Pics;

@Repository
public interface PicsRepository extends JpaRepository<Pics, Integer>{

  Pics findByPicId(Integer picId);
  
}
