using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TabloidMVC.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }


        [HttpGet("GetCommentByPostId/{postId}")]
        public IActionResult GetCommentByPostId(int postId)
        {
            var comment = _commentRepository.GetCommentByPostId(postId);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }


        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _commentRepository.DeleteComment(id);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }


    }
}
