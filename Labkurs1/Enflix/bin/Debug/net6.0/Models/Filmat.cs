

using System.Text.Json.Serialization;

namespace Enflix.Models
{
    public class Filmat
    {
        public int FilmatId { get; set; }

        public string? Titulli { get; set; }

        public string? Foto { get; set; }

        public DateTime? Data_Postimit { get; set; }

        public string? Pershkrimi_Filmit { get; set; }

        public string? Linku_Filmit { get; set; }

        public int? AktoriID { get; set; }

        public int? KategoriaID { get; set; }

        public int? ProducentiID { get; set; }

        public int? RegjisoriID { get; set; }

        public int? SkenaristiID { get; set; }
    }
}
