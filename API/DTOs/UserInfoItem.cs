namespace API.DTOs
{
    public class UserInfoItem
    {
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int RoleId { get; set; }

    }
    public class AdminUpdateUserInfo
    {
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }

    }


    public class UpdateUserInfoItem
    {
        public string DisplayName { get; set; }

        public string Email { get; set; }

    }
}