const api = '/api/notes';
const notesList = document.getElementById('notesList');
const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');

async function fetchNotes() {
  const res = await fetch(api);
  const data = await res.json();
  renderNotes(data);
}

function renderNotes(notes) {
  notesList.innerHTML = '';
  if (!notes.length) {
    notesList.innerHTML = '<li><em>Chưa có ghi chú nào.</em></li>';
    return;
  }
  notes.forEach(n => {
    const li = document.createElement('li');
    li.textContent = n.text + ' ';
    const del = document.createElement('button');
    del.textContent = 'Xóa';
    del.onclick = async () => {
      await fetch(`${api}/${n.id}`, { method: 'DELETE' });
      fetchNotes();
    };
    li.appendChild(del);
    notesList.appendChild(li);
  });
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (!text) return;
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  noteInput.value = '';
  fetchNotes();
});

fetchNotes();
