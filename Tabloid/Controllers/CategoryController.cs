using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _categoryRepository.GetCategoryById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }


        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }


    }
}
