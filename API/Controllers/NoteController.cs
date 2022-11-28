using API.Image;
using Application.Photos;
using Application.Post;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : BaseApiController
    {
        private readonly DataContext context;
        public NoteController(DataContext context)
        {
            this.context = context;
        }
        [HttpGet("ListV2")]
        [AllowAnonymous]
        public async Task<ActionResult<NoteList>> ListV2(
            [FromQuery] int postId
            , [FromQuery] int? lastNoteId
            )
        {
            var notes = await
                context.Notes
                .Where(n => n.PostId == postId
                    && (!lastNoteId.HasValue || n.Id < lastNoteId.Value)
                ).OrderByDescending(n => n.Id)
                .Take(10)
                .ToListAsync();

            var totalItem = await
                context.Notes
                .CountAsync(n => n.PostId == postId);

            return new NoteList
            {
                TotalItem = totalItem,
                Items = notes,
            };
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Note>>> Get(
            [FromQuery] int postId
            , [FromQuery] int? lastNoteId
            )
        {
            var notes = await
                context.Notes
                .Where(n => n.PostId == postId
                    && (!lastNoteId.HasValue || n.Id < lastNoteId.Value)
                ).OrderByDescending(n => n.Id)
                .Take(10)
                .ToListAsync();

            return notes;
        }

        [HttpPost]
        public async Task<ActionResult<Note>> Add(
            [FromQuery] int postId
            , [FromBody] NoteDTO body
            )
        {
            if (string.IsNullOrEmpty(body?.Content))
            {
                return NoContent();
            }
            var note = new Note
            {
                PostId = postId,
                UserId = UserInfo.UserId,
                UserName = UserInfo.Name,
                CreatedDate = DateTime.UtcNow.ToUnixTimeMiliseconds(),
                Content = body.Content,
            };
            context.Notes.Add(note);
            await context.SaveChangesAsync();
            return note;
        }

    }
}