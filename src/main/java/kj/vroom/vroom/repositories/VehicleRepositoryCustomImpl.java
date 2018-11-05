package kj.vroom.vroom.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;

import kj.vroom.vroom.domain.Vehicle;

public class VehicleRepositoryCustomImpl implements VehicleRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Vehicle> findVehicle(int year, String make, String model) {
        Query query = new Query();

        if (year != 0) {
            Criteria yearCriteria = Criteria.where("year").is(year);
            query.addCriteria(yearCriteria);            
        }
        if (make != null) {
            Criteria makeCriteria = Criteria.where("make").is(make);
            query.addCriteria(makeCriteria);            
        }
        if (model != null) {
            Criteria modelCriteria = Criteria.where("model").is(model);
            query.addCriteria(modelCriteria);            
        }
		
        return mongoTemplate.find(query, Vehicle.class, "vehicles");
    }
}