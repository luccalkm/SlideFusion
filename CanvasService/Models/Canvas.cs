using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace CanvasService.Models
{
    public class Canvas
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ID { get; set; } = ObjectId.GenerateNewId().ToString();
        public string Title { get; set; }
        public ICollection<Slide> Slides { get; set; } = new List<Slide>();
        public string BackgroundColor { get; set; }
        public string BackgroundImage { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
