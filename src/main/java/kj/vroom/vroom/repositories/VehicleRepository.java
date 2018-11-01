package kj.vroom.vroom.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import kj.vroom.vroom.domain.Vehicle;

public interface VehicleRepository extends MongoRepository<Vehicle, int>{

    List<Vehicle> findByYear(int year);
    List<Vehicle> findByMake(String make);
    List<Vehicle> findByModel(String model);

}