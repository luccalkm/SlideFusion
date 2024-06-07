using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace CanvasService.Models
{
    public class Slide
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ID { get; set; } = ObjectId.GenerateNewId().ToString();
        public int Order { get; set; }
        public ICollection<SlideObject> SlideObjects { get; set; } = new List<SlideObject>();
        public string BackgroundColor { get; set; }
        public string BackgroundImage { get; set; }
    }
}
