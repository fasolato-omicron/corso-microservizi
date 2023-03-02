CREATE TABLE "item" (
	"id"	TEXT NOT NULL,
	"Description"	TEXT NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "stock" (
	"id"	TEXT,
	"itemId"	TEXT,
	"quantity"	INTEGER NOT NULL,
	"status"	TEXT NOT NULL DEFAULT 'OK',
	PRIMARY KEY("id","itemId")
);

insert into item values ('7bfe990c-4444-4147-9c12-16fa227a336b', 'Penna BIC nera');
insert into item values ('c83aec45-1df1-4a1b-816e-6e980c020e6d', 'Penna BIC blu');
insert into item values ('83f77202-f536-48c9-80ca-a8c266e183b0', 'Penna BIC rossa');
insert into item values ('15fc188f-963b-4df4-8065-85f1c03f44e4', 'Penna BIC verde');

insert into stock values('6a2cabdc-b1e9-44a3-810e-62a4d9a74295', '7bfe990c-4444-4147-9c12-16fa227a336b', 100, 'OK');
insert into stock values('ec21b0a5-364d-45b2-a51e-8cf8cf5fa61b', '7bfe990c-4444-4147-9c12-16fa227a336b', 20, 'OK');
insert into stock values('e4a642e5-a344-4de6-8393-bbbc918961ac', 'c83aec45-1df1-4a1b-816e-6e980c020e6d', 200, 'OK');
insert into stock values('82d81357-52db-4064-94fd-7f2eab67d0b3', '83f77202-f536-48c9-80ca-a8c266e183b0', 300, 'OK');
insert into stock values('3b8b7b2f-03a2-40b0-8aee-2c554aa3a7ee', '83f77202-f536-48c9-80ca-a8c266e183b0', 50, 'Locked');
insert into stock values('24e42d96-4135-4729-9e3d-ffdec37eecbb', '15fc188f-963b-4df4-8065-85f1c03f44e4', 30, 'Locked');
