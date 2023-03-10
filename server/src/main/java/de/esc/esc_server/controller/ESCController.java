package de.esc.esc_server.controller;

import de.esc.esc_server.data.Country;
import de.esc.esc_server.data.User;
import de.esc.esc_server.services.ESCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ESCController {

    private final ESCService escService;

    @Autowired
    public ESCController(final ESCService escService) {
        this.escService = escService;
    }

    @GetMapping("/member")
    public List<User> getAllMembers() {

        return escService.getAllUsers().stream().map(user -> new User(user.getId(), user.getName(), "******", user.getIcon(), user.isAdmin())).collect(Collectors.toList());
    }

    @PostMapping("/member")
    public Long createUser(@RequestBody final User user) {

        return escService.saveMember(user);
    }

    @GetMapping("/country")
    public List<Country> getAllCountries() {

        return escService.getAllCountries();
    }

    @PostMapping("/country")
    public Long createCountry(@RequestBody final Country country) {

        return escService.saveCountry(country);
    }


}

