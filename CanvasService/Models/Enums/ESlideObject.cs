using System.ComponentModel.DataAnnotations;

namespace CanvasService.Models.Enums
{    public enum ESlideObject
    {
        [Display(Name = "Text")]
        Text,
        [Display(Name = "Image")]
        Image,
        [Display(Name = "Video")]
        Video,
        [Display(Name = "Shape")]
        Shape
    }
}
