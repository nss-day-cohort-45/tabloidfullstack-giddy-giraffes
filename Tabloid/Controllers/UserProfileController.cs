using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }


        [HttpGet]
        public ActionResult Get()
        {
            List<UserProfile> profiles = _userProfileRepository.GetAllUsers();

            return Ok(profiles);
        }
        [HttpGet("user{id}")]
        public ActionResult Detail(int id)
        {
            UserProfile profile = _userProfileRepository.GetUserProfileById(id);


            return Ok(profile);
        }
        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;


            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
        [Authorize]
        public ActionResult DeactivateUser(int id)
        {
            UserProfile userProfile = _userProfileRepository.GetUserProfileById(id);

            int userId = GetCurrentUserId();

            UserProfile currentUser = _userProfileRepository.GetUserProfileById(userId);

            if (currentUser.UserTypeId == 1)
            {
                return View(userProfile);
            }

            return NotFound();
        }

        // POST: UserProfileController/DeactivateUser/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeactivateUser(int id, UserProfile userProfile)
        {
            try
            {
                _userProfileRepository.DeactivateUserById(id);
                return RedirectToAction("Index");
            }
            catch
            {
                return Ok();
            }
        }
    }
}
