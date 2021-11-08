import Toastify from "toastify-js";

export default {
  baseModal(title, msg) {
    if (msg === undefined) {
      msg = "";
    }
    const strHtml =
      '<div id="notification-with-actions-content" class="toastify-content  flex">\
            <HardDriveIcon />\
            <div class="ml-4 mr-4">\
                <div class="font-medium">' +
      title +
      '</div>\
                <div class="text-gray-600 mt-1"> ' +
      msg +
      "\
                </div>\
            </div>\
        </div>";

    var wrapper = document.createElement("div");
    wrapper.innerHTML = strHtml;
    var modal = wrapper.firstChild;
    return modal;
  },
  success(title, msg) {
    var modal = this.baseModal(title, msg);
    Toastify({
      node: modal,
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  },
  error(title, msg) {
    var modal = this.baseModal(title, msg);
    Toastify({
      node: modal,
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  },
};
