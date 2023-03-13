package de.esc.server.services;

import de.esc.server.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Rating> getAllRatingsForCountry(Long id) {

        return ratingRepository.findRatingsByCountryId(id);
    }
}
