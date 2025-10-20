package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

	@GetMapping("/hello")
	public String hello(){
		return "test demo";
	}
	@GetMapping("/demo/api/data")
	public String test(){
		return "Hello React!";
	} 

}
