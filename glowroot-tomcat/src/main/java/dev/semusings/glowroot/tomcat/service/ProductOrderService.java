package dev.semusings.glowroot.tomcat.service;

import dev.semusings.glowroot.tomcat.domain.ProductOrder;
import dev.semusings.glowroot.tomcat.repository.ProductOrderRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link dev.semusings.glowroot.tomcat.domain.ProductOrder}.
 */
@Service
@Transactional
public class ProductOrderService {

    private static final Logger LOG = LoggerFactory.getLogger(ProductOrderService.class);

    private final ProductOrderRepository productOrderRepository;

    public ProductOrderService(ProductOrderRepository productOrderRepository) {
        this.productOrderRepository = productOrderRepository;
    }

    /**
     * Save a productOrder.
     *
     * @param productOrder the entity to save.
     * @return the persisted entity.
     */
    public ProductOrder save(ProductOrder productOrder) {
        LOG.debug("Request to save ProductOrder : {}", productOrder);
        return productOrderRepository.save(productOrder);
    }

    /**
     * Update a productOrder.
     *
     * @param productOrder the entity to save.
     * @return the persisted entity.
     */
    public ProductOrder update(ProductOrder productOrder) {
        LOG.debug("Request to update ProductOrder : {}", productOrder);
        return productOrderRepository.save(productOrder);
    }

    /**
     * Partially update a productOrder.
     *
     * @param productOrder the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProductOrder> partialUpdate(ProductOrder productOrder) {
        LOG.debug("Request to partially update ProductOrder : {}", productOrder);

        return productOrderRepository
            .findById(productOrder.getId())
            .map(existingProductOrder -> {
                if (productOrder.getQuantity() != null) {
                    existingProductOrder.setQuantity(productOrder.getQuantity());
                }
                if (productOrder.getTotalPrice() != null) {
                    existingProductOrder.setTotalPrice(productOrder.getTotalPrice());
                }

                return existingProductOrder;
            })
            .map(productOrderRepository::save);
    }

    /**
     * Get all the productOrders.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProductOrder> findAll() {
        LOG.debug("Request to get all ProductOrders");
        return productOrderRepository.findAll();
    }

    /**
     * Get all the productOrders with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ProductOrder> findAllWithEagerRelationships(Pageable pageable) {
        return productOrderRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one productOrder by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductOrder> findOne(Long id) {
        LOG.debug("Request to get ProductOrder : {}", id);
        return productOrderRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the productOrder by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete ProductOrder : {}", id);
        productOrderRepository.deleteById(id);
    }
}
