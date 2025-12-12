async function getId(username) {
  const r = await fetch(`https://api.github.com/users/${username}`);
  if (!r.ok) throw new Error(`Could not fetch user (${r.status})`);
  const j = await r.json();
  console.log('fetched username', username, 'id', j.id);
  return j.id;
}

function md5hex(str) {
  return md5(str);
}

let TIMEOUT = 250;
let timeout = null;

function onChange(e) {
  //console.log('onChange', e);
  clearTimeout(timeout);
  timeout = setTimeout(generate, TIMEOUT);
}

function generate() {
  const id = document.getElementById('userid').value;

  //let id = 852547;

  const hash = md5(String(id));
  //console.log(hash, hsl2rgb);

  const m = hash.split('').map(c => parseInt(c,16));
  const H = (m[25]<<8 | m[26]<<4 | m[27]) / (16*256);
  const L = (960 - (m[30]<<4 | m[31])) / (5*256);
  const S = (832 - (m[28]<<4 | m[29])) / (5*256);
  const rgb = hsl2rgb(H, S, L).map(x => Math.round(x*255));
  const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

  var options = {
    foreground: rgb,
    margin: 0.1,
    size: 420,
    format: 'png'
  };

  var data = new Identicon(hash, options).toString();

  var img = document.getElementById('image')

  img.src = 'data:image/png;base64,' + data;

}

window.onload = async function() {
  let uname_ctrl = document.getElementById('username');
  let uid_ctrl = document.getElementById('userid');

  if (location.hash.length > 1) {
    const username = location.hash.slice(1);
    const id = await getId(username);
    uname_ctrl.value = username;
    uid_ctrl.value = id;
    generate();
  }

  function clearUsername() {
     document.getElementById('username').value = '';
     document.getElementById('fetchBtn').disabled = true;
  }

  document.getElementById('randomize').onsubmit = async e => {
    e.preventDefault();
    clearUsername();
    uid_ctrl.value = Math.floor(Math.random() * 10000000);
    uid_ctrl.select();
    generate();
  }

  document.getElementById('fetch').onsubmit = async e => {
    e.preventDefault();
    try {
      let username = uname_ctrl.value.trim();
      location.hash = username;
      const id = await getId(username);
      uid_ctrl.value = id;
      uid_ctrl.select();
      generate();
    } catch(e) {
      alert(e.message);
    }
  };

  'input keyup keydown keypress change'.split(' ').forEach(function(e){
    uid_ctrl.addEventListener(e, onChange, false);
   });

  uid_ctrl.addEventListener('input', clearUsername);

  uname_ctrl.addEventListener('input', function() {
    document.getElementById('fetchBtn').disabled = uname_ctrl.value.length==0;
  })

  uid_ctrl.select();

  generate();

};

