package kj.vroom.vroom.domain.Vehicle;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Vehicle {

    @Id
    int id;
    int year;
    String make;
    String model;

    public Vehicle(int id, int year, String make, String model) {
        this.id = id;
        this.year = year;
        this.make = make;
        this.model = model;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getMake() { return make; }
    public void setMake(String make) { this.Make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

}