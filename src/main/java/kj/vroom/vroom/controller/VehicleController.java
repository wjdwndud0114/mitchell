package kj.vroom.vroom.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kj.vroom.vroom.domain.Vehicle;
import kj.vroom.vroom.service.VehicleService;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {
    
    @Autowired
    VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Vehicle> result = vehicleService.findAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveVehicle(@RequestBody Vehicle vehicle) {
        vehicleService.saveVehicle(vehicle);
        return new ResponseEntity("Vehicle saved successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteVehicle(@RequestParam("id") String id) {
        vehicleService.deleteVehicle(id);
    }

    @GetMapping("/find")
    public ResponseEntity<?> getByYearMakeModel(
        @RequestParam(value="year", required=false) int year,
        @RequestParam(value="make", required=false) String make,
        @RequestParam(value="model", required=false) String model) {
        List<Vehicle> result = vehicleService.findVehicle(year, make, model);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}