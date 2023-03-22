package de.esc.server.services;

import de.esc.server.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ESCService {

    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;
    private final CountryRepository countryRepository;


    @Autowired
    public ESCService(final UserRepository userRepository, final RatingRepository ratingRepository, final CountryRepository countryRepository) {

        this.userRepository = userRepository;
        this.ratingRepository = ratingRepository;
        this.countryRepository = countryRepository;

    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Long saveUser(User user) {

        return userRepository.save(user).getId();
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Long saveCountry(Country country) {

        return countryRepository.save(country).getId();
    }

    public List<Rating> getAllRatings(){
        return ratingRepository.findAll();
    }

    public List<Rating> getAllRatingsForUser(Long id) {

        return ratingRepository.findRatingsByUserId(id);
    }

    public Optional<User> getUser(Long id) {

        return userRepository.findById(id);
    }

    public Optional<Country> getCountry(Long id) {

        return countryRepository.findById(id);
    }

    public List<Rating> getAllRatingsForCountry(Long id) {

        return ratingRepository.findRatingsByCountryId(id);
    }

    public Long saveRating(Rating rating) {
        return ratingRepository.save(rating).getId();
    }

    public Long updateRating(Rating rating) {

        Rating updateRating = ratingRepository.findByUserIdAndCountryId(rating.getUser().getId(), rating.getCountry().getId());

        updateRating.setRating(rating.getRating());

        return ratingRepository.save(updateRating).getId();
    }

    public User getUserByName(String name) {

        return userRepository.findByName(name);
    }
}
