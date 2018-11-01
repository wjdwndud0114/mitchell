package kj.vroom.vroom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kj.vroom.vroom.domain.Vehicle;
import kj.vroom.vroom.repositories.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {
    @Autowired
    VehicleRepository vehicleRepository;

    @Override
    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle findById(String id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    @Override
    public void saveVehicle(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(String id) {
        vehicleRepository.deleteById(id);
    }

    @Override
    public List<Vehicle> findVehicle(int year, String make, String model) {
        return vehicleRepository.findVehicle(year, make, model);
    }
}