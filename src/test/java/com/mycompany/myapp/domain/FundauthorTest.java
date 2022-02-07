package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FundauthorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fundauthor.class);
        Fundauthor fundauthor1 = new Fundauthor();
        fundauthor1.setId(1L);
        Fundauthor fundauthor2 = new Fundauthor();
        fundauthor2.setId(fundauthor1.getId());
        assertThat(fundauthor1).isEqualTo(fundauthor2);
        fundauthor2.setId(2L);
        assertThat(fundauthor1).isNotEqualTo(fundauthor2);
        fundauthor1.setId(null);
        assertThat(fundauthor1).isNotEqualTo(fundauthor2);
    }
}
