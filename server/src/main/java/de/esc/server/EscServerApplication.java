package de.esc.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EscServerApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(EscServerApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(EscServerApplication.class, args);
        LOGGER.debug("ESC Server am start");
    }

}
