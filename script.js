// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    databaseURL: "your-database-url",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const editorRef = ref(database, "shared-editor");

// Get the textarea
const sharedEditor = document.getElementById("shared-editor");

// Listen for changes in the database
onValue(editorRef, (snapshot) => {
    const data = snapshot.val();
    if (data && sharedEditor.value !== data.text) {
        sharedEditor.value = data.text; // Update editor content in real-time
    }
});

// Sync changes to the database
sharedEditor.addEventListener("input", () => {
    set(editorRef, {
        text: sharedEditor.value,
    });
});
