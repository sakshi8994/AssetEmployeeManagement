package com.sg.controllers;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sg.dto.CategoryDTO;
import com.sg.entities.Category;
import com.sg.services.CategoryService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
	
private final CategoryService categoryService;

@PostMapping
public ResponseEntity<Category> addCategory(@RequestBody CategoryDTO categoryDTO){
	
	return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(categoryDTO));
}

@GetMapping("/all")
public ResponseEntity<List<Category>>getAllCategory(){
	  List<Category>list =categoryService.getAllCategory();
	 if (list.isEmpty()) {
	        return ResponseEntity.noContent().build();
	    }
	
	return ResponseEntity.ok(list);
}

@GetMapping
public ResponseEntity<Category> getCategorybyName(@RequestBody CategoryDTO categoryDTO){
	
	return ResponseEntity.ok(categoryService.getCategoryByName(categoryDTO.getName()));
}

@GetMapping("/{id}")
public ResponseEntity<Category>getCategoryById(@PathVariable Long id){
	return ResponseEntity.ok(categoryService.getCategoryById(id));
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteCategory(@PathVariable Long id){
	

    categoryService.deleteCategory(id);
    return ResponseEntity.status(HttpStatus.OK)
            .body("Category deleted successfully");
}
	
@PutMapping("/{id}")
public ResponseEntity<Category>updateCategory(@PathVariable Long id , @RequestBody CategoryDTO categoryDTO){
	

	return ResponseEntity.status(HttpStatus.OK)
            .body(categoryService.updateCategory(id, categoryDTO));
}


}
