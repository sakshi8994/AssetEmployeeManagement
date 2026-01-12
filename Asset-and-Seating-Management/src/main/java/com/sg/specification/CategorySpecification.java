package com.sg.specification;

import org.springframework.data.jpa.domain.Specification;


import com.sg.entities.Category;

public class CategorySpecification {

	public static Specification<Category> hasCategoryId(Long CategoryId) {
        return (root, query, cb) ->
        CategoryId == null ? null : cb.equal(root.get("categoryId"), CategoryId);
    }
	
	public static Specification<Category> hasCategoryName(String name) {
        return (root, query, cb) ->
        name == null ? null : cb.equal(root.get("name"),name);
    }

	
}
