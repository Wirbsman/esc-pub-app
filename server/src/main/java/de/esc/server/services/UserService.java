package de.esc.server.services;

import de.esc.server.data.CountryRepository;
import de.esc.server.data.RatingRepository;
import de.esc.server.data.User;
import de.esc.server.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

import static java.util.Arrays.asList;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(final UserRepository userRepository) {

        this.userRepository = userRepository;


    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User byName = this.userRepository.findByName(username);
        return new org.springframework.security.core.userdetails.User(username, byName.getPassword(), asList(new SimpleGrantedAuthority("USER"), (new SimpleGrantedAuthority("ADMIN"))));
    }


}
