package de.esc.server.controller;

import de.esc.server.data.Country;
import de.esc.server.data.Rating;
import de.esc.server.data.User;
import de.esc.server.services.ESCService;
import org.springframework.beans.factory.annotation.Autowired;
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

    //Methods for Countries

    @GetMapping("/country")
    public List<Country> getAllCountries() {

        return escService.getAllCountries();
    }

    @PostMapping("/country")
    public Long createCountry(@RequestBody final Country country) {

        return escService.saveCountry(country);
    }

    // Methods for Ratings

    @GetMapping("/ratings")
    public List<Rating> getAllRatings() {

        return escService.getAllRatings();
    }
    @GetMapping("/user/{id}/ratings")
    public List<Map<String, Object>> getUserRatings(@PathVariable("id") final Long id) {

        final List<Rating> userRatings = escService.getAllRatingsForUser(id);

        return userRatings.stream().map(this::ratingToJson).collect(toList());
    }

    @GetMapping("/country/{id}/ratings")
    public List<Rating> getCountryRatings(@PathVariable("id") final Long id) {

        return escService.getAllRatingsForCountry(id);
    }

    private Map<String, Object> ratingToJson(final Rating rating) {
        final Map<String, Object> result = new HashMap<>();
        result.put("id", rating.getId());
        result.put("value", rating.getRating());
        result.put("countryName", rating.getCountry().getName());
        result.put("user", rating.getUser().getName());

        return result;

    }


}

