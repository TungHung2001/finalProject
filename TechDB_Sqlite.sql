CREATE TABLE Categories (
	CategoryId int NOT NULL,
	ShortName TEXT,
	DisplayName TEXT,
	SortOrder int,
	CONSTRAINT PK_Categories Primary Key (CategoryId)
)
GO


CREATE TABLE "Posts" (
	"Id"	INTEGER NOT NULL,
	"Title"	TEXT,
	"CreatedDate"	INTEGER NOT NULL,
	"Cover"	TEXT,
	"ShortBody"	TEXT,
	"FullBody"	TEXT,
	"InnerText"	TEXT,
	"Editor"	TEXT,
	"EditorId"	TEXT,
	"LikeCount"	INTEGER NOT NULL DEFAULT 0,
	"DislikeCount"	INTEGER NOT NULL DEFAULT 0,
	CONSTRAINT "PK_Posts" PRIMARY KEY("Id" AUTOINCREMENT)
);


CREATE TABLE "PostCategories" (
	"CategoryId"	INTEGER NOT NULL,
	"PostId"	INTEGER NOT NULL,
	CONSTRAINT "PK_Posts" PRIMARY KEY("CategoryId", "PostId")
);

CREATE TABLE "Likes" (
	"UserId"	TEXT NOT NULL,
	"PostId"	INTEGER NOT NULL,
	CONSTRAINT "PK_Likes" PRIMARY KEY("UserId", "PostId")
);


CREATE TABLE "Notes" (
	"Id"	INTEGER NOT NULL,
	"PostId"	INTEGER  NOT NULL,
	"CreatedDate"	INTEGER NOT NULL,
	"UserId"	TEXT,
	"UserName"	TEXT,
	"Content"	TEXT,
	CONSTRAINT "PK_Notes" PRIMARY KEY("Id" AUTOINCREMENT)
);

CREATE INDEX "IX_Notes_PostId" ON "Notes" ("PostId")





INSERT into Categories (CategoryId, ShortName, DisplayName, SortOrder) VALUES
(1, 'mobile', 'Mobile', 10),
(2, 'tin-ict', 'Tin ICT', 20),
(3, 'internet', 'Internet', 30),
(4, 'kham-pha', 'Khám Phá', 40),
(5, 'tra-da', 'Trà Đá', 50)
