package de.esc.server.data;

import org.springframework.data.jpa.repository.JpaRepository;



public interface RatingRepository extends JpaRepository<Rating, Long> {

    Rating findByUserIdAndCountryId(Long userId, Long countryId);
    Rating findById(long id);

}
