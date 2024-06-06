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

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000);
    options.ListenAnyIP(5001, listenOptions =>
    {
        listenOptions.UseHttps();
    });

    options.ListenLocalhost(7500);
    options.ListenLocalhost(7501, listenOptions =>
    {
        listenOptions.UseHttps();
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalhostOnly",
        policy => policy
            //.SetIsOriginAllowed(origin => new Uri(origin).Host.Contains("localhost"))
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await DbInitializer.InitializeAsync(app);

app.UseCors("LocalhostOnly");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
