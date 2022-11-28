namespace Domain
{
    public class Like
    {
        public int PostId { get; set; }
        public Guid UserId { get; set; }
        public short LikeValue { get; set; }
    }
}