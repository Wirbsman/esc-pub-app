package de.esc.server.data;

import jakarta.persistence.*;


@Entity
@Table(name = "Rating")
public class Rating {
    @Id
    @GeneratedValue(generator = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="memberId")
    private User user;

    @ManyToOne
    @JoinColumn(name="countryId")
    private Country country;

    private Double rating;

    public Rating(User user, Country country, Double ratingValue) {

        this.user = user;
        this.country = country;
        this.rating = ratingValue;
    }

    public Rating(){

    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}
