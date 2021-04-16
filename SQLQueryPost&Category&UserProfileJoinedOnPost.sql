SELECT p.Id, p.Title, p.Content, 
                               p.ImageLocation,
                               p.CreateDateTime, p.PublishDateTime, p.IsApproved,

                               c.Name as CategoryName,

                               up.DisplayName, up.FirstName,
                               up.LastName, up.Email, up.ImageLocation

                          FROM Post p
                          LEFT JOIN Category c ON p.CategoryId = c.Id
                          LEFT JOIN UserProfile up ON p.UserProfileId = up.Id;