package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Fundauthor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Fundauthor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FundauthorRepository extends JpaRepository<Fundauthor, Long> {}
