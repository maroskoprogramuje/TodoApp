using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Context;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly AppDbContext _context;
        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Task>>> GetTasks()
        {
            return Ok(await _context.Tasks.OrderBy(task => task.Completed).ThenBy(task => task.Id).ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Task>>> CreateTask(Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Task>>> UpdateTask(Task task)
        {
            var dbTask = await _context.Tasks.FindAsync(task.Id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            dbTask.Name = task.Name;
            dbTask.Description = task.Description;
            dbTask.Date = task.Date;
            dbTask.Completed = task.Completed;

            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Task>>> DeleteTask(int id)
        {
            var dbTask = await _context.Tasks.FindAsync(id);
            if (dbTask == null)
                return BadRequest("Task not found.");

            _context.Tasks.Remove(dbTask);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }
    }
}
