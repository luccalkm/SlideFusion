using CanvasService.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace CanvasService.Services.Converters
{
    public class SlideObjectConverter : JsonConverter<ESlideObject>
    {
        public override ESlideObject Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.String)
            {
                throw new JsonException();
            }

            var stringValue = reader.GetString();
            foreach (var field in typeToConvert.GetFields())
            {
                var attribute = field.GetCustomAttribute<DisplayAttribute>();
                if (attribute != null && attribute.Name == stringValue)
                {
                    return (ESlideObject)field.GetValue(null);
                }
            }

            throw new JsonException($"Unknown value: {stringValue}");
        }

        public override void Write(Utf8JsonWriter writer, ESlideObject value, JsonSerializerOptions options)
        {
            var field = value.GetType().GetField(value.ToString());
            var attribute = field.GetCustomAttribute<DisplayAttribute>();
            var stringValue = attribute != null ? attribute.Name : value.ToString();
            writer.WriteStringValue(stringValue);
        }
    }
}
