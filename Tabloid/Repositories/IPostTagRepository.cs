using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void AddPostTag(PostTag postTag);
        void DeletePostTag(int postTagId);
        void PostTagExist(PostTag postTag);
        void UpdatePostTag(PostTag postTag);

    }
}