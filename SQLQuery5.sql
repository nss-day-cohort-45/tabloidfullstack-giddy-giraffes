SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, up.DisplayName
				           
                        FROM Post p
                         Left JOIN Comment c ON p.Id = c.PostId
                         LEFT JOIN UserProfile up ON c.UserProfileId = up.Id;