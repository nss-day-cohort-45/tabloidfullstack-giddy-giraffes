using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {

        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT  Id, [Name]
                          FROM  Tag
                      ORDER BY  Name";

                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();
                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            
                        });
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public Tag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT [Name]
                            FROM Tag
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Tag tag = null;
                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                           
                        };
                    }

                    reader.Close();

                    return tag;
                }
            }
        }




        public void Add(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tag ([Name])
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    

                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", tagId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Tag
                           SET [Name] = @Name
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@Id", tag.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<Tag> GetTagsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  t.Id, t.[Name], pt.PostId, pt.Id AS PostTagId
                        FROM    Tag t
                                LEFT JOIN PostTag pt on t.Id = pt.TagId
                        WHERE pt.PostId = @postId";

                    cmd.Parameters.AddWithValue("@postId", postId);

                    var reader = cmd.ExecuteReader();

                    List<Tag> tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(NewTagFromReader(reader));
                       
                    }

                    reader.Close();
                    return tags;
                }
            }
        }






        private Tag NewTagFromReader(SqlDataReader reader)
        {
            return new Tag()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                 PostTag = new PostTag()
                 {
                     Id = DbUtils.GetInt(reader, "PostTagId"),
                  

                 },
            };
        }

      

    }
}
