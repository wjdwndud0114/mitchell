package kj.vroom.vroom.repositories;

import java.util.List;

import kj.vroom.vroom.domain.Vehicle;

public interface VehicleRepositoryCustom {

    List<Vehicle> findVehicle(int year, String make, String model);

}