using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);

        Tag GetById(int id);
        List<Tag> GetAll();

        void Delete(int id);

        void Update(Tag tag);
    }
}