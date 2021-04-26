using Tabloid.Models;

namespace TabloidMVC.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void DeleteComment(int id);
        void EditComment(Comment comment);
        System.Collections.Generic.List<Comment> GetAllComments();
        Comment GetCommentById(int id);
        System.Collections.Generic.List<Comment> GetCommentByPostId(int postId);
  //      void Update(Comment comment);
    }
}