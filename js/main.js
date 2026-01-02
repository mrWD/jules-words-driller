// Main JavaScript file for the application

document.addEventListener('DOMContentLoaded', () => {
  const signinBtn = document.getElementById('signin-btn');
  if (signinBtn) {
    signinBtn.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      signIn(email, password);
    });
  }

  const signupBtn = document.getElementById('signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      signUp(email, password);
    });
  }

  const startLearningBtn = document.getElementById('start-learning-btn');
  if (startLearningBtn) {
    startLearningBtn.addEventListener('click', () => {
      const nativeLanguage = document.getElementById('native-language-select').value;
      const targetLanguage = document.getElementById('target-language-select').value;
      const additionalLanguages = document.getElementById('additional-language-select').value;

      saveToLocalStorage('languages', {
        native: nativeLanguage,
        target: targetLanguage,
        additional: additionalLanguages
      });

      window.location.href = 'add-word-options.html';
    });
  }

  const saveWordBtn = document.getElementById('save-word-btn');
  if (saveWordBtn) {
    saveWordBtn.addEventListener('click', () => {
      const newWord = {
        group: document.getElementById('group-name').textContent,
        partOfSpeech: document.getElementById('part-of-speech').value,
        foreignWord: document.getElementById('foreign-word').value,
        nativeTranslation: document.getElementById('native-translation').value,
        exampleSentence: document.getElementById('example-sentence').value,
        description: document.getElementById('description').value,
      };
      addWord(newWord);
      window.location.href = 'my-words.html';
    });
  }

  if (window.location.pathname.endsWith('my-words.html')) {
    getWords();
  }
});

// -------------------
//  Authentication
// -------------------

function signIn(email, password) {
  // TODO: Implement backend authentication
  console.log(`Signing in with email: ${email}`);
  // For now, we'll just redirect to the language selection page
  window.location.href = 'choose-language.html';
}

function signUp(email, password) {
  // TODO: Implement backend authentication
  console.log(`Signing up with email: ${email}`);
  // For now, we'll just redirect to the language selection page
  window.location.href = 'choose-language.html';
}

// -------------------
//  Local Storage
// -------------------

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// -------------------
//  Word Management
// -------------------

function addWord(word) {
  const words = getFromLocalStorage('words') || [];
  words.push(word);
  saveToLocalStorage('words', words);
  console.log('Adding word:', word);
}

function getWords() {
  const words = getFromLocalStorage('words') || [];
  const wordList = document.getElementById('word-list');

  if (wordList) {
    wordList.innerHTML = ''; // Clear existing list

    words.forEach(word => {
      const wordItem = document.createElement('div');
      wordItem.classList.add('relative', 'w-full', 'h-[76px]', 'rounded-xl', 'overflow-hidden', 'group');
      wordItem.innerHTML = `
        <div class="absolute inset-0 bg-white dark:bg-card-dark flex items-center justify-between px-4 border border-slate-100 dark:border-white/5 rounded-xl z-10 active:scale-[0.98] transition-transform">
          <div class="flex items-center gap-4">
            <div class="relative w-10 h-10 flex items-center justify-center">
              <div class="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            </div>
            <div class="flex flex-col">
              <p class="text-base font-bold leading-tight">${word.foreignWord}</p>
              <div class="flex items-center gap-2 mt-0.5">
                <p class="text-sm text-slate-500 dark:text-slate-400">${word.nativeTranslation}</p>
                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="text-xs px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-medium">${word.group}</span>
              </div>
            </div>
          </div>
          <span class="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
        </div>
      `;
      wordList.appendChild(wordItem);
    });
  }
}

// -------------------
//  Offline Capabilities
// -------------------

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
