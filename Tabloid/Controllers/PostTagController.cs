using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {

        private readonly IPostTagRepository _postTagRepository;
        private readonly IPostRepository _postRepository;
        public PostTagController(IPostTagRepository postTagRepository, IPostRepository postRepository)
        {
            _postTagRepository = postTagRepository;
            _postRepository = postRepository;
        }



        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.AddPostTag(postTag);
            return NoContent();
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.DeletePostTag(id);
            return NoContent();
        }







    }
}
