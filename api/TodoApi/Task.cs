using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi
{
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id{ get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public bool Completed { get; set; }
    }
}
