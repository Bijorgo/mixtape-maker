# Mixtape-Maker Project:

This application, mixtape-maker, is a full stack application that allows users to create and customize mixtapes of their favorite songs. Users can add songs, search for songs, create multiple mixtapes, add songs to their mixtapes, mark songs as "listened" or "unlistened" and view mixtapes.

# A Guide To Getting Started:

For backend setup:
In your terminal run the following commands, making sure you are in the Mixtape-Maker root folder:

1. pipenv --python [version]
2. pipenv shell
3. pipenv install flask flask-sqlalchemy flask-migrate
4. export FLASK_APP=mixtape-maker.server.app
5. flask db init
6. flask db migrate -m "Init"
7. flask db upgrade
8. flask run
9. this should make the app's backend running on http://localhost:5000

For frontend setup:
In your terminal:
1. cd into mixtape-maker/src
2. npm install
3. npm run dev
4. the app should now be accessible at: http://localhost:5000

Technologies Used:

Backend technologies:
1. Flask
2. Python
3. SQLAlchemy
4. Alemibic (Flask Migrate)
5. SQLite

Frontend technologies:
1. React
2. React Router
3. Tailwind for styling

Features:
Song management: The ability for the user to add, view and search for songs
Mixtape Creation: The ability for the user to organze songs into customized mixtapes, and view mixtapes
Persistent data storage: Data stored using Flask and SQLalchemy
Interactive Frontend: Built with React and styles using Tailwing


Project Contributors:

Ingeborg Adolfs and Daniel Oshima





