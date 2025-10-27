package main.java.com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({"/", "/**/{path:[^\\.]*}"})
    public String index(){
        return "forward:/index.html";  // React SPA index.html 서빙
    }
}