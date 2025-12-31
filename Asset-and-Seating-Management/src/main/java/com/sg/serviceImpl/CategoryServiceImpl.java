package com.sg.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sg.dto.CategoryDTO;
import com.sg.entities.Category;
import com.sg.exception.ResourceNotFoundException;
import com.sg.repositories.AssetHistoryRepository;
import com.sg.repositories.AssetRepository;
import com.sg.repositories.CategoryRepository;
import com.sg.repositories.EmployeeRepository;
import com.sg.services.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepo;
	
	
	@Override
	public Category addCategory(CategoryDTO categoryDTO) {
		// TODO Auto-generated method stub
		String categoryName = categoryDTO.getName();
		 categoryRepo.findByName(categoryName);
//		if(categoryRepo.findByName(categoryName)) {
//			
//		}
		 Category category = new Category();;
		 category.setName(categoryName);
		Category saved = categoryRepo.save(category);
		return saved;
	}

	@Override
	public Category getCategoryByName(String categoryName) {
		// TODO Auto-generated method stub
		Category category =  categoryRepo.findByName(categoryName)
				.orElseThrow(()->new ResourceNotFoundException("Category does not exist with Name  : "+categoryName));
	
		
				
		return category;
	}

	@Override
	public List<Category> getAllCategory() {
		// TODO Auto-generated method stub
		List<Category> categoryList=categoryRepo.findAll();
		return categoryList;
	}

	@Override
	public void deleteCategory(Long categoryId) {
		// TODO Auto-generated method stub
		categoryRepo.deleteById(categoryId);
		
	}

	@Override
	public Category updateCategory(Long categoryId, CategoryDTO categoryDTO) {
		// TODO Auto-generated method stub
		 Category category = categoryRepo.findById(categoryId)
				 .orElseThrow(()->new RuntimeException("Category Id does not exist"));
		 category.setName(categoryDTO.getName());
		 categoryRepo.save(category);
		return category ;
	}

	@Override
	public Category getCategoryById(Long id) {
		// TODO Auto-generated method stub
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if(categoryOptional.get()!=null) {
			return categoryOptional.get();
		}
		return null;
	}

}
