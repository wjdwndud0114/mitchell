package kj.vroom.vroom.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import kj.vroom.vroom.domain.Vehicle;

public interface VehicleRepository extends MongoRepository<Vehicle, String>, VehicleRepositoryCustom {

}