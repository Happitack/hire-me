# Famly Nursery Application

## Description
The Famly Nursery Application is designed to manage the attendance and activities of children in a nursery. It allows staff to easily check children in and out, view their attendance status, and interact with the Famly API for up-to-date information

## Setup / Installation

**1. Clone the repository to a local directory of your choosing and navigate to the selected folder**

   ```bash
   git clone https://github.com/Happitack/hire-me
   cd hire-me
   ```
**2. Install the required project dependencies**

   ```bash
   npm install
   ```
**3. Configure the environment variables**

    - Update the `.env.example` file included in the project to match your API credentials (API URL, access token, group ID, institution ID).
    - Rename the file from `.env.example` to `.env`

   ```bash
   mv .env.example .env
   ```

**4. Run the application**
   ```bash
   npm start
   ```

## Included Packages
- **[Axios:](https://www.npmjs.com/package/axios)** For making HTTP requests to the Famly API
- **[React DOM:](https://www.npmjs.com/package/react-dom)** For handling navigation and routing within the app

## Design Decisions
**Axios for API Integration:**

The decision to use Axios was made due to its simple and easy-to-use API for handling HTTP requests. It also provides built-in support for intercepting requests and responses, making it ideal for interacting with the provided API

**Environment Configuration:**

By utilizing a .env file, environmental variables can be managed outside the codebase, making it easy to switch between environments and ensuring that sensitive information such as access tokens are stored locally.
