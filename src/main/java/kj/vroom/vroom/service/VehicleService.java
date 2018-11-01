package kj.vroom.vroom.service;

import java.util.List;

import kj.vroom.vroom.domain.Vehicle;

public interface VehicleService {

    List<Vehicle> findAll();
    void saveVehicle(Vehicle vehicle);
    void deleteVehicle(String id);

    List<Vehicle> findVehicle(int year, String make, String model);

}