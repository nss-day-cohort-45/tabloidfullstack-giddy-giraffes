SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
				p.Id, p.Title AS PostTitle, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId

FROM Post p
 JOIN Comment c ON p.Id = c.PostId;