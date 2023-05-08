package de.esc.server.controller;

import de.esc.server.data.Country;
import de.esc.server.data.Rating;
import de.esc.server.data.User;
import de.esc.server.services.ESCService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


import static java.util.stream.Collectors.toList;

@RestController
public class ESCController {

    private final ESCService escService;

    @Autowired
    public ESCController(final ESCService escService) {
        this.escService = escService;
    }

    //Methods for Users

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/rest/user")
    public List<User> getAllMembers() {

        return escService.getAllUsers().stream().map(user -> new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin())).collect(toList());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/rest/user")
    public Long createUser(@RequestBody final User user) {

        return escService.saveUser(user);
    }
    // Rest Call to get logged User
    @GetMapping("/rest/authenticate")
    @ResponseBody
    public User getUser(Principal principal) {

        User user = escService.getUserByName(principal.getName());
        return new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin());
    }

    //Methods for Countries
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/rest/country")
    public List<Country> getAllCountries() {

        return escService.getAllCountries();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/rest/country")
    public Long createCountry(@RequestBody final Country country) {

        return escService.saveCountry(country);
    }


    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("/rest/voting")
    public List<Rating> getCountriesToRate(final Long id) {

        return escService.getAllRatingsForCountry(id);
    }

    // Methods for Ratings

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/rest/ratings")
    public Long createRating(@RequestBody final Rating rating) {

        return escService.saveRating(rating);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/rest/ratings")
    public  Map<String, Object> getAllRatings() {

        List<SimpleRating> simpleRatingStream = escService.getAllRatings().stream()
                .sorted(Comparator.comparing(o -> o.getUser().getId())).map(rating -> new SimpleRating(rating.getUser().getId(), rating.getCountry().getId(), rating.getRating())).collect(toList());

        List<Country> countries = escService.getAllCountries();
        List<User> users = getAllMembers();

        return Map.of("users", users, "countries", countries, "ratings", simpleRatingStream);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    @GetMapping("/rest/user/ratings")
    public List<Map<String, Object>> getUserRatings(Principal principal) {

        User user = escService.getUserByName(principal.getName());
        final List<Country> countries = escService.getAllCountries();
        final List<Rating> userRatings = escService.getAllRatingsForUser(user.getId());
        return countries.stream().map(country -> toJson(country,userRatings)).collect(toList());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PutMapping("/rest/user/ratings")
    public void updateRatings(Principal principal, @RequestBody List<Map<String, Object>> ratings) {

        User user = escService.getUserByName(principal.getName());
        escService.updateRating(ratings, user.getId());
    }


    private Map<String, Object> toJson(final Country country,List<Rating> ratings ) {
        final Map<String, Object> result = new HashMap<>();
        result.put("countryId", country.getId());
        result.put("countryName", country.getName());
        result.put("countryFlag", country.getFlag());
        result.put("countryInterpret", country.getInterpret());
        result.put("countrySong", country.getSongname());

        Rating rating = ratings.stream().filter(rating1 -> rating1.getCountry().equals(country)).findFirst().orElse(null);
        if(rating != null) {
            result.put("ratingValue", rating.getRating());
        } else {
            result.put("ratingValue", null);
        }
        return result;

    }

    private class SimpleRating {
        Long userId;
        Long countryId;
        Double Rating;

        public SimpleRating(Long userId, Long countryId, Double rating) {
            this.userId = userId;
            this.countryId = countryId;
            Rating = rating;
        }

        public Long getUserId() {
            return userId;
        }

        public Long getCountryId() {
            return countryId;
        }

        public Double getRating() {
            return Rating;
        }
    }


}
