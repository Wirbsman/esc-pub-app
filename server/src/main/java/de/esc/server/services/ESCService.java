package de.esc.server.services;

import de.esc.server.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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

    public List<Rating> getAllRatings() {
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

    public void updateRating(List<Map<String, Object>> ratings, long userId) {

        ratings.forEach(value -> {
            long countryId = ((Number) value.get("countryId")).longValue();
            Number ratingValue = (Number) value.get("ratingValue");
            Double newRating = ratingValue != null ? ratingValue.doubleValue() : null;

            Rating rating = ratingRepository.findByUserIdAndCountryId(userId, countryId);

                 if(rating != null){

                     rating.setRating(newRating);
                     ratingRepository.save(rating);

                 } else {
                     ratingRepository.save(new Rating(userRepository.findById(userId), countryRepository.findById(countryId),newRating));
                 }
        });

    }

    public User getUserByName(String name) {

        return userRepository.findByName(name);
    }


    public void updateUser(long id, User user) {

        User updateUser = userRepository.findById(id);
        if (updateUser != null) {

            updateUser.setName(user.getName());
            updateUser.setIcon(user.getIcon());
            updateUser.setAdmin(user.isAdmin());

            userRepository.save(updateUser);

        } /*TODO ThrowException */
    }

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}
