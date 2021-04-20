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
            post.CreateDateTime = DateTime.Now;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpGet("delete-post")]
        public ActionResult Delete(Post post)
        {
            UserProfile user = GetCurrentUserProfile();

            if (post.UserProfileId != user.Id)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // POST: PostController/Delete/#
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                _postRepository.Delete(id);

                return RedirectToAction("MyPosts");
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
