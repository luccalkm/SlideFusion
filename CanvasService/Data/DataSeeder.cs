using System.Text.Json;
using CanvasService.Models;
using MongoDB.Driver;
using CanvasService.Services.Converters;
using MongoDB.Bson;

namespace CanvasService.SeedData
{
    public class DataSeeder
    {
        private readonly IMongoDatabase _database;

        public DataSeeder(IMongoDatabase database)
        {
            _database = database;
        }

        public async Task SeedAsync()
        {
            var canvasesCollection = _database.GetCollection<Canvas>("Canvases");

            // Exclua todos os documentos na coleção antes de inserir os novos dados
            await canvasesCollection.DeleteManyAsync(Builders<Canvas>.Filter.Empty);

            await Console.Out.WriteLineAsync("No data -- will attempt to seed");
            var itemData = await File.ReadAllTextAsync("Data/canvases.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            options.Converters.Add(new SlideObjectConverter());

            var canvases = JsonSerializer.Deserialize<List<Canvas>>(itemData, options);

            // Garante que os IDs sejam gerados
            foreach (var canvas in canvases)
            {
                foreach (var slide in canvas.Slides)
                {
                    if (string.IsNullOrEmpty(slide.ID))
                    {
                        slide.ID = ObjectId.GenerateNewId().ToString();
                    }
                    foreach (var slideObject in slide.SlideObjects)
                    {
                        if (string.IsNullOrEmpty(slideObject.ID))
                        {
                            slideObject.ID = ObjectId.GenerateNewId().ToString();
                        }
                    }
                }
            }

            await canvasesCollection.InsertManyAsync(canvases);
        }
    }
}
