using Microsoft.AspNetCore.Http;

namespace Application.Post
{
    public class PostCreateDTO
    {
        public string Title { get; set; }
        public string Cover { get; set; }
        public string ShortBody { get; set; }
        public string FullBody { get; set; }
        public string InnerText { get; set; }

        public int[] CategoryIds { get; set; }
    }
}