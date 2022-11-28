using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using System.Security.Claims;

namespace API.Controllers
{
    public class UserInfoClass
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }


    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private UserInfoClass _userInfo;
        protected UserInfoClass UserInfo
        {
            get
            {
                if (!User.Identity.IsAuthenticated) return null;

                if (_userInfo == null)
                {
                    _userInfo = new UserInfoClass()
                    {
                        UserId = new Guid(User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value),
                        Name = User.Claims.First(i => i.Type == ClaimTypes.Name).Value,
                        Email = User.Claims.First(i => i.Type == ClaimTypes.Email).Value,
                        Role = User.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Role)?.Value,
                    };
                }
                return _userInfo;
            }
        }

        private IMediator mediator;

        protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);

            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }
        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize,
                    result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }

}