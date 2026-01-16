package com.sg.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sg.dto.CategoryDTO;
import com.sg.entities.Category;
import com.sg.entities.Employee;
import com.sg.exception.ResourceNotFoundException;
import com.sg.repositories.AssetHistoryRepository;
import com.sg.repositories.AssetRepository;
import com.sg.repositories.CategoryRepository;
import com.sg.repositories.EmployeeRepository;
import com.sg.services.CategoryService;
import com.sg.specification.CategorySpecification;
//import com.sg.specification.EmployeeSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepo;
	
	
	
	
	@Override
	@CacheEvict(value="categories" , allEntries=true)
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
	@Cacheable(value="categories")
	public List<Category> getAllCategory() {
		// TODO Auto-generated method stub
		List<Category> categoryList=categoryRepo.findAll();
		return categoryList;
	}
	
	@CacheEvict(value="categories" , allEntries=true)
	@Override
	public void deleteCategory(Long categoryId) {
		// TODO Auto-generated method stub
		categoryRepo.deleteById(categoryId);
		
	}

	@Override
	@CacheEvict(value="categories" , allEntries=true)
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

	@Override
	public Page<Category> search(Long categoryId, String name, Pageable pageable) {
		// TODO Auto-generated method stub
		 Specification<Category> spec = Specification
	             .where(CategorySpecification.hasCategoryId(categoryId))
	             .and(CategorySpecification.hasCategoryName(name));
		 
		 Page<Category>categoryPage = categoryRepo.findAll(spec,pageable);
		return categoryPage;
		
	}

}
