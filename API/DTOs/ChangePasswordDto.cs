using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class SetPasswordDto
    {
        public Guid UserId { get; set; }
        public string NewPassword { get; set; }
    }
}