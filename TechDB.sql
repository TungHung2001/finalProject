USE TechDB


-- Roles
CREATE TABLE Roles (
	RoleId int NOT NULL,
	RoleName varchar(128),
	CONSTRAINT PK_Roles Primary Key (RoleId)
)
GO

CREATE TABLE Categories (
	CategoryId int NOT NULL,
	CateoryName nvarchar(128),
	CONSTRAINT PK_Categories Primary Key (CategoryId)
)
GO

-- Users
CREATE TABLE Users(
	UserId int identity(1,1) NOT NULL,
	Username nvarchar(256) NOT NULL,
	PasswordHash varchar(256) NOT NULL,
	FullName nvarchar(256) NOT NULL,
	Avatar nvarchar(2048) NULL,
	RoleId int NOT NULL,
	
	Token UniqueIdentifier NULL,
	Expired DateTime NULL,

	CreatedUtc Datetime default(getutcdate()),
	CONSTRAINT PK_Users Primary Key (UserId)
)
GO

CREATE UNIQUE NONCLUSTERED INDEX IX_Users_Username ON Users(Username);
GO

-- Posts
CREATE TABLE Posts(
	PostId int identity(1,1) NOT NULL,
	EditorId int NOT NULL,
	Title nvarchar(2048) NOT NULL,
	Cover nvarchar(2048) NOT NULL,
	ShortBody nvarchar(max) NOT NULL,
	FullBodyHtml nvarchar(max) NOT NULL,
	SearchText nvarchar(max) NOT NULL,
	CreatedUtc Datetime default(getutcdate()),
	UpdatedUtc Datetime default(getutcdate()),

	CONSTRAINT PK_Posts Primary Key (PostId),
	CONSTRAINT FK_Posts_EditorId Foreign key (EditorId) References Users(UserId)
)
GO

CREATE TABLE Likes(
	PostId int NOT NULL,
	UserId int NOT NULL,
	CreatedUtc Datetime default(getutcdate()),

	CONSTRAINT PK_Likes Primary Key (PostId, UserId)
)

CREATE TABLE Comments(
	CommentId int identity(1,1) NOT NULL,
	PostId int NOT NULL,
	UserId int NOT NULL,
	Content nvarchar(max) NOT NULL,
	CreatedUtc Datetime default(getutcdate()),
	CONSTRAINT PK_Comments Primary Key (CommentId),
	CONSTRAINT FK_Comments_UserId Foreign key (UserId) References Users(UserId)
)

CREATE UNIQUE NONCLUSTERED INDEX IX_Comments_Post ON Comments(PostId desc, CreatedUtc desc);
GO


INSERT INTO Roles VALUES 
(1, 'Admin'),
(2, 'Editor'),
(3, 'Reader')
GO



INSERT INTO Users (Username, PasswordHash, FullName, RoleId, Token, Expired)
VALUES 
('admin1', 'e00cf25ad42683b3df678c61f42c6bda', N'Admin', 1, '29230c09-d20d-4f81-a41f-000000000001', '2023-01-01'),
('editor1', 'e00cf25ad42683b3df678c61f42c6bda', N'??c Hoàng', 2, '29230c09-d20d-4f81-a41f-000000000002', '2023-01-01'),
('reader1', 'e00cf25ad42683b3df678c61f42c6bda', N'Ghost', 3, '29230c09-d20d-4f81-a41f-000000000003', '2023-01-01')

