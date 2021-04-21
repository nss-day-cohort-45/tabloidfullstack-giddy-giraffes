using System.Collections.Generic;
using Tabloid.Models;

namespace TabloidMVC.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void DeleteComment(int id);
        void EditComment(Comment comment);
        List<Comment> GetAllComments();
        Comment GetCommentById(int id);
        List<Comment> GetCommentsByPostId(int postId);
    }
}