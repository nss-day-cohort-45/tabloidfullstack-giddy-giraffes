using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAllUsers();
        UserProfile GetUserProfileById(int id);
        void Deactivate(int userProfileId);
        void Reactivate(UserProfile user);
    }
}