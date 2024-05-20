using CanvasService.SeedData;
using MongoDB.Driver;
using MongoDB.Entities;

namespace CanvasService.Data
{
    public class DbInitializer
    {
        public static async Task InitializeAsync(WebApplication app)
        {
            var configuration = app.Services.GetRequiredService<IConfiguration>();
            var logger = app.Services.GetRequiredService<ILogger<DbInitializer>>();
            var settings = new MongoDbSettings();

            configuration.GetSection("MongoDbSettings").Bind(settings);

            logger.LogInformation("Inicializando o MongoDB com a connection string: {ConnectionString}", settings.ConnectionString);

            var mongoClientSettings = MongoClientSettings.FromConnectionString(settings.ConnectionString);
            mongoClientSettings.Credential = MongoCredential.CreateCredential("admin", settings.Username, settings.Password);

            await DB.InitAsync(settings.DatabaseName, mongoClientSettings);

            var database = DB.Database(settings.DatabaseName);
            var seeder = new DataSeeder(database);

            await seeder.SeedAsync();
        }
    }
}
