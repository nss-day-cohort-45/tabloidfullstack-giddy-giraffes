using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        void Update(Post post);
        List<Post> GetAll();
        List<Post> GetPostsByUser(int userId);
        Post GetById(int id);
    }
}