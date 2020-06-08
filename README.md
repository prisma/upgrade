# prisma-upgrade (Beta)

Upgrade is a CLI tool to help Prisma 1 users upgrade to Prisma 2.

This is a **Beta Tool** meaning that it works for the most part and is fairly well-tested but it lacks the real-world's harsh realities. You should always run the SQL generated by this tool on your test or staging databases.

## Usage

```sh
$ prisma-upgrade
```

See [our documentation](https://www.prisma.io/docs/guides/upgrade-from-prisma-1/how-to-upgrade#prisma-upgrade-cli) for more information about how to upgrade your Prisma 1 datamodel to Prisma 2.

## Current features

This table reflects the _current_ feature set of the upgrade CLI and will be updated continuously. Read below for a more detailled explanation of each column. You can also find more info about each of these feautures in the [docs](https://www.prisma.io/docs/guides/upgrade-from-prisma-1/schema-incompatibilities).

| Name                                | MySQL   | PostgreSQL | Prisma schema | Prisma 1 compatible |
| ----------------------------------- | ------- | ---------- | ------------- | ------------------- |
| Default values                      | Yes     | Yes        | Yes           | Yes                 |
| @updatedAt                          | n/a     | n/a        | Yes           | Yes                 |
| Missing UNIQUE for inline 1-1       | Yes     | Yes        | Yes           | Yes                 |
| JSON                                | Yes     | Yes        | Yes           | Yes                 |
| Enums                               | Yes     | Yes        | Yes           | Yes                 |
| Generated IDs                       | n/a     | n/a        | Yes           | Yes                 |
| @createdAt                          | Yes     | Yes        | Yes           | Yes                 |
| Relation tables are all m-n         | Not yet | Not yet    | Not yet       | No                  |
| Scalar lists have extra table       | Not yet | Not yet    | Not yet       | No                  |
| Cascading deletes                   | No      | No         | No            | No                  |
| Maintain order of models and fields | n/a     | n/a        | Not yet       | No                  |
| Maintain relation names             | n/a     | n/a        | Not yet       | No                  |

What do the columns mean?

- **MySQL**: Does the CLI generate the correct MySQL statements to solve the problem?
- **PostgreSQL**: Does the CLI generate correct PostgreSQL statements to solve the problem?
- **Prisma schema**: Does the final Prisma schema I get from the CLI reflect the right solution?
- **Prisma 1 compatible:** Does the SQL change to the schema maintain Prisma 1 compatibility?

## How Prisma Upgrade (Technically) Works

We parse your Prisma 1 datamodel and your Prisma 2.0 schema and run both ASTs through a set of rules. These rules produce operations. The operations are printed into SQL commands for you to run on your database.

Prisma upgrade is idempotent, so you can run it as many times as you want and it will produce the same result each time. Prisma upgrade only shows you commands you still need to run, it does not show you commands you've already run.

You'll also notice that we never connect to your database, we simply look at your Prisma 1 files and your Prisma 2.0 schema and generate from there!

## Tests

Testing consists of 2 parts: a Local SQL Dump and Running Tests

### Local SQL Dump

_Requirements:_ MySQL@5, Docker

Since it's cumbersome to run Prisma 1 in CI, we need to locally setup test cases first

### Setting up MySQL for examples

```
mysqladmin -h localhost -u root create prisma
mysql -h localhost -u root prisma < ./examples/mysql-ablog/dump.sql
mysqladmin -h localhost -u root drop prisma -f
```
