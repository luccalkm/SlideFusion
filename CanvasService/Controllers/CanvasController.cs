using CanvasService.Data;
using CanvasService.Models;
using CanvasService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CanvasService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CanvasController : ControllerBase
    {
        private readonly IMongoCollection<Canvas> _canvasCollection;

        public CanvasController(IMongoClient client, IOptions<MongoDbSettings> settings)
        {
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _canvasCollection = database.GetCollection<Canvas>("Canvases");
        }

        [HttpPost]
        public async Task<IActionResult> CreateCanvas([FromBody] Canvas canvas)
        {
            await _canvasCollection.InsertOneAsync(canvas);
            return CreatedAtAction(nameof(GetCanvasById), new { id = canvas.ID }, canvas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCanvasById(string id)
        {
            var canvas = await _canvasCollection.Find(c => c.ID == id).FirstOrDefaultAsync();
            if (canvas == null)
            {
                return NotFound();
            }
            return Ok(canvas);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCanvases()
        {
            var canvases = await _canvasCollection.Find(_ => true).ToListAsync();
            return Ok(canvases);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCanvas(string id, [FromBody] Canvas updatedCanvas)
        {
            updatedCanvas.ID = id;
            var result = await _canvasCollection.ReplaceOneAsync(c => c.ID == id, updatedCanvas);
            if (result.MatchedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCanvas(string id)
        {
            var result = await _canvasCollection.DeleteOneAsync(c => c.ID == id);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("{id}/slides/{slideId}")]
        public async Task<IActionResult> UpdateSlide(string id, string slideId, [FromBody] Slide updatedSlide)
        {
            var filter = Builders<Canvas>.Filter.And(
                Builders<Canvas>.Filter.Eq(c => c.ID, id),
                Builders<Canvas>.Filter.ElemMatch(c => c.Slides, s => s.ID == slideId)
            );

            var update = Builders<Canvas>.Update
                .Set("Slides.$", updatedSlide);

            var result = await _canvasCollection.UpdateOneAsync(filter, update);
            if (result.MatchedCount == 0)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete("{id}/slides/{slideId}")]
        public async Task<IActionResult> RemoveSlide(string id, string slideId)
        {
            var update = Builders<Canvas>.Update.PullFilter(c => c.Slides, s => s.ID == slideId);
            var result = await _canvasCollection.UpdateOneAsync(c => c.ID == id, update);
            if (result.MatchedCount == 0)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
