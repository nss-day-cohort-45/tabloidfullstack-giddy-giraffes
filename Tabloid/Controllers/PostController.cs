using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public PostController(
            IPostRepository postRepository,
            IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

 

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{postId}")]
        public IActionResult GetUserProfile(int postId)
        {
            var post = _postRepository.GetById(postId);
            if (post != null)
            {
                return Ok(post);
            }
            return NotFound();
        }

        [HttpGet("user-posts")]
        public IActionResult MyPosts()
        {
            UserProfile user = GetCurrentUserProfile();
            return Ok(_postRepository.GetPostsByUser(user.Id));
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            
            post.UserProfileId = currentUserProfile.Id;
            post.PublishDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _postRepository.Delete(id);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        // Retrieves the current user object by using the provided firebaseId
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
