using Domain;

namespace Application.Post
{
    public class PostShortDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public long CreatedDate { get; set; }
        public string Cover { get; set; }
        public string ShortBody { get; set; }
        //public string[] Categories { get; set; }
    }

    public class PostShortList
    {
        public int TotalItem { get; set; }
        public List<PostShortDTO> Items { get; set; }
    }
    public class NoteList
    {
        public int TotalItem { get; set; }
        public List<Note> Items { get; set; }
    }
}