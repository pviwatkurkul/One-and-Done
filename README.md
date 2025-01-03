# One and Done

<img src="./admin/branding/icon.png" width="200">

Welcome to **One and Done**, a feature-rich journal app built with HTML, CSS, and JavaScript. This app allows you to create notes and folders, use markdown for formatting, and manage tasks efficiently.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## Project Links

![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)

- I used Github for project management. Our [GitHub Repository](https://github.com/cse110-sp24-group1/cse110-sp24-group1) has our source code, meeting notes, brainstorming information, kanban board, and much more.
- I'm hosting this [website](https://cse110-sp24-group1.github.io/cse110-sp24-group1/src/) with GitHub Pages.

## Features

- Organized Note and Folder Creation: Easily create and manage your notes and folders to keep your thoughts and tasks well-organized.
- Markdown Support: Utilize powerful markdown capabilities to format your notes with ease, adding structure and emphasis.
- Efficient Task List Management: Keep track of your tasks and to-dos effortlessly with a dedicated task list management system.
- Dual Theme Options: Switch seamlessly between dark mode and light mode to suit your preferences and enhance your writing experience.
- Persistent Data Management: Rely on local storage to securely manage your data, ensuring your notes and tasks are always saved.
- Powerful Search Functionality: Quickly find specific notes and tasks with a robust search bar, enhancing productivity and accessibility.
- Accessibility: Enjoy a user-friendly UI with full keyboard accessibility, ensuring ease of use for everyone.

## Brainstorming and Design Process

![Dribbble](https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white)
![Miro](https://img.shields.io/badge/Miro-F7C922?style=for-the-badge&logo=Miro&logoColor=050036)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

- I used [Dribble](https://dribbble.com/tags/journal-app) for inspiration for our journal app.
- I used this [Miro Board](https://miro.com/app/board/uXjVKSW94aI=/) for our brainstorming and wireframing process.
- I used Figma for [wireframing](https://www.figma.com/design/VSgkp9TLpiEXWHehsFP2Dg/One-and-Done-Journal-App-Wireframing?node-id=0-1&t=y5qAZjXKxdrZl7Rq-1) and [hi-fidelity diagrams](https://www.figma.com/proto/uAhqMx3Dmbe6gv9awADPCt/One-and-Done-Journal-App-Prototype?node-id=2-618&t=U0amyd0JrK52E80l-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2).

## SimpleMDE API

![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)

- I used [SimpleMDE's API](https://simplemde.com/) to implement a markdown editor which includes a tool bar and keyboard shortcuts.

  - **Bold**: `Cmd-B`
  - **Italic**: `Cmd-I`
  - **Link**: `Cmd-K`
  - **Preview**: `Cmd-P`
  - **Unordered List**: `Cmd-L`
  - **Code Block**: `Cmd-Alt-C`
  - **Image**: `Cmd-Alt-I`
  - **Ordered List**: `Cmd-Alt-L`
  - **Heading Bigger**: `Shift-Cmd-H`
  - **Heading Smaller**: `Cmd-H`
  - **Side By Side**: `F9`
  - **Full Screen**: `F11`

## CI/CD Pipeline

![Github Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

My project uses GitHub Actions for Continuous Integration and Deployment. The pipeline includes:

### JSDoc

- I used JSDoc Actions to generate our [project documentation](https://cse110-sp24-group1.github.io/cse110-sp24-group1/docs/index.html) from JavaScript Comments. 

### Superlinter

- To ensure code quality and adherence to community best practices for [Javascript, HTML, CSS,and Markdown](https://github.com/super-linter/super-linter).

### [Calibreapp Image Optimizer](https://github.com/calibreapp/image-actions)

- Optimization of image,icons, and svg storage quality that are stored on the repo without the loss of quality.

### Jest and Puppeteer

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

- For testing purposes.

### [Markdown Link Validator](https://github.com/marketplace/actions/markdown-link-check)

- Tests all links that are implemented using Markdown to ensure all links are reachable and valid.

### [File Changed Checker](https://github.com/marketplace/actions/changed-files)

- Lists and logs all core files that were changed in a specifc branch such as main.

## Repository Organization

- `/admin/meetings`: Contains our meeting notes.
- `/admin/cipipline`: Contains pipeline diagrams.
- `/admin/branding`: Continas branding information.
- `/admin/videos`: Contains progress videos and final demo video.
- `/admin/guidelines`: Contains code style, version control, and CSS style guidelines
- `/docs`: Contains JSDoc information.
- `/specs/adrs`: Contains Architectural Design Records for any major decisions made in our project.
- `/specs/brainstorm`: Contains all of our initial brainstorming from user reasearch to wireframing.
- `/specs/pitch`: Contains our intial project pitch.
- `/src`: Contains source code for our project.

## Wiki

- To learn more about my project and its development, take a look at the [wiki](https://github.com/pviwatkurkul/One-and-Done/wiki).

## Final Project Walkthrough

### Project Development Process and Agile Methods
[![Private Video](https://img.youtube.com/vi/5OWocxIp6Mo/maxresdefault.jpg)](https://www.youtube.com/watch?v=5OWocxIp6Mo&ab_channel=GwendolynWong)

### Demo Video
[![Public Video](https://img.youtube.com/vi/7AvkU47gFOc/maxresdefault.jpg)](https://www.youtube.com/watch?v=7AvkU47gFOc&ab_channel=GwendolynWong)

## Known Bugs
- Markdown plain text centers when previewed
- Markdown image tag only accepts base64 encodings or any urls without photo classifiers (e.g. jpg, png)
- Copy and paste for links with photo classifiers does not work, but everything else is valid.
  
## Future Investigation

- **Time Remaining for Task List**
  - Calculate and display time remaining for each task.
  - Implement visual representation (countdown clock, progress bar).

- **Calendar Widget**
  - Design a tab with an interactive calendar widget.
  - Display notes/tasks due on specific dates.
  - Allow input of daily work hours, displayed on the calendar.

- **Login/Logout Feature**
  - Implement user authentication for account creation and login.
  - Design login and sign-in forms.
  - Create a profile page for user information.
  - Ensure security and cross-platform accessibility.

- **Note Entry Templates**
  - Implement template selection for notes.
  - Predefined templates: Sprint Review, Standup Meeting, Brainstorming Meeting.
