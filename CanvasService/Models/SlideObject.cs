using CanvasService.Models.Enums;
using System.Text.Json.Serialization;
using CanvasService.Services.Converters;
using MongoDB.Entities;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace CanvasService.Models
{
    public class SlideObject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ID { get; set; } = ObjectId.GenerateNewId().ToString();
        [JsonConverter(typeof(SlideObjectConverter))]
        public ESlideObject Type { get; set; }
        public int Order { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string BackgroundColor { get; set; }
        public string BackgroundImage { get; set; }
    }
}
