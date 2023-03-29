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


import static java.util.stream.Collectors.toList;

@RestController
public class ESCController {

    private final ESCService escService;

    @Autowired
    public ESCController(final ESCService escService) {
        this.escService = escService;
    }

    //  ToDo Alle Rest Calls mit PreAuthorize versehen
    //Methods for Users

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/rest/user")
    public List<User> getAllMembers() {

        return escService.getAllUsers().stream().map(user -> new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin())).collect(toList());
    }

    @PostMapping("/rest/user")
    public Long createUser(@RequestBody final User user) {

        return escService.saveUser(user);
    }
    // Rest Call to get logged User
    @GetMapping("/rest/authenticate")
    @ResponseBody
    public User getUser(HttpServletRequest request) {

        User user = escService.getUserByName(request.getUserPrincipal().getName());
        return new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin());
    }

    //Methods for Countries
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/rest/country")
    public List<Country> getAllCountries() {

        return escService.getAllCountries();
    }

    @PostMapping("/rest/country")
    public Long createCountry(@RequestBody final Country country) {

        return escService.saveCountry(country);
    }

    // TODO : Adjust as this below will not work
    @GetMapping("/rest/country/{id}/ratings")
    public List<Rating> getCountryRatings(@PathVariable("id") final Long id) {

        return escService.getAllRatingsForCountry(id);
    }

    // Methods for Ratings

    @PostMapping("/rest/rating")
    public Long createRating(@RequestBody final Rating rating) {

        return escService.saveRating(rating);
    }

    @PutMapping("/rest/rating")
    public Long updateRating(@RequestBody final Rating rating) {

        return escService.updateRating(rating);
    }

    @GetMapping("/rest/rating")
    public List<Rating> getAllRatings() {

        return escService.getAllRatings();
    }

    @GetMapping("/rest/user/ratings")
    public List<Map<String, Object>> getUserRatings(Principal principal) {

        User user = escService.getUserByName(principal.getName());
        final List<Rating> userRatings = escService.getAllRatingsForUser(user.getId());
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

