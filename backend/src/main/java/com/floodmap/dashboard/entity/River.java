package com.floodmap.dashboard.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rivers")
public class River {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String district;
    private String county;
    private String state;

    public River() {}

    public River(Long id, String name, String district, String county, String state) {
        this.id = id;
        this.name = name;
        this.district = district;
        this.county = county;
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
