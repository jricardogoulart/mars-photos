# Mars Photo Viewer - Vue.js with NASA API

## Objective

This project is a specialized Vue.js application that consumes NASA's Mars Rover Photos API to display images taken by rovers on Mars. The goal is to provide an interactive interface for users to explore Mars through high-quality images directly from NASA.

## Features

- **API Integration:** The application integrates with the NASA Mars Rover Photos API to fetch and display images.
- **Date-Based Search:** Users can search for photos based on the specific date the photos were taken.
- **Rover Selection:** Users can select different Mars rovers (Curiosity, Opportunity, Spirit) to view images captured by each.
- **Responsive Design:** The interface is fully responsive, ensuring a great user experience on both desktop and mobile devices.

## Technologies Used

- **Vue.js:** The primary framework used to build the application.
- **Vue Router:** For managing navigation between different views.
- **Axios:** For making HTTP requests to the NASA API.
- **CSS3:** For styling the application and ensuring a responsive design.
- **NASA Mars Rover Photos API:** The API used to retrieve Mars images.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/mars-photo-viewer.git
    cd mars-photo-viewer
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your NASA API key:

    ```
    VUE_APP_NASA_API_KEY=your_nasa_api_key
    ```

    You can obtain an API key from [NASA's API portal](https://api.nasa.gov/).

4. **Run the development server:**
    ```bash
    npm run serve
    ```

5. **Access the application:**
    Open your browser and go to `http://localhost:8080/`.

## Usage

- **Select a Rover:** Choose a Mars rover (Curiosity, Opportunity, Spirit) to view the images it captured.
- **Search by Date:** Enter a specific date to see the photos taken on that day.
- **View Photos:** Browse through the photos and click on any image to view it in full size.

## Project Structure

- **Components:**
  - `RoverSelector.vue`: Allows users to choose which rover's photos to view.
  - `PhotoGallery.vue`: Displays the fetched images in a gallery format.
  - `PhotoDetail.vue`: Shows detailed information about a selected photo.

- **Services:**
  - `nasaApi.js`: Handles the communication with NASA's API using Axios.

- **Views:**
  - `Home.vue`: The main view where users interact with the rover selection and photo gallery.
  - `About.vue`: Information about the project and the technology used.

## Example Code

Here is a simple example of how you can fetch data from the NASA API using Axios in Vue.js:

```javascript
import axios from 'axios';

export default {
  data() {
    return {
      photos: [],
      rover: 'curiosity',
      date: ''
    };
  },
  methods: {
    fetchPhotos() {
      const apiKey = process.env.VUE_APP_NASA_API_KEY;
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.rover}/photos?earth_date=${this.date}&api_key=${apiKey}`;
      
      axios.get(url)
        .then(response => {
          this.photos = response.data.photos;
        })
        .catch(error => {
          console.error('Error fetching data from NASA API:', error);
        });
    }
  }
};
