namespace Application.Post
{
    public class PostFullDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public long CreatedDate { get; set; }
        public string Cover { get; set; }
        public string ShortBody { get; set; }
        public string FullBody { get; set; }
        public string[] Categories { get; set; }
        public int[] CategoryIds { get; set; }
        public string Editor { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public short LikeValue { get; set; }
    }
}