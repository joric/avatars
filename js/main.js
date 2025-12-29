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

  document.getElementById('hash').textContent = hash;

  //console.log(hash, hsl2rgb);

  const m = hash.split('').map(c => parseInt(c,16));
  const H = (m[25]<<8 | m[26]<<4 | m[27]) / (16*256);
  const L = (960 - (m[30]<<4 | m[31])) / (5*256);
  const S = (832 - (m[28]<<4 | m[29])) / (5*256);
  const rgb = hsl2rgb(H, S, L).map(x => Math.round(x*255));
  const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

  var options = {
    foreground: rgb,
    margin: 0.0788,
    size: 420,
    format: 'png'
  };

  var data = new Identicon(hash, options).toString();

  var img = document.getElementById('image')

  img.src = 'data:image/png;base64,' + data;

}

async function loadUserAndGenerate(username) {
  let uname_ctrl = document.getElementById('username');
  let uid_ctrl = document.getElementById('userid');
  try {
    const id = await getId(username);
    uname_ctrl.value = username;
    uid_ctrl.value = id;
    generate();
    document.getElementById('link').style.visibility = 'visible';
    document.getElementById('link').href=`https://github.com/${username}/`;
  } catch (e) {
    alert(e.message);
  }
}

window.onload = function() {

  let uname_ctrl = document.getElementById('username');
  let uid_ctrl = document.getElementById('userid');
  let select_ctrl = document.getElementById('select');

  select_ctrl.onchange = (e)=> {
    let username = e.target.options[e.target.selectedIndex].text;
    let id = e.target.value;
    if (username) {
      uname_ctrl.value = username;
      location.hash = username;
      uid_ctrl.value = id;
      uid_ctrl.select();
      document.getElementById('fetchBtn').disabled = true;
      generate();
      document.getElementById('link').style.visibility = 'visible';
      document.getElementById('link').href=`https://github.com/${username}/`;
    } else {
      resetUsername();
    }
  }

  function resetUsername() {
    document.getElementById('username').value = '';
    document.getElementById('fetchBtn').disabled = true;
    location.hash = '';
    document.getElementById('select').selectedIndex = 0;
    document.getElementById('link').style.visibility = 'hidden';
  }

  document.getElementById('randomize').onsubmit = async e => {
    e.preventDefault();
    resetUsername();
    uid_ctrl.value = Math.floor(Math.random() * 10000000);
    uid_ctrl.select();
    generate();
  }

  document.getElementById('fetch').onsubmit = async e => {
    e.preventDefault();
    try {
      document.getElementById('fetchBtn').disabled = true;
      let username = uname_ctrl.value.trim();
      location.hash = username;
      const id = await getId(username);
      uid_ctrl.value = id;
      uid_ctrl.select();
      generate();
      document.getElementById('link').style.visibility = 'visible';
      document.getElementById('link').href=`https://github.com/${username}/`;
    } catch(e) {
      alert(e.message);
    }
  };

  'input keyup keydown keypress change'.split(' ').forEach(function(e){
    uid_ctrl.addEventListener(e, onChange, false);
  });

  uid_ctrl.addEventListener('input', resetUsername);

  uname_ctrl.addEventListener('input', function() {
    document.getElementById('fetchBtn').disabled = uname_ctrl.value.length==0;
    document.getElementById('select').selectedIndex = 0;
    document.getElementById('link').style.visibility = 'hidden';
  })

  uid_ctrl.select();

  if (location.hash.length > 1) {
    const str = location.hash.slice(1);
    if (/^\d+$/.test(str)) {
      resetUsername();
      document.getElementById('userid').value = str;
      generate()
    } else {
      loadUserAndGenerate(str);
    }
  } else {
    generate();
  }

};

