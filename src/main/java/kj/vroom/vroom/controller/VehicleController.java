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
public class ExpenseController {
    
    @Autowired
    VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Vehicle> result = vehicleService.findAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveVehicle(RequestBody vehicle vehicle) {
        vehicleService.saveVehicle(vehicle);
        return new ResponseEntity("Vehicle saved successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteVehicle(@RequestParam("id") int id) {
        vehicleService.deleteVehicle(id);
    }

    @GetMapping("")
    public ResponseEntity<?> getFiltered(@PathVariable("year") int year, @PathVariable("make") String make, @PathVariable("model") String model) {
        List<Vehicle> result = new ArrayList();
        
    }
}