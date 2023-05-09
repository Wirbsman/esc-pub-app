package de.esc.server.configuration;

import de.esc.server.services.MyUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    private final MyUserService myUserService;
    private final PasswordEncoder bCryptPasswordEncoder = passwordEncoder();

    public SecurityConfiguration(MyUserService myUserService) {
        this.myUserService = myUserService;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll()
                        .requestMatchers("/rest/**").hasAnyAuthority("ADMIN", "USER")
                        .anyRequest().authenticated()
                )
                .userDetailsService(myUserService)
                .httpBasic().authenticationEntryPoint(loginUrlauthenticationEntryPoint())
                .and().build();

        //.headers(headers -> headers.frameOptions().sameOrigin())

    }

    @Bean
    public AuthenticationEntryPoint loginUrlauthenticationEntryPoint(){
        return new LoginUrlAuthenticationEntryPoint("/login");
    }

    @Bean
    static PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return rawPassword.toString();
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return rawPassword.toString().equals(encodedPassword);
            }
        };
    }
}