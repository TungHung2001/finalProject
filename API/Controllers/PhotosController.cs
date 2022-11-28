
using API.Image;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        private readonly IFileStorageService fileStorageService;

        public PhotosController(IFileStorageService fileStorageService)
        {
            this.fileStorageService = fileStorageService;
        }

        [HttpPost("AddPostPhoto")]
        public async Task<ActionResult<string>> AddPostPhoto([FromForm] IFormFile file)
        {
            return await fileStorageService.SaveFile("Post", file);
        }

        [HttpPost("AddUserPhoto")]
        public async Task<ActionResult<string>> AddUserPhoto([FromForm] IFormFile file)
        {
            return await fileStorageService.SaveFile("User", file);
        }


        //[HttpPost]
        //public async Task<IActionResult> Add([FromForm] Add.Command command)
        //{
        //    return HandleResult(await Mediator.Send(command));
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(string id)
        //{
        //    return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        //}

        //[HttpPost("{id}/setMain")]
        //public async Task<IActionResult> SetMain(string id)
        //{
        //    return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
        //}
    }
}