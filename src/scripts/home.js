/**
 * Main page folder ID.
 * @constant {string}
 */
const MAIN_ID = '0';

/**
 * Class representing the HomeScript for managing notes and folders.
 */
class HomeScript {
  /**
   * Create a HomeScript instance.
   */
  constructor () {
    // Selects the new note button
    this.newNoteButton = document.getElementById('new-note-button');
    // Selects the new folder button
    this.newFolderButton = document.getElementById('new-folder-button');
    // Selects the top right buttons: new note and new folder
    this.topRightButtons = document.querySelector('.top-right-buttons');
    // Selects the search bar
    this.searchBar = document.querySelector('.search-container');
    // Selects the previous folder button
    this.folderBackButton = document.getElementById('folder-back-button');
    // Selects the journal header
    this.journalHeader = document.querySelector('.journal-header');
    // Selects the navigation bar
    this.navBar = document.querySelector('nav');
    // Select the main element of the html file where the notes will be displayed
    this.mainElement = document.querySelector('main');
    // A list of all of the notes in main home
    this.notes = getNotesByFolderID(MAIN_ID); 
    // A list of all of the folders in main home
    this.folders = getFoldersByID(MAIN_ID);
    // A const representing the current folder
    this.currentFolderID = MAIN_ID;
    // A const representing the parent folder
    this.parentFolderID = null;

    // Add event listener to open the modal on click of the new note button
    this.newNoteButton.addEventListener('click', this.openModal.bind(this));
    // Add event listener to create a new folder on click of the new folder button
    this.newFolderButton.addEventListener('click', this.createFolder.bind(this));
    // Add event listener to return to parent folder on click of back button
    this.folderBackButton.addEventListener('click', () => {this.visitFolder(this.parentFolderID);});
    
    // Within main folder hide back button, otherwise show it
    if(this.currentFolderID === MAIN_ID) {
      this.folderBackButton.classList.add('hide-notes');
    }
    else {
      this.folderBackButton.classList.remove('hide-notes');
    }
    
    // Render everything on main page
    this.render();
  }

  /**
   * Create a new note.
   * @param {string} title - The title of the note.
   * @param {string} body - The body content of the note.
   * @param {string} labelId - The label ID of the note.
   */
  createNote (title, body,labelId) {
    const note = {
      title,
      body,
      id: `note-${Date.now()}`, // unique id for the note
      folderID: this.currentFolderID, // assign to current folder
      label: labelId
    };
    // Add note to the notes array
    this.notes.push(note);

    // Render the notes to the homepage
    this.render();
  }

  /**
   * Create a new folder.
   */
  createFolder () {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      const folder = {
        name: folderName,
        id: `folder-${Date.now()}`, // unique id for the folder
        parentFolderID: this.currentFolderID
      };
      // Add folder to the folders array
      this.folders.push(folder);

      saveFolder(folder);

      // Render the folders to the homepage
      this.render();
    };
  }

  /**
   * Render the notes and folders on the main page.
   */
  render () {
    console.log(this.currentFolderID + ' ' + this.parentFolderID);
    // Clear main element
    this.mainElement.innerHTML = '';

    // Render all folders in current folder
    this.folders.forEach(folder => {
      const folderElement = document.createElement('div');
      folderElement.classList.add('folder');
      folderElement.setAttribute('data-folder-id', folder.id);
      folderElement.innerHTML = `<h3>${folder.name}</h3>`;

      // Click to open folder
      folderElement.addEventListener('click', () => {
        this.visitFolder(folder.id);
      });

      this.mainElement.appendChild(folderElement);
    });

    // Render all notes in current folder
    this.notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.setAttribute('data-note-id', note.id);
      noteElement.innerHTML = `
        <div class='note-content' id=${note.label}>
            <p>${note.body}</p>
        </div>
        <div class='note-title'>
            <h3>${note.title}</h3>
        </div>`;

      // Click to open edit modal
      noteElement.addEventListener('click', () => {
        this.editModal(this.notes.indexOf(note), note.title, note.body);
      });
      this.mainElement.prepend(noteElement);
    });
  }

  /**
   * Open the modal for creating a new note.
   */
  openModal () {
    // Add blur class to navigation bar
    this.navBar.classList.add('blur');
    // Remove the display of notes with the open modal
    this.mainElement.classList.add('hide-notes');
    // Remove the display of search bar with the open modal
    this.searchBar.style.display = 'none';
    // Remove the display of journal header with the open modal
    this.journalHeader.classList.add('hide-notes');
    // Create modal element for 'div' of home html
    const modal = document.createElement('div');
    // Modal class for css design
    modal.classList.add('modal');
    // Modal content
    modal.innerHTML = `
            <div class='note-modal'>
                <span class='close-modal'>&times;</span>
                <div class='modal-title'>
                    <h2>New Note</h2>
                </div>
                <form id='modal-form'>
                    <div class='modal-input'>
                        <input type='text' id='note-title' name='note-title' placeholder='Page Title'>
                    </div>
                    <div class='modal-input'>
                        <select id='note-label' name='note-label'>
                            <option value='' disabled selected>Select Label</option>
                            <option value='code-snippets'>Code Snippets</option>
                            <option value='stand-up'>Stand-Up Notes</option>
                            <option value='bug-reports'>Bug Reports</option>
                            <option value='learning-notes'>Learning Notes</option>
                            <option value='newsletter'>Newsletters</option>
                            <option value='performance'>Performance Metrics</option>
                            <option value='feature-ideas'>Feature Ideas</option>
                        </select>
                    </div>
                    <div class='modal-input'>
                      <div class='textarea-container'>
                        <textarea id='note-body' name='note-body'></textarea>
                        <div class='modal-buttons'>
                          <button type='button' name='input-Text' id='input-text'></button>
                          <button type='button' name='input-Image' id='input-image'></button>
                          <button type='button' name='input-Markdown' id='input-markdown'></button>
                      </div>
                    </div>
                    <button class='create-button' type='submit'>Create</button>
                </form>
            </div>
        `;
    // Append modal to main body
    document.body.appendChild(modal);
    // Hide the top right buttons
    this.topRightButtons.style.display = 'none';

    // Close modal when clicking the close button
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
      // Show the top right buttons again
      this.topRightButtons.style.display = 'flex';
      // Show the search bar again
      this.searchBar.style.display = 'flex';
      // Remove the blur class from the navigation bar
      this.navBar.classList.remove('blur');
      // Unhide the notes from display
      this.mainElement.classList.remove('hide-notes');
      // Unhide the search bar from display
      this.journalHeader.classList.remove('hide-notes');
    });

    // Create modal when clicking the create new note button
    const createButton = modal.querySelector('.create-button');
    createButton.addEventListener('click', (event) => {
      // Prevent default form submission
      event.preventDefault();
      // Take the values inputted from the modal form
      const title = modal.querySelector('#note-title').value;
      const body = modal.querySelector('#note-body').value;
      const labelId = modal.querySelector('#note-label').value;
      console.log(labelId);
      // Create a new note
      this.createNote(title, body,labelId);

      //save to local storage
      saveNote(this.notes[this.notes.length - 1]);

      document.body.removeChild(modal);
      // Show the top right buttons again
      this.topRightButtons.style.display = 'flex';
      // Remove the blur class from the navigation bar
      this.navBar.classList.remove('blur');
      // Unhide the notes from display
      this.mainElement.classList.remove('hide-notes');
      // Unhide the search bar from display
      this.searchBar.style.display = 'flex';
      // Unhide the journal header from display
      this.journalHeader.classList.remove('hide-notes');
    });
  }

  /**
   * Open the modal to edit an existing note.
   * @param {number} index - The index of the note in the notes array.
   * @param {string} title - The title of the note.
   * @param {string} body - The body content of the note.
   */
  editModal (index, title, body) {
    // Add blur class to navigation bar
    this.navBar.classList.add('blur');
    // Remove the display of notes with the open modal
    this.mainElement.classList.add('hide-notes');
    // Remove the display of search bar with the open modal
    this.searchBar.style.display = 'none';
    // Remove the display of journal header with the open modal
    this.journalHeader.classList.add('hide-notes');
    // Create modal element for 'div' of home html
    const modal = document.createElement('div');
    // Modal class for css design
    modal.classList.add('modal');

    // Modal content
    modal.innerHTML = `
            <div class='note-modal'>
                <div class='edit-modal-title'>
                    <h2 contenteditable='true'>${title}</h2>
                </div>
                <form id='note-modal-form'>
                    <button class='back-button' type='submit'>Back</button>
                    <div>
                        <textarea id='edit-note-body' name='note-body'>${body}</textarea>
                        <div class='exist-modal-buttons'>
                          <button type='button' class='exist-input-button' name='exist-input-Text'>Text</button>
                          <button type='button' class='exist-input-button' name='exist-input-Image'>Image</button>
                          <button type='button' class='exist-input-button' name='exist-input-Markdown'>MDown</button>
                        </div>
                    </div>
                    <button class='save-button' type='submit'>Save</button>
                </form>
            </div>
        `;
    // Append modal to main body
    document.body.appendChild(modal);
    // Hide the top right buttons
    this.topRightButtons.style.display = 'none';

    // Close modal when clicking the back button
    const backButton = modal.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      document.body.removeChild(modal);
      // Show the top right buttons again
      this.topRightButtons.style.display = 'flex';
      // Remove the blur class from the navigation bar
      this.navBar.classList.remove('blur');
      // Unhide the notes from display
      this.mainElement.classList.remove('hide-notes');
      // Unhide the search bar from display
      this.searchBar.style.display = 'flex';
      // Unhide the journal header from display
      this.journalHeader.classList.remove('hide-notes');
    });

    // Close modal when clicking save, also update the note accordingly
    const saveButton = modal.querySelector('.save-button');
    saveButton.addEventListener('click', (event) => {
      // Prevent default form submission
      event.preventDefault();
      // Take the values inputted from the modal form
      const newTitle = modal.querySelector('.edit-modal-title h2').innerText;
      const newBody = modal.querySelector('#edit-note-body').value;

      // Edit the note with updated title and body
      this.notes[index].title = newTitle;
      this.notes[index].body = newBody;
      this.render();

      document.body.removeChild(modal);
      // Show the top right buttons again
      this.topRightButtons.style.display = 'flex';
      // Remove the blur class from the navigation bar
      this.navBar.classList.remove('blur');
      // Unhide the notes from display
      this.mainElement.classList.remove('hide-notes');
      // Unhide the search bar from display
      this.searchBar.style.display = 'flex';
      // Unhide the journal header from display
      this.journalHeader.classList.remove('hide-notes');
    });
  }

  /**
   * Visit a folder by its ID.
   * @param {string} newFolderId - The ID of the folder to visit.
   */
  visitFolder(newFolderId) {
    //calling temp method
    let newFolder = getFolderByID(newFolderId);

    // if folder not found, must be main
    if(!newFolder) {
      this.currentFolderID = MAIN_ID;
      this.parentFolderID = null;
      console.log('hi');
    }
    else {
      this.currentFolderID = newFolderId;
      this.parentFolderID = newFolder.parentFolderID;
    }

    // Set folders / notes list
    this.folders = getFoldersByID(this.currentFolderID);
    this.notes = getNotesByFolderID(this.currentFolderID);

    // If within main folder hide back button, otherwise show it
    if(this.currentFolderID === MAIN_ID) {
      this.folderBackButton.classList.add('hide-notes');
      this.journalHeader.innerText = 'My Journal';
    }
    else {
      this.folderBackButton.classList.remove('hide-notes');
      this.journalHeader.innerText = 'My Journal (' + newFolder.name + ')';
    }

    //render folders / notes
    this.render();
  }
}

/**
 * Initialize HomeScript when the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  new HomeScript();
});