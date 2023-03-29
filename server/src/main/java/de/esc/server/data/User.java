package de.esc.server.data;

import jakarta.persistence.*;

@Entity
@Table(name = "Member")
public class User {
    @Id
    @GeneratedValue(generator = "id")
    private Long id;

    private String name;
    private String password;
    private String icon;
    private boolean admin = false;

    public User(Long id, String name, String password, String icon, boolean admin) {

        this.id = id;
        this.name = name;
        this.password = password;
        this.icon = icon;
        this.admin = admin;
    }

    public User() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
