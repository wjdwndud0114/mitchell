package kj.vroom.vroom.controller;

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
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable String id) {
        Vehicle result = vehicleService.findById(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<?> saveVehicle(@RequestBody Vehicle vehicle) {
        int year = vehicle.getYear();
        String make = vehicle.getMake().trim();
        String model = vehicle.getModel().trim();
        if (year < 1950 || year > 2050 ||
            make == null || make.isEmpty() ||
            model == null || make.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid vehicle properties.");
        }
            
        vehicleService.saveVehicle(vehicle);
        return ResponseEntity.ok("Vehicle saved successfully.");
    }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable String id) {
        vehicleService.deleteVehicle(id);
    }

    @GetMapping("/find")
    public ResponseEntity<?> getByYearMakeModel(
        @RequestParam(value="year", required=false) Integer year,
        @RequestParam(value="make", required=false) String make,
        @RequestParam(value="model", required=false) String model) {
        List<Vehicle> result = vehicleService.findVehicle(year == null ? 0 : year, make, model);
        return ResponseEntity.ok(result);
    }
}