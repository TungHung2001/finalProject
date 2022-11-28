using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService, DataContext context)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                    .FirstOrDefaultAsync(x => x.NormalizedEmail == loginDto.Email.ToUpper());

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }


        [HttpGet("list-user")]
        [Authorize(Roles = "Admin")]
        public async Task<UserInfoItem[]> ListUser()
        {
            var result = await
                (from u in _context.Users
                 join ur in _context.UserRoles on u.Id equals ur.UserId
                 join r in _context.Roles on ur.RoleId equals r.Id
                 orderby u.UserName
                 select new UserInfoItem
                 {
                     UserId = new Guid(u.Id),
                     DisplayName = u.DisplayName,
                     Email = u.Email,
                     Username = u.UserName,
                     Role = r.Name,
                 }).ToArrayAsync();

            foreach (var r in result)
            {
                r.RoleId = (int)Enum.Parse<EnumUserRole>(r.Role.ToLower());
            }
            return result;
        }

        [HttpPut("update-user")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserInfoItem>> UpdateUser(AdminUpdateUserInfo user)
        {
            var ua = user.UserId.ToString();
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == ua);
            if (dbUser == null)
            {
                return NotFound();
            }

            if (await _userManager.Users.AnyAsync(x => x.NormalizedEmail == user.Email.ToUpper() && x.Id != dbUser.Id))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }

            dbUser.DisplayName = user.DisplayName;
            dbUser.Email = user.Email;
            dbUser.UserName = user.Email;
            dbUser.NormalizedEmail = user.Email.ToUpper();
            dbUser.NormalizedUserName = user.Email.ToUpper();

            var currentRole = await _context.UserRoles.FirstOrDefaultAsync(u => u.UserId == dbUser.Id);
            if (user.UserId != UserInfo.UserId // NOT current admin user
                && currentRole.RoleId != user.RoleId.ToString() //change role
                )
            {
                _context.UserRoles.Remove(currentRole);
                _context.UserRoles.Add(new IdentityUserRole<string>
                {
                    UserId = dbUser.Id,
                    RoleId = user.RoleId.ToString(),
                });
                //await _userManager.RemoveFromRoleAsync(dbUser, currentRole.RoleId);
                //await _userManager.AddToRoleAsync(dbUser, user.RoleId.ToString());
                await _context.SaveChangesAsync();
            }


            var role = (
                 from ur in _context.UserRoles
                 join r in _context.Roles on ur.RoleId equals r.Id
                 where ur.UserId == user.UserId.ToString()
                 select r).FirstOrDefault();

            return new UserInfoItem
            {
                UserId = new Guid(dbUser.Id),
                DisplayName = dbUser.DisplayName,
                Email = dbUser.Email,
                Username = dbUser.UserName,
                Role = role.Name,
                RoleId = int.Parse(role.Id),
            };

        }

        [HttpPut("update-me")]
        public async Task<ActionResult<UserInfoItem>> UpdateMe(UpdateUserInfoItem user)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserInfo.UserId.ToString());
            if (dbUser == null)
            {
                return NotFound();
            }


            if (await _userManager.Users.AnyAsync(x => x.NormalizedEmail == user.Email.ToUpper() && x.Id != dbUser.Id))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }

            dbUser.DisplayName = user.DisplayName;
            dbUser.Email = user.Email;
            dbUser.UserName = user.Email;
            dbUser.NormalizedEmail = user.Email.ToUpper();
            dbUser.NormalizedUserName = user.Email.ToUpper();

            await _context.SaveChangesAsync();


            var role = await (
                 from ur in _context.UserRoles
                 join r in _context.Roles on ur.RoleId equals r.Id
                 where ur.UserId == UserInfo.UserId.ToString()
                 select r).FirstOrDefaultAsync();

            return new UserInfoItem
            {
                UserId = new Guid(dbUser.Id),
                DisplayName = dbUser.DisplayName,
                Email = dbUser.Email,
                Username = dbUser.UserName,
                Role = role.Name,
                RoleId = int.Parse(role.Id),
            };

        }


        [HttpDelete("delete-user")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> DeleteUser([FromQuery] Guid userId)
        {
            if (userId == UserInfo.UserId) // current admin user
            {
                return false;
            }
            var dbuser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId.ToString());
            if (dbuser == null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(dbuser);
            await _context.SaveChangesAsync();
            return true;
        }


        [HttpPut("change-password")]
        public async Task<ActionResult<bool>> ChangePassword([FromBody] ChangePasswordDto model)
        {
            if (model.NewPassword == null || model.NewPassword.Length < 6)
            {
                return BadRequest("password's too short.");
            }

            var dbuser = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserInfo.UserId.ToString());
            if (dbuser == null)
            {
                return NotFound();
            }

            var result = await _userManager.ChangePasswordAsync(dbuser, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest("error");
            }
            else
            {
                return true;
            }
        }

        [HttpPut("set-password")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> setPassword([FromBody] SetPasswordDto model)
        {
            if (model.NewPassword == null || model.NewPassword.Length < 6)
            {
                return BadRequest("password's too short.");
            }
            var dbuser = _context.Users.FirstOrDefault(u => u.Id == model.UserId.ToString());
            if (dbuser == null)
            {
                return NotFound();
            }

            var result = await _userManager.RemovePasswordAsync(dbuser);
            if (!result.Succeeded)
            {
                return BadRequest("error");
            }

            result = await _userManager.AddPasswordAsync(dbuser, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest("error");
            }
            else
            {
                return true;
            }
        }




        [HttpPost("add-user")]
        [Authorize(Roles = "Admin")]
        public Task<ActionResult<UserDto>> AddUser(RegisterDto registerDto)
        {
            return _Register(registerDto);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            registerDto.RoleId = EnumUserRole.viewer; //overwrite for public register
            return _Register(registerDto);
        }

        private async Task<ActionResult<UserDto>> _Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Id = Guid.NewGuid().ToString(),
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                NormalizedEmail = registerDto.Email.ToUpper(),
                NormalizedUserName = registerDto.Email.ToUpper(),
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                _context.UserRoles.Add(new IdentityUserRole<string>
                {
                    RoleId = ((int)registerDto.RoleId).ToString(),
                    UserId = user.Id,
                });
                _context.SaveChanges();
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            int? roleId = null;
            var roleText = _context.UserRoles.Where(u => u.UserId == user.Id).Select(u => u.RoleId).FirstOrDefault();
            if (roleText != null)
            {
                roleId = int.Parse(roleText);
            }
            return new UserDto
            {
                DisplayName = user.DisplayName,
                //Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                UserId = new Guid(user.Id),
                RoleId = roleId,
            };
        }
    }
}