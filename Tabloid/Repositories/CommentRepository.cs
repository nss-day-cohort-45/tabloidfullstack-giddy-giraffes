using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Tabloid.Models;
using Tabloid.Repositories;

namespace TabloidMVC.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }
        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, up.DisplayName
				           
                        FROM Post p
                         Left JOIN Comment c ON p.Id = c.PostId
                         LEFT JOIN UserProfile up ON c.UserProfileId = up.Id";
                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            DisplayName = new UserProfile() { DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")) },

                        };

                        /*
                        comment.Post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Title = reader.GetString(reader.GetOrdinal("Title"))
                        };

                        
                        comment.UserProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                        };
                        */


                        comments.Add(comment);
                    }

                    reader.Close();

                    return comments;
                }
            }
        }



        public List<Comment> GetCommentByPostId(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id AS CommentId, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                            p.Id AS PostId, p.Title,
                            u.Id AS UserId, u.DisplayName
                        FROM Comment c
                        LEFT JOIN Post p ON c.PostId = p.id
                        LEFT JOIN UserProfile u ON c.UserProfileId = u.id
                        WHERE PostId = @postId
                        ORDER BY c.CreateDateTime DESC
                    ";

                    cmd.Parameters.AddWithValue("@postId", postId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            DisplayName = new UserProfile() { DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")) }
                        };


                      

                        comments.Add(comment);
                    }
                    reader.Close();
                    return comments;
                }
            }
        }





        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (
                            Subject, Content, CreateDateTime, UserProfileId, PostId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Subject, @Content, @CreateDateTime, @UserProfileId, @PostId )";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);

                    comment.Id = (int)cmd.ExecuteScalar();

                }
            }
        }




        public void EditComment(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Comment
                    SET Subject = @subject, Content = @content
                    WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@name", comment.Subject);
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@content", comment.Content);

                    cmd.ExecuteNonQuery();

                }
            }
        }



        public Comment GetCommentById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Subject, Content, PostId, UserProfileId, CreateDateTime
                        FROM Comment
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        };

                        reader.Close();
                        return comment;
                    }

                    reader.Close();
                    return null;
                }
            }
        }



        public void DeleteComment(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Comment
                    WHERE ID = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
}
