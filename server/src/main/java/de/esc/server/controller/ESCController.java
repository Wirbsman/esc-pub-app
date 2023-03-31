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
    public List<Rating> getAllRatings() {

        return escService.getAllRatings();
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

}

