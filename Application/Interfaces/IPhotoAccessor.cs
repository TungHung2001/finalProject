using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUpLoadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}