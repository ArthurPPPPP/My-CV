import "./styles.css";
import { Message } from "./messages";
import { isValid } from "./utils";

const form = document.getElementById("form");
const name = form.querySelector("#name");
const email = form.querySelector("#email");
const messages = form.querySelector("#message");

const modalBtn = document.getElementById("modal-btn");

modalBtn.addEventListener("click", openModal);
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  if (isValid(messages.value)) {
    const messageObject = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: messages.value.trim(),
      date: new Date().toJSON(),
    };

    //Async request to server to save message.
    Message.create(messageObject).then(() => {
      email.value = "";
      messages.value = "";
      name.value = "";
    });
  }
}

function createModal(title, content) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <form class="mui-form" id="modal-form">
          <div class="mui-textfield mui-textfield--float-label">
            <input type="text" id="modal-name" />
            <label for="modal-name">Name</label>
          </div>
          <div class="mui-textfield mui-textfield--float-label">
            <input
              type="text"
              id="modal-email"
              required
              minlength="1"
              maxlength="20"
            />
            <label for="modal-email">Email</label>
          </div>
          <div class="mui-textfield mui-textfield--float-label">
              <textarea
                required
                minlength="10"
                maxlength="1000"
                id="modal-message"
              ></textarea>
              <label for="modal-message">Message</label>
            </div>
          <button type="submit" class="mui-btn mui-btn--raised" id="submit-btn">
            Submit
          </button>
        </form>`;
  mui.overlay("on", modal);
}

function openModal() {
  createModal();
  document
    .getElementById("modal-form")
    .addEventListener("submit", modalFormMessage);

  //createModal("авторизация", getContactModal());
}

function modalFormMessage(event) {
  event.preventDefault();
  const mform = document.getElementById("modal-form");
  const mname = mform.querySelector("#modal-name");
  const memail = mform.querySelector("#modal-email");
  const mmessage = mform.querySelector("#modal-message");

  if (isValid(mmessage.value)) {
    const mmessageObject = {
      name: mname.value.trim(),
      email: memail.value.trim(),
      message: mmessage.value.trim(),
      date: new Date().toJSON(),
    };

    //Async request to server to save message.

    Message.create(mmessageObject).then(() => {
      memail.value = "";
      mmessage.value = "";
      mname.value = "";
    });
    console.log(mmessageObject.value);
  }
}
