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
    public void saveVehicle(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(int id) {
        vehicleRepository.delete(id);
    }

    @Override
    public List<Vehicle> findByYear(int year) {
        return vehicleRepository.findByYear(year);
    }

    @Override
    public List<Vehicle> findByMake(String make) {
        return vehicleRepository.findByMake(make);
    }

    @Override
    public List<Vehicle> findByModel(string model) {
        return vehicleRepository.findByModel(model);
    }
}