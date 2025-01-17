using FluentValidation;
using FluentValidation.AspNetCore;
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

        private IValidator<CreateKnifeRequest> _createKnifeValidator;
        private IValidator<EditKnifeRequest> _editKnifeValidator;

        public KnifesController(IKnifeRepository knifeRepository, IUploadFileService fileService, IValidator<CreateKnifeRequest> createKnifeValidator, IValidator<EditKnifeRequest> editKnifeValidator)
        {
            _knifeRepository = knifeRepository;
            _fileService = fileService;
            _createKnifeValidator = createKnifeValidator;
            _editKnifeValidator = editKnifeValidator;
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateKnifeRequest request)
        {
            var validationResult = await _createKnifeValidator.ValidateAsync(request);

            if(validationResult.IsValid)
            {
                var imagePath = await _fileService.UploadImage(request.Image);
                var imagesPath = await _fileService.UploadImages(request.Images);

                var id = await _knifeRepository.Create(request.Title, request.Category, request.Description, imagePath, imagesPath, request.Price, request.IsOnSale,
                    request.OverallLength, request.BladeLength, request.ButtThickness, request.Weight, request.HandleMaterial, request.Country, request.Manufacturer, request.SteelGrade);

                return Ok(id);
            }

            validationResult.AddToModelState(ModelState);
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Edit([FromRoute] long id, [FromForm] EditKnifeRequest request)
        {
            var validationResult = await _editKnifeValidator.ValidateAsync(request);

            if (validationResult.IsValid)
            {
                var imagePath = await _fileService.UploadImage(request.Image);
                var imagesPath = await _fileService.UploadImages(request.Images);

                var result = await _knifeRepository.Edit(id, request.Title, request.Category, request.Description, imagePath, imagesPath, request.Price, request.IsOnSale,
                     request.OverallLength, request.BladeLength, request.ButtThickness, request.Weight, request.HandleMaterial, request.Country, request.Manufacturer, request.SteelGrade);

                if(result is null)
                {
                    return BadRequest($"Edit knife with Id {id} is fault.");
                }

                return Ok();
            }

            validationResult.AddToModelState(ModelState);
            return BadRequest(ModelState);
        }

        [HttpGet("Paginated")]
        public async Task<IActionResult> GetPaginated([FromQuery] GetKnifesPaginationRequest request)
        {
            var result = await _knifeRepository.GetPaginated(
                request.Search,
                request.SortItem,
                request.SortOrder,
                request.Page,
                request.PageSize
            );

            return Ok(new
            {
                items = result.Items,
                totalCount = result.TotalCount // Общее количество товаров
            });
        }

        [HttpGet("OnSale")]
        public async Task<IActionResult> GetOnSale([FromQuery] GetKnifesRequest request)
        {
            var result = await _knifeRepository.GetOnSale(
                request.Search,
                request.SortItem,
                request.SortOrder
            );

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] long id)
        {
            var result = await _knifeRepository.Get(id);

            if(result is null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            var result = await _knifeRepository.Delete(id);

            if (result != 0)
            {
                return Ok(result);
            }

            return NotFound();
        }
    }
}