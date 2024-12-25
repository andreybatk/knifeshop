using Microsoft.AspNetCore.Http;

namespace KnifeShop.BL.Services
{
    public interface IUploadFileService
    {
        Task<string?> UploadImage(IFormFile? imageFile);
        Task<List<string>> UploadImages(List<IFormFile>? imageFiles);
    }
}