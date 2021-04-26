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
        [HttpPost("add/{52}")]
        public IActionResult Post(Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();

            comment.UserProfileId = currentUserProfile.Id;
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(Comment comment)
        {
  //          _commentRepository.Update(comment);
            return NoContent();
        }

        // Retrieves the current user object by using the provided firebaseId
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
