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

    const groupedTab = document.getElementById('grouped-tab');
    if (groupedTab) {
      groupedTab.addEventListener('click', () => {
        console.log('Grouped tab selected');
      });
    }

    const allWordsTab = document.getElementById('all-words-tab');
    if (allWordsTab) {
      allWordsTab.addEventListener('click', () => {
        console.log('All Words tab selected');
      });
    }

    const sortByNameBtn = document.getElementById('sort-by-name-btn');
    if (sortByNameBtn) {
      sortByNameBtn.addEventListener('click', () => {
        console.log('Sort by name clicked');
      });
    }

    const filterByTagsBtn = document.getElementById('filter-by-tags-btn');
    if (filterByTagsBtn) {
      filterByTagsBtn.addEventListener('click', () => {
        console.log('Filter by tags clicked');
      });
    }

    const sortByDateBtn = document.getElementById('sort-by-date-btn');
    if (sortByDateBtn) {
      sortByDateBtn.addEventListener('click', () => {
        console.log('Sort by date clicked');
      });
    }
  }

  if (window.location.pathname.endsWith('select-group-modal.html')) {
    getGroups();

    const newGroupBtn = document.getElementById('new-group-btn');
    if (newGroupBtn) {
      newGroupBtn.addEventListener('click', () => {
        const groupName = prompt('Enter the new group name:');
        if (groupName) {
          createGroup(groupName);
        }
      });
    }

    const selectGroupBtn = document.getElementById('select-group-btn');
    if (selectGroupBtn) {
      selectGroupBtn.addEventListener('click', () => {
        const selectedGroup = getFromSessionStorage('selectedGroup');
        if (selectedGroup) {
          window.location.href = 'add-new-word.html';
        } else {
          alert('Please select a group first.');
        }
      });
    }
  }

  const groupSelector = document.getElementById('group-selector');
  if (groupSelector) {
    groupSelector.addEventListener('click', () => {
      window.location.href = 'select-group-modal.html';
    });
  }

  const partOfSpeechSelector = document.getElementById('part-of-speech');
  if (partOfSpeechSelector) {
    partOfSpeechSelector.addEventListener('change', () => {
      const conjugationsCasesSection = document.getElementById('conjugations-cases-section');
      if (partOfSpeechSelector.value === 'verb' || partOfSpeechSelector.value === 'noun') {
        conjugationsCasesSection.style.display = 'block';
      } else {
        conjugationsCasesSection.style.display = 'none';
      }
    });
  }

  if (window.location.pathname.endsWith('add-new-word.html')) {
    const selectedGroup = getFromSessionStorage('selectedGroup');
    if (selectedGroup) {
      document.getElementById('group-name').textContent = selectedGroup;
      // Clear the selected group so it's not reused
      sessionStorage.removeItem('selectedGroup');
    }

    const editWord = getFromSessionStorage('editWord');
    if (editWord) {
      document.getElementById('group-name').textContent = editWord.group;
      document.getElementById('part-of-speech').value = editWord.partOfSpeech;
      document.getElementById('foreign-word').value = editWord.foreignWord;
      document.getElementById('native-translation').value = editWord.nativeTranslation;
      document.getElementById('example-sentence').value = editWord.exampleSentence;
      document.getElementById('description').value = editWord.description;

      // Change the save button to an update button
      const saveWordBtn = document.getElementById('save-word-btn');
      saveWordBtn.textContent = 'Update Word';

      // Remove the edit word from session storage so it's not reused
      sessionStorage.removeItem('editWord');
    }
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

function saveToSessionStorage(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

function getFromSessionStorage(key) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// -------------------
//  Word Management
// -------------------

function addWord(word) {
    const words = getFromLocalStorage('words') || [];
    const editWord = getFromSessionStorage('editWord');

    if (editWord) {
        words[editWord.index] = word;
    } else {
        words.push(word);
    }
    saveToLocalStorage('words', words);
    console.log('Word saved:', word);
}

function getWords() {
  const words = getFromLocalStorage('words') || [];
  const wordList = document.getElementById('word-list');

  if (wordList) {
    wordList.innerHTML = ''; // Clear existing list

    words.forEach((word, index) => {
      const wordItem = document.createElement('div');
      wordItem.classList.add('relative', 'w-full', 'h-[76px]', 'rounded-xl', 'overflow-hidden', 'group');
      if (index === 1) { // Add a test ID for the second item for verification scripts
        wordItem.setAttribute('data-testid', 'word-item-2');
      }
      wordItem.innerHTML = `
        <div class="absolute inset-0 flex flex-row-reverse">
          <div class="h-full w-16 bg-red-500 flex items-center justify-center text-white cursor-pointer active:bg-red-600 delete-btn">
            <span class="material-symbols-outlined text-xl">delete</span>
          </div>
          <div class="h-full w-16 bg-slate-600 flex items-center justify-center text-white cursor-pointer active:bg-slate-700 edit-btn">
            <span class="material-symbols-outlined text-xl">edit</span>
          </div>
          <div class="h-full w-16 bg-yellow-500 flex items-center justify-center text-black cursor-pointer active:bg-yellow-600 progress-btn">
            <span class="material-symbols-outlined text-xl">equalizer</span>
          </div>
        </div>
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

      let startX = 0;
      let currentX = 0;
      let isSwiping = false;
      const foreground = wordItem.querySelector('.transition-transform');

      wordItem.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        foreground.style.transition = 'none'; // Disable transition during swipe
      });

      wordItem.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        // Only allow swiping to the left, and limit the swipe distance
        if (diff < 0 && diff > -140) {
          foreground.style.transform = `translateX(${diff}px)`;
        }
      });

      wordItem.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const diff = currentX - startX;
        foreground.style.transition = 'transform 0.3s ease'; // Re-enable transition

        // If swipe is more than 50px, snap open. Otherwise, snap back.
        if (diff < -50) {
          foreground.style.transform = 'translateX(-128px)';
        } else {
          foreground.style.transform = 'translateX(0)';
        }
        // Reset startX and currentX in case of another swipe attempt
        startX = 0;
        currentX = 0;
      });

      wordItem.querySelector('.delete-btn').addEventListener('click', () => {
        words.splice(index, 1);
        saveToLocalStorage('words', words);
        getWords();
      });

      wordItem.querySelector('.edit-btn').addEventListener('click', () => {
        saveToSessionStorage('editWord', { ...word, index });
        window.location.href = 'add-new-word.html';
      });
    });
  }
}

// -------------------
//  Group Management
// -------------------

function createGroup(groupName) {
  const groups = getFromLocalStorage('groups') || [];
  groups.push({ name: groupName, words: 0 });
  saveToLocalStorage('groups', groups);
  getGroups();
}

function getGroups() {
    const groups = getFromLocalStorage('groups') || [];
    const groupList = document.getElementById('group-list');
    let selectedGroup = null;

    if (groupList) {
        groupList.innerHTML = ''; // Clear existing list

        groups.forEach(group => {
            const groupItem = document.createElement('div');
            groupItem.classList.add('group', 'flex', 'items-center', 'justify-between', 'p-3', 'rounded-lg', 'hover:bg-black/5', 'dark:hover:bg-white/5', 'transition-colors', 'cursor-pointer');
            groupItem.innerHTML = `
                <div class="flex items-center gap-3 flex-1 overflow-hidden">
                    <div class="flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-surface-dark text-emerald-700 dark:text-emerald-400 shrink-0 size-10">
                        <span class="material-symbols-outlined text-[22px]">folder</span>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-base font-medium truncate">${group.name}</p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">${group.words} words</p>
                    </div>
                </div>
                <div class="shrink-0 pl-2">
                    <div class="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600"></div>
                </div>
            `;
            groupList.appendChild(groupItem);

            groupItem.addEventListener('click', () => {
                // Remove selection from previously selected group
                if (selectedGroup) {
                    selectedGroup.classList.remove('bg-primary/10', 'border', 'border-primary/20');
                    selectedGroup.querySelector('.size-6').innerHTML = '';
                }

                // Add selection style to the new group
                groupItem.classList.add('bg-primary/10', 'border', 'border-primary/20');
                groupItem.querySelector('.size-6').innerHTML = `<span class="material-symbols-outlined text-black text-[16px] font-bold">check</span>`;

                selectedGroup = groupItem;
                saveToSessionStorage('selectedGroup', group.name);
            });
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
