package de.esc.server.controller;

import de.esc.server.data.Country;
import de.esc.server.data.Rating;
import de.esc.server.data.User;
import de.esc.server.services.ESCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;


import static java.util.stream.Collectors.toList;

@RestController
public class ESCController {

    private final ESCService escService;

    @Autowired
    public ESCController(final ESCService escService) {
        this.escService = escService;
    }

    //Methods for Users

    @GetMapping("/member")
    public List<User> getAllMembers() {

        return escService.getAllUsers().stream().map(user -> new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin())).collect(toList());
    }

    @PostMapping("/member")
    public Long createUser(@RequestBody final User user) {

        return escService.saveUser(user);
    }

    @GetMapping("/authenticate")
    public User getUser(Authentication authentication) {

        User user = escService.getUserByName(authentication.getName());
        return new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin());
    }

    //Methods for Countries

    @GetMapping("/country")
    public List<Country> getAllCountries() {

        return escService.getAllCountries();
    }

    @PostMapping("/country")
    public Long createCountry(@RequestBody final Country country) {

        return escService.saveCountry(country);
    }

    // TODO : Adjust as this below will not work
    @GetMapping("/country/{id}/ratings")
    public List<Rating> getCountryRatings(@PathVariable("id") final Long id) {

        return escService.getAllRatingsForCountry(id);
    }

    // Methods for Ratings

    @PostMapping("/rating")
    public Long createRating(@RequestBody final Rating rating) {

        return escService.saveRating(rating);
    }

    @PutMapping("/rating")
    public Long updateRating(@RequestBody final Rating rating) {

        return escService.updateRating(rating);
    }

    @GetMapping("/rating")
    public List<Rating> getAllRatings() {

        return escService.getAllRatings();
    }

    @GetMapping("/ratings/{id}")
    public List<Map<String, Object>> getUserRatings(@PathVariable("id") final Long id) {

        final List<Rating> userRatings = escService.getAllRatingsForUser(id);

        return userRatings.stream().map(this::userRatingsToJson).collect(toList());
    }


    private Map<String, Object> userRatingsToJson(final Rating rating) {
        final Map<String, Object> result = new HashMap<>();
        result.put("ratingId", rating.getId());
        result.put("countryId", rating.getCountry().getId());
        result.put("userId", rating.getUser().getId());
        result.put("ratingValue", rating.getRating());
        result.put("countryName", rating.getCountry().getName());
        result.put("countryFlag", rating.getCountry().getFlag());
        result.put("countryInterpret", rating.getCountry().getInterpret());
        result.put("countrySong", rating.getCountry().getSongname());
        result.put("user", rating.getUser().getName());

        return result;

    }

}

