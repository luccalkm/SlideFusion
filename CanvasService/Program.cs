using CanvasService.Data;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var mongoClientSettings = MongoClientSettings.FromConnectionString(settings.ConnectionString);
    mongoClientSettings.Credential = MongoCredential.CreateCredential("admin", settings.Username, settings.Password);
    return new MongoClient(mongoClientSettings);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await DbInitializer.InitializeAsync(app);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
