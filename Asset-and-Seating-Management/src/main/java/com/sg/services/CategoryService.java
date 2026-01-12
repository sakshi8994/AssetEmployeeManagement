package com.sg.services;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.sg.dto.CategoryDTO;
import com.sg.entities.Category;

public interface CategoryService {

	public Category addCategory(CategoryDTO categoryDTO);
	public Category getCategoryByName(String categoryName);
	public List<Category> getAllCategory();
	public void deleteCategory(Long categoryId);
	public Category updateCategory(Long categoryId , CategoryDTO categoryDTO);
	public Category getCategoryById(Long id);
	public Page<Category> search(Long categoryId, String name, Pageable pageable);
}
