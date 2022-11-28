namespace Domain
{
    public class Note
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public long CreatedDate { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Content { get; set; }
    }
}