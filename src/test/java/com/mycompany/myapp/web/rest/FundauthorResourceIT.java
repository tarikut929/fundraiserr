package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Fundauthor;
import com.mycompany.myapp.repository.FundauthorRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link FundauthorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FundauthorResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHORID = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORID = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/fundauthors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FundauthorRepository fundauthorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFundauthorMockMvc;

    private Fundauthor fundauthor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fundauthor createEntity(EntityManager em) {
        Fundauthor fundauthor = new Fundauthor()
            .name(DEFAULT_NAME)
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .authorid(DEFAULT_AUTHORID)
            .email(DEFAULT_EMAIL);
        return fundauthor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fundauthor createUpdatedEntity(EntityManager em) {
        Fundauthor fundauthor = new Fundauthor()
            .name(UPDATED_NAME)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .authorid(UPDATED_AUTHORID)
            .email(UPDATED_EMAIL);
        return fundauthor;
    }

    @BeforeEach
    public void initTest() {
        fundauthor = createEntity(em);
    }

    @Test
    @Transactional
    void createFundauthor() throws Exception {
        int databaseSizeBeforeCreate = fundauthorRepository.findAll().size();
        // Create the Fundauthor
        restFundauthorMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isCreated());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeCreate + 1);
        Fundauthor testFundauthor = fundauthorList.get(fundauthorList.size() - 1);
        assertThat(testFundauthor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFundauthor.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testFundauthor.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testFundauthor.getAuthorid()).isEqualTo(DEFAULT_AUTHORID);
        assertThat(testFundauthor.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void createFundauthorWithExistingId() throws Exception {
        // Create the Fundauthor with an existing ID
        fundauthor.setId(1L);

        int databaseSizeBeforeCreate = fundauthorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFundauthorMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFundauthors() throws Exception {
        // Initialize the database
        fundauthorRepository.saveAndFlush(fundauthor);

        // Get all the fundauthorList
        restFundauthorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fundauthor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].authorid").value(hasItem(DEFAULT_AUTHORID)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }

    @Test
    @Transactional
    void getFundauthor() throws Exception {
        // Initialize the database
        fundauthorRepository.saveAndFlush(fundauthor);

        // Get the fundauthor
        restFundauthorMockMvc
            .perform(get(ENTITY_API_URL_ID, fundauthor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fundauthor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.authorid").value(DEFAULT_AUTHORID))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }

    @Test
    @Transactional
    void getNonExistingFundauthor() throws Exception {
        // Get the fundauthor
        restFundauthorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewFundauthor() throws Exception {
        // Initialize the database
        fundauthorRepository.saveAndFlush(fundauthor);

        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();

        // Update the fundauthor
        Fundauthor updatedFundauthor = fundauthorRepository.findById(fundauthor.getId()).get();
        // Disconnect from session so that the updates on updatedFundauthor are not directly saved in db
        em.detach(updatedFundauthor);
        updatedFundauthor
            .name(UPDATED_NAME)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .authorid(UPDATED_AUTHORID)
            .email(UPDATED_EMAIL);

        restFundauthorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFundauthor.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFundauthor))
            )
            .andExpect(status().isOk());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
        Fundauthor testFundauthor = fundauthorList.get(fundauthorList.size() - 1);
        assertThat(testFundauthor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFundauthor.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testFundauthor.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testFundauthor.getAuthorid()).isEqualTo(UPDATED_AUTHORID);
        assertThat(testFundauthor.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void putNonExistingFundauthor() throws Exception {
        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();
        fundauthor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFundauthorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fundauthor.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFundauthor() throws Exception {
        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();
        fundauthor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFundauthorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFundauthor() throws Exception {
        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();
        fundauthor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFundauthorMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFundauthorWithPatch() throws Exception {
        // Initialize the database
        fundauthorRepository.saveAndFlush(fundauthor);

        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();

        // Update the fundauthor using partial update
        Fundauthor partialUpdatedFundauthor = new Fundauthor();
        partialUpdatedFundauthor.setId(fundauthor.getId());

        partialUpdatedFundauthor.username(UPDATED_USERNAME).authorid(UPDATED_AUTHORID);

        restFundauthorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFundauthor.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFundauthor))
            )
            .andExpect(status().isOk());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
        Fundauthor testFundauthor = fundauthorList.get(fundauthorList.size() - 1);
        assertThat(testFundauthor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFundauthor.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testFundauthor.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testFundauthor.getAuthorid()).isEqualTo(UPDATED_AUTHORID);
        assertThat(testFundauthor.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    void fullUpdateFundauthorWithPatch() throws Exception {
        // Initialize the database
        fundauthorRepository.saveAndFlush(fundauthor);

        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();

        // Update the fundauthor using partial update
        Fundauthor partialUpdatedFundauthor = new Fundauthor();
        partialUpdatedFundauthor.setId(fundauthor.getId());

        partialUpdatedFundauthor
            .name(UPDATED_NAME)
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .authorid(UPDATED_AUTHORID)
            .email(UPDATED_EMAIL);

        restFundauthorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFundauthor.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFundauthor))
            )
            .andExpect(status().isOk());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
        Fundauthor testFundauthor = fundauthorList.get(fundauthorList.size() - 1);
        assertThat(testFundauthor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFundauthor.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testFundauthor.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testFundauthor.getAuthorid()).isEqualTo(UPDATED_AUTHORID);
        assertThat(testFundauthor.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    void patchNonExistingFundauthor() throws Exception {
        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();
        fundauthor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFundauthorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, fundauthor.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFundauthor() throws Exception {
        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();
        fundauthor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFundauthorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFundauthor() throws Exception {
        int databaseSizeBeforeUpdate = fundauthorRepository.findAll().size();
        fundauthor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFundauthorMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fundauthor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fundauthor in the database
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFundauthor() throws Exception {
        // Initialize the database
        fundauthorRepository.saveAndFlush(fundauthor);

        int databaseSizeBeforeDelete = fundauthorRepository.findAll().size();

        // Delete the fundauthor
        restFundauthorMockMvc
            .perform(delete(ENTITY_API_URL_ID, fundauthor.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fundauthor> fundauthorList = fundauthorRepository.findAll();
        assertThat(fundauthorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
