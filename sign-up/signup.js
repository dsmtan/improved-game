"use strict";

let emails = [];
window.addEventListener("DOMContentLoaded", get);

function get() {
  fetch("https://todolist-f488.restdb.io/rest/dantoto", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cf44798102f585b7c85374a",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(showUsers);
    });
}

function post(newUser) {
  fetch("https://todolist-f488.restdb.io/rest/dantoto", {
    method: "post",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5cf44798102f585b7c85374a",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      showUsers(data);
    });
}

function showUsers(singleUser) {
  const template = document.querySelector("#userList").content;
  const clone = template.cloneNode(true);
  clone.querySelector("#name").textContent = singleUser.name;
  clone.querySelector("#surname").textContent = singleUser.surname;
  clone.querySelector("#gender").textContent = singleUser.gender;
  clone.querySelector("#email").textContent = singleUser.email;
  emails.push(singleUser.email);
  clone.querySelector("#password").textContent = singleUser.password;
  clone.querySelector("#address").textContent = singleUser.address;
  clone.querySelector("#zip").textContent = singleUser.zip;
  clone.querySelector("#city").textContent = singleUser.city;
  clone.querySelector("#birth").textContent = singleUser.birth;
  document.querySelector("main").appendChild(clone);
  console.log(singleUser);
}

const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  console.log("submited");

  const user = {
    name: form.elements.name.value,
    surname: form.elements.surname.value,
    gender: form.elements.gender.value,
    email: form.elements.email.value,
    password: form.elements.password.value,
    address: form.elements.address.value,
    zip: form.elements.zip.value,
    city: form.elements.city.value,
    birth: form.elements.birth.value
  };
  console.log(user);
  checkemail();
  post(user);
});

function checkemail() {
  if (emails.includes(form.elements.email.value)) {
    window.alert("user already");
  } else {
    post();
  }
}

document.querySelector(".next").addEventListener("click", nextform);

function nextform() {
  document.querySelector(".signup1").style.display = "none";
  document.querySelector(".signup2").style.display = "block";
}

document.querySelector("#arrow").addEventListener("click", goback);

function goback() {
  document.querySelector(".signup2").style.display = "none";
  document.querySelector(".signup1").style.display = "block";
}

//validaton of password inspired by  https://www.w3schools.com/howto/howto_js_password_validation.asp

const number = document.getElementById("number");
const length = document.getElementById("length");
const myInput = document.getElementById("psw");

myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
  psw.classList.add(".marg");
};

myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};
