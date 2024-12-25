using KnifeShop.API.Contracts;
using KnifeShop.BL.Services;
using KnifeShop.DB.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnifeShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KnifesController : ControllerBase
    {
        private readonly IKnifeRepository _knifeRepository;
        private readonly IUploadFileService _fileService;

        public KnifesController(IKnifeRepository knifeRepository, IUploadFileService fileService)
        {
            _knifeRepository = knifeRepository;
            _fileService = fileService;
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateKnifeRequest request, [FromForm] IFormFile? image, [FromForm] List<IFormFile>? images)
        {
            var imagePath = await _fileService.UploadImage(image);
            var imagesPath = await _fileService.UploadImages(images);

            await _knifeRepository.Create(request.Title, request.Category, request.Description, imagePath, imagesPath, request.Price, request.IsOnSale);
            return Ok();
        }

        [HttpPost("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit([FromRoute] long id, [FromBody] EditKnifeRequest request)
        {
            var result = await _knifeRepository.Edit(id, request.Title, request.Category, request.Description, request.Image, request.Images, request.Price, request.IsOnSale);

            if(result is null)
            {
                return BadRequest($"Edit knife with Id {id} is fault.");
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetKnifesRequest request)
        {
            return Ok(await _knifeRepository.Get(request.Search, request.SortItem, request.SortOrder));
        }

        //[HttpGet]
        //public async Task<IActionResult> Get(int skip, int take)
        //{
        //    return Ok();
        //}
    }
}