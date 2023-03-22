package de.esc.server.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RatingRepository extends JpaRepository<Rating, Long> {

    Rating findByUserIdAndCountryId(Long userId, Long countryId);
    Rating findById(long id);
    List<Rating> findRatingsByUserId(Long userId);
    List<Rating> findRatingsByCountryId(Long countryId);

}
