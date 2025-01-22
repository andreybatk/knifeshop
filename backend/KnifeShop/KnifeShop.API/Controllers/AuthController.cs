using KnifeShop.API.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace KnifeShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("user")]
        public async Task<IActionResult> GoogleAuth([FromBody] GoogleAuthRequest request)
        {
            var clientId = _configuration["Google:ClientId"];
            var validationUrl = $"https://oauth2.googleapis.com/tokeninfo?id_token={request.Token}";

            using var httpClient = new HttpClient();
            var response = await httpClient.GetStringAsync(validationUrl);
            var payload = JsonSerializer.Deserialize<GoogleTokenPayload>(response);

            if (payload?.Aud != clientId)
            {
                return Unauthorized(new { message = "Invalid token." });
            }

            return Ok(new { email = payload?.Email });
        }

        [HttpGet("role")]
        [Authorize]
        public IActionResult GetRole()
        {
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            return Ok(new { role });
        }
    }
}
