using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;
using TabloidMVC.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpGet("GetCommentById/{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }


        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
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


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
