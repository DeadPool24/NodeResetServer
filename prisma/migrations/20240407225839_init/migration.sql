-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "fecha" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
