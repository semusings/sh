package dev.semusings.glowroot.tomcat.domain;

import static dev.semusings.glowroot.tomcat.domain.ProductCategoryTestSamples.*;
import static dev.semusings.glowroot.tomcat.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import dev.semusings.glowroot.tomcat.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProductTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    @Test
    void productCategoryTest() {
        Product product = getProductRandomSampleGenerator();
        ProductCategory productCategoryBack = getProductCategoryRandomSampleGenerator();

        product.setProductCategory(productCategoryBack);
        assertThat(product.getProductCategory()).isEqualTo(productCategoryBack);

        product.productCategory(null);
        assertThat(product.getProductCategory()).isNull();
    }
}