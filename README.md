We will be using the API from [The Movie Database](https://developers.themoviedb.org/3) to make the app. This is one of the most comprehensive and high quality , yet free, API on the internets. It provides high quality images, many filter options, dynamic search endpoint and even authentication to the actual TMDB account to add movie to favorite list. So read carefully the documentation as they are very detailed.
# The Movie App
You are required to build a React front end web to display movies info around the world.

## User Story
* User sees many movies layout on website
* User sees paginate through all movies from the database
* User sees detail of one single movie, in a seperate page, when select a movie from the list
* User sees information about movie (authors, description, title, genres …)
* User sees filter UI and can filter movie by genres
* User sees search UI and can search movie in the database by keyword
* User sees the website is responsive for the minimum of Desktop, Iphone and Tablet
* User sees routes that allow user revisit to the same display when using such routes
* :rocket: User can pick favorite movie and save it. 
    * There is an endpoint to make this happen, it is quite challenging however. So we also allow using localStorage as a solution. But keep in mind that the correct way to make features like this is using a dedicated endpoint from the API to interact with the server and update the data