package de.esc.esc_server.data;

import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {

    User findById(long id);
    User findByName(String name);

}
