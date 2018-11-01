package kj.vroom.vroom.service;

import java.util.List;

import kj.vroom.vroom.domain.Vehicle;

public interface VehicleService {

    void findAll();
    void saveVehicle(Vehicle vehicle);
    void deleteVehicle(int id);
    
    List<Vehicle> findByYear(int year);
	List<Vehicle> findByMake(String make);
    List<Vehicle> findByModel(String model);

}