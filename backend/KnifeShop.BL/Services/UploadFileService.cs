﻿using Microsoft.AspNetCore.Http;

namespace KnifeShop.BL.Services
{
    public class UploadFileService : IUploadFileService
    {
        public async Task<string?> UploadImage(IFormFile? imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                // Определите путь для сохранения файла
                var uploadPath = Path.Combine("Uploads", "Knives");
                Directory.CreateDirectory(uploadPath); // Создать директорию, если она не существует

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                // Установите URL файла в модель
                return $"/Uploads/Knives/{fileName}";
            }

            return null;
        }

        public async Task<List<string>?> UploadImages(List<IFormFile>? imageFiles)
        {
            if(imageFiles != null && imageFiles.Count > 0)
            {
                var uploadedPaths = new List<string>();

                if (imageFiles != null)
                {
                    foreach (var file in imageFiles)
                    {
                        var path = await UploadImage(file);
                        if (path != null)
                        {
                            uploadedPaths.Add(path);
                        }
                    }
                }

                return uploadedPaths;
            }

            return null;
        }
    }
}
