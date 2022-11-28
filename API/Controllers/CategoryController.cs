using API.Image;
using Application.Post;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public CategoryController(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Category>>> Get()
        {
            return await context.Categories.OrderBy(c => c.SortOrder).ToListAsync();
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<Category> Add([FromBody] Category category)
        {
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
            return category;
        }


        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<Category> Update([FromBody] Category category)
        {
            var dbCategory = await context.Categories.FirstOrDefaultAsync(c => c.CategoryId == category.CategoryId);
            if (dbCategory == null)
            {
                return null;
            }
            dbCategory.ShortName = category.ShortName;
            dbCategory.DisplayName = category.DisplayName;
            dbCategory.SortOrder = category.SortOrder;
            context.SaveChanges();
            return dbCategory;
        }
    }
}