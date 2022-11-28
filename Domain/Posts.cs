namespace Domain
{
    public class Posts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public long CreatedDate { get; set; }
        public string Cover { get; set; }
        public string ShortBody { get; set; }
        public string FullBody { get; set; }
        public string InnerText { get; set; }
        public string Editor { get; set; }
        public Guid EditorId { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
    }
}