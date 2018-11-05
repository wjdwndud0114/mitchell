package kj.vroom.vroom;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import static org.hamcrest.Matchers.*;

import kj.vroom.vroom.domain.Vehicle;
import kj.vroom.vroom.service.VehicleService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class VroomApplicationTests {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private VehicleService service;

	@Test
	public void testGet() throws Exception {
		List<Vehicle> a = new ArrayList<Vehicle>();
		a.add(new Vehicle("aaa", 2016, "Honda", "Test"));
		a.add(new Vehicle("bbb", 2014, "Benz", "Yee"));
		when(service.findAll()).thenReturn(a);
		this.mvc.perform(get("/vehicle"))
			.andExpect(status().isOk())
			.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
			.andExpect(jsonPath("$", hasSize(2)));
	}

}
