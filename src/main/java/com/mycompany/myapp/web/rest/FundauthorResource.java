package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Fundauthor;
import com.mycompany.myapp.repository.FundauthorRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Fundauthor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FundauthorResource {

    private final Logger log = LoggerFactory.getLogger(FundauthorResource.class);

    private static final String ENTITY_NAME = "fundauthor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FundauthorRepository fundauthorRepository;

    public FundauthorResource(FundauthorRepository fundauthorRepository) {
        this.fundauthorRepository = fundauthorRepository;
    }

    /**
     * {@code POST  /fundauthors} : Create a new fundauthor.
     *
     * @param fundauthor the fundauthor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fundauthor, or with status {@code 400 (Bad Request)} if the fundauthor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fundauthors")
    public ResponseEntity<Fundauthor> createFundauthor(@RequestBody Fundauthor fundauthor) throws URISyntaxException {
        log.debug("REST request to save Fundauthor : {}", fundauthor);
        if (fundauthor.getId() != null) {
            throw new BadRequestAlertException("A new fundauthor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fundauthor result = fundauthorRepository.save(fundauthor);
        return ResponseEntity
            .created(new URI("/api/fundauthors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fundauthors/:id} : Updates an existing fundauthor.
     *
     * @param id the id of the fundauthor to save.
     * @param fundauthor the fundauthor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fundauthor,
     * or with status {@code 400 (Bad Request)} if the fundauthor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fundauthor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fundauthors/{id}")
    public ResponseEntity<Fundauthor> updateFundauthor(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Fundauthor fundauthor
    ) throws URISyntaxException {
        log.debug("REST request to update Fundauthor : {}, {}", id, fundauthor);
        if (fundauthor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fundauthor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fundauthorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Fundauthor result = fundauthorRepository.save(fundauthor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fundauthor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /fundauthors/:id} : Partial updates given fields of an existing fundauthor, field will ignore if it is null
     *
     * @param id the id of the fundauthor to save.
     * @param fundauthor the fundauthor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fundauthor,
     * or with status {@code 400 (Bad Request)} if the fundauthor is not valid,
     * or with status {@code 404 (Not Found)} if the fundauthor is not found,
     * or with status {@code 500 (Internal Server Error)} if the fundauthor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/fundauthors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Fundauthor> partialUpdateFundauthor(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Fundauthor fundauthor
    ) throws URISyntaxException {
        log.debug("REST request to partial update Fundauthor partially : {}, {}", id, fundauthor);
        if (fundauthor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fundauthor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fundauthorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Fundauthor> result = fundauthorRepository
            .findById(fundauthor.getId())
            .map(existingFundauthor -> {
                if (fundauthor.getName() != null) {
                    existingFundauthor.setName(fundauthor.getName());
                }
                if (fundauthor.getUsername() != null) {
                    existingFundauthor.setUsername(fundauthor.getUsername());
                }
                if (fundauthor.getPassword() != null) {
                    existingFundauthor.setPassword(fundauthor.getPassword());
                }
                if (fundauthor.getAuthorid() != null) {
                    existingFundauthor.setAuthorid(fundauthor.getAuthorid());
                }
                if (fundauthor.getEmail() != null) {
                    existingFundauthor.setEmail(fundauthor.getEmail());
                }

                return existingFundauthor;
            })
            .map(fundauthorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fundauthor.getId().toString())
        );
    }

    /**
     * {@code GET  /fundauthors} : get all the fundauthors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fundauthors in body.
     */
    @GetMapping("/fundauthors")
    public List<Fundauthor> getAllFundauthors() {
        log.debug("REST request to get all Fundauthors");
        return fundauthorRepository.findAll();
    }

    /**
     * {@code GET  /fundauthors/:id} : get the "id" fundauthor.
     *
     * @param id the id of the fundauthor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fundauthor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fundauthors/{id}")
    public ResponseEntity<Fundauthor> getFundauthor(@PathVariable Long id) {
        log.debug("REST request to get Fundauthor : {}", id);
        Optional<Fundauthor> fundauthor = fundauthorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fundauthor);
    }

    /**
     * {@code DELETE  /fundauthors/:id} : delete the "id" fundauthor.
     *
     * @param id the id of the fundauthor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fundauthors/{id}")
    public ResponseEntity<Void> deleteFundauthor(@PathVariable Long id) {
        log.debug("REST request to delete Fundauthor : {}", id);
        fundauthorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
