using API.Image;
using Application.Photos;
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
    public class PostController : BaseApiController
    {
        private readonly DataContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;

        private readonly string containerName = "post";

        public PostController(DataContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            this.fileStorageService = fileStorageService;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<PostShortDTO>>> Get(
            [FromQuery] int? categoryId
            , [FromQuery] string keyword
            , [FromQuery] int? pageSize
            , [FromQuery] int? pageNumber

            )
        {
            IQueryable<Posts> posts = QueryPosts(categoryId, keyword);

            if (!pageSize.HasValue || pageSize <= 0) pageSize = 10;
            if (!pageNumber.HasValue || pageNumber <= 0) pageNumber = 1;

            var result = await
                posts
                .OrderByDescending(p => p.Id)
                .Skip(pageSize.Value * (pageNumber.Value - 1))
                .Take(pageSize.Value)
                .ToArrayAsync();

            return mapper.Map<List<PostShortDTO>>(result);
        }

        [HttpGet("ListV2")]
        [AllowAnonymous]
        public async Task<ActionResult<PostShortList>> ListV2(
            [FromQuery] int? categoryId
            , [FromQuery] string keyword
            , [FromQuery] int? pageSize
            , [FromQuery] int? pageNumber

            )
        {
            IQueryable<Posts> posts = QueryPosts(categoryId, keyword);
            var totalItem = posts.Count();

            return new PostShortList
            {
                TotalItem = totalItem,
                Items = (await Get(categoryId, keyword, pageSize, pageNumber)).Value,
            };
        }

        private IQueryable<Posts> QueryPosts(int? categoryId, string keyword)
        {
            var posts = context.Posts.AsQueryable();

            if (categoryId.HasValue)
            {
                posts = (
                    from p in posts
                    join pc in context.PostCategories on p.Id equals pc.PostId
                    where pc.CategoryId == categoryId.Value
                    select p
                    );
            }

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                posts = posts.Where(p => p.InnerText.Contains(keyword.ToLower().Trim()));
            }

            return posts;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PostFullDTO>> Get(int id)
        {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            short likeValue = 0;
            if(UserInfo != null)
            {
                likeValue = context.Likes.FirstOrDefault(i => i.PostId == id && i.UserId == UserInfo.UserId)?.LikeValue ?? 0;
            }

            var categories = await GetCategoryNames(id);
            var result = new PostFullDTO
            {
                Id = post.Id,
                Cover = post.Cover,
                Title = post.Title,
                ShortBody = post.ShortBody,
                FullBody = post.FullBody,
                Editor = post.Editor,
                CreatedDate = post.CreatedDate,
                LikeCount = post.LikeCount,
                DislikeCount = post.DislikeCount,
                LikeValue = likeValue,
                Categories = categories.Select(c => c.DisplayName).ToArray(),
                CategoryIds = categories.Select(c => c.CategoryId).ToArray(),
            };
            return result;
        }

        private Task<Category[]> GetCategoryNames(int id)
        {
            return (
                from pc in context.PostCategories
                join c in context.Categories on pc.CategoryId equals c.CategoryId
                where pc.PostId == id
                select c
                ).ToArrayAsync();
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<ActionResult<int>> Post([FromBody] PostCreateDTO postCreateDTO)
        {
            var post = mapper.Map<Posts>(postCreateDTO);
            //if (postCreateDTO.image != null)
            //{
            //    post.image = await fileStorageService.SaveFile(containerName, postCreateDTO.image);
            //}

            post.CreatedDate = DateTime.UtcNow.ToUnixTimeMiliseconds();
            post.Editor = User.Identity.Name;
            post.EditorId = UserInfo.UserId;
            context.Add(post);
            await context.SaveChangesAsync();



            if (postCreateDTO.CategoryIds != null)
            {
                context.PostCategories.AddRange(postCreateDTO.CategoryIds.Select(i => new PostCategory
                {
                    CategoryId = i,
                    PostId = post.Id,
                }));
            }
            await context.SaveChangesAsync();

            return post.Id;
        }

        [HttpPut("{id}/Like")]
        public async Task UpdateLike([FromRoute] int id, [FromQuery] short likeValue)
        {
            if (likeValue == 0) return;

            var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (post == null)
            {
                return;
            }

            var like = await context.Likes.FirstOrDefaultAsync(i => i.PostId == id && i.UserId == UserInfo.UserId);
            if (like == null)
            {
                context.Likes.Add(new Like
                {
                    PostId = id,
                    UserId = UserInfo.UserId,
                    LikeValue = likeValue,
                });
                if (likeValue > 0) post.LikeCount++;
                else post.DislikeCount++; 
            }
            else
            {
                if(like.LikeValue > 0 && likeValue < 0)
                {
                    post.DislikeCount++;
                    if (post.LikeCount > 0) post.LikeCount--;
                }
                else if(like.LikeValue < 0 && likeValue > 0)
                {
                    post.LikeCount++;
                    if (post.DislikeCount > 0) post.DislikeCount--;
                }
                like.LikeValue = likeValue;
            }
            await context.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<ActionResult> Put(int id, [FromBody] PostCreateDTO postCreateDTO)
        {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            post = mapper.Map(postCreateDTO, post);

            if (postCreateDTO.CategoryIds != null)
            {
                var oldPc = await context.PostCategories.Where(pc => pc.PostId == post.Id).ToArrayAsync();
                context.PostCategories.RemoveRange(oldPc);
                context.PostCategories.AddRange(postCreateDTO.CategoryIds.Select(i => new PostCategory
                {
                    CategoryId = i,
                    PostId = post.Id,
                }));
            }

            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (post == null)
            {
                return NotFound();
            }
            context.Remove(post);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}