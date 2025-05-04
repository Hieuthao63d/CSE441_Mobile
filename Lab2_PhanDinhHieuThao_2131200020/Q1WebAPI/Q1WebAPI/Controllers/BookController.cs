using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Q1WebAPI.Models;

namespace Q1WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly LibraryManagementContext _context;

        public BookController(LibraryManagementContext context)
        {
            _context = context;
        }

        // GET: api/Book
        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _context.Book.ToListAsync();
            return Ok(books);
        }

        // GET: api/Book/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        // POST: api/Book
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] Book newBook)
        {
            _context.Book.Add(newBook);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.bookID }, newBook);
        }

        // PUT: api/Book/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var existingBook = await _context.Book.FindAsync(id);
            if (existingBook == null)
                return NotFound();

            existingBook.name = updatedBook.name;
            existingBook.description = updatedBook.description;
            existingBook.price = updatedBook.price;
            existingBook.note = updatedBook.note;
            // Nếu bạn có thêm trường khác thì cập nhật thêm ở đây.

            await _context.SaveChangesAsync();
            return Ok(existingBook);
        }

        // DELETE: api/Book/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
                return NotFound();

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
