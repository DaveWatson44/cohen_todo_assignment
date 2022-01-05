# cohen_todo_assignment
Todo List Assignment for Cohen &amp; Co

Using Docker

  Requirements:
  Docker

  To install dependencies:
  1. From the projects root directory, cd into the client directory and run npm install
  2. From the projects root directory, cd into the server directory and run npm install

  To start the app:
  1. From the projects root directory run "./start_dev.sh" or "docker-compose up --build --remove-orphans"


Without Docker

  Requirements:
  Node
  PostgreSQL

  Quick Instructions
    1. Create a database in postgres with the name "todolist". 
    2. Populate the database using the postgres/todolist.sql.
    3. Edit the file server/db/postgresquery.js, replace with your credentials to connect to the database, and replaced @db with @localhost.
    4. Install dependencies in both client and server directories.
    5. Run "npm run serve" in client.
    6. Run "npm run dev" in server.
    7. Visit localhost:8080 in the browser.



  Detailed Instructions
    To install dependencies:
    1. From the projects root directory, cd into the client directory and run npm install.
    2. From the projects root directory, cd into the server directory and run npm install.

    To start the app:
    1. In postgres, please create a database named todolist by running "psql -U postgres" (or your username) to connect to the postgres command line.
    2. From the postgres command line, run the command "CREATE database todolist;", then type \q to exit.
    3. From the projects root directory, cd into the postgres directory and run "psql -U {{ your user name }} -d todolist < todolist.sql". E.g. "psql -U postgres -d todolist < todolist.sql".
    4. From the projects root directory, cd into the server/db directory and edit the file postgresquery.js.
    5. Replace the value of connectionString, with your credentials for the newly created todolist database, and change the db after the @ symbol to localhost. E.g. 'postgresql://username:password@localhost:5432/todolist'.
    6. From server/db, cd back into the server directory and run "npm run dev".
    7. From the projects root directory, cd into the client directory and run "npm run serve".
    8. Visit localhost:8080 in the browser.

