package de.esc.server.data;

import org.springframework.data.jpa.repository.JpaRepository;



public interface CountryRepository extends JpaRepository<Country, Long> {

    Country findById(long id);
    Country findByName(String name);

}
