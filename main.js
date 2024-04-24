(()=>{"use strict";var e=["image/webp","image/jpeg","image/gif","image/jpg"],t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697","Content-Type":"application/json"}},n=document.querySelectorAll(".popup"),r=document.querySelector(".popup_type_question"),o=r.querySelector(".popup__button"),c=r.querySelector(".popup__title"),a=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)},i=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)},u=function(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))},s=function(e){var n;(n={buttonText:"Ок",titleText:"Вы уверены?",data:e.target.closest(".card").getAttribute("id")},new Promise((function(e){c.textContent=n.titleText,o.textContent=n.buttonText,r.setAttribute("data",n.data),o.addEventListener("click",(function(){e(),a(r)})),i(r)}))).then((function(){var n;(n=e.target.closest(".card").getAttribute("id"),fetch("".concat(t.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))).then((function(){e.target.closest(".card").remove()})).catch((function(e){return console.error("Ошибка: ".concat(e))}))})).catch((function(e){return console.error("Ошибка: ".concat(e))}))},l=function(e){var n=e.target,r=n.closest(".card"),o=r.getAttribute("id"),c=r.querySelector(".card__like-counter");r.getAttribute("liked")?function(e){return fetch("".concat(t.baseUrl,"//cards/likes/").concat(e),{method:"DELETE",headers:{authorization:"a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}(o).then((function(e){r.removeAttribute("liked"),n.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка: ".concat(e))})):function(e){return fetch("".concat(t.baseUrl,"//cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))}(o).then((function(e){r.setAttribute("liked",!0),n.classList.add("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка: ".concat(e))}))};function d(e,t,n,r){var o=e.querySelector(".card").cloneNode(!0);return o.setAttribute("id",t._id),o.querySelector(".card__image").src=t.link,o.querySelector(".card__image").setAttribute("alt",t.name),o.querySelector(".card__image").addEventListener("click",r),o.querySelector(".card__title").textContent=t.name,t.owner._id===n?o.querySelector(".card__delete-button").addEventListener("click",s):o.querySelector(".card__delete-button").classList.add("hidden"),o.querySelector(".card__like-button").addEventListener("click",l),o.querySelector(".card__like-counter").textContent=t.likes.length,t.likes.some((function(e){return e._id===n}))?(o.setAttribute("liked",!0),o.querySelector(".card__like-button").classList.add("card__like-button_is-active")):o.removeAttribute("liked"),o}var p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__error_visible",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"popup__input_type_error",o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),o.classList.remove(n),o.textContent=""},_=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__button_disabled";!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n):t.classList.add(n)},f=function(e,t){var n=e.querySelector(t.submitButtonSelector),r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(n){n.setCustomValidity(""),n.value="",p(e,n,t.errorClass,t.inputErrorClass)})),n.classList.remove(t.inactiveButtonClass),_(r,n,t.inactiveButtonClass)},m="",v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector("#card-template").content,h=document.querySelector(".places__list"),b=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),q=document.querySelector(".profile__edit-button"),g=document.querySelector(".profile__image-avatar"),k=document.querySelector(".popup__form[name='editProfileAvatar']"),C=document.querySelector(".profile__image-avatar-button"),L=k.querySelector(".popup__input_type_avatar"),E=document.querySelector(".popup_type_edit_avatar"),A=document.querySelector(".popup_type_edit"),x=document.querySelector(".popup__form[name='editProfile']"),j=x.querySelector(".popup__input_type_name"),P=x.querySelector(".popup__input_type_description"),T=document.querySelector(".profile__add-button"),w=document.querySelector(".popup_type_new-card"),U=document.querySelector(".popup__form[name='new-place']"),B=U.querySelector(".popup__input[name='place-name']"),D=U.querySelector(".popup__input[name='link']"),N=document.querySelector(".popup_type_image"),O=N.querySelector(".popup__image"),H=N.querySelector(".popup__caption"),J=function(e){O.src=e.target.getAttribute("src"),O.alt=e.target.getAttribute("alt"),O.title=e.target.getAttribute("alt"),H.textContent=e.target.getAttribute("alt"),i(N)};T.addEventListener("click",(function(){f(U,v),i(w)})),U.addEventListener("submit",(function(e){var n,r;e.preventDefault(),U.querySelector(".button").textContent="Сохранение...",(n=B.value,r=D.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))).then((function(e){h.prepend(d(y,e,m,J))})).catch((function(e){console.error("Ошибка: ".concat(e)),h.append(d(y,{_id:e,link:e,name:e,owner:{_id:m},likes:[]},m,J)).finally((function(){f(U,v),U.querySelector(".button").textContent="Сохранить"}))})),a(w),e.target.reset()}));var M=function(e){b.textContent=e.name,S.textContent=e.about,g.src=e.avatar};q.addEventListener("click",(function(){j.value=b.textContent,P.value=S.textContent,i(A)})),x.addEventListener("submit",(function(e){var n,r;e.preventDefault(),x.querySelector(".button").textContent="Сохранение...",(n=j.value,r=P.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))).then((function(e){return M(e)})).catch((function(e){return M({name:"Ошибка: ".concat(e),about:"Ошибка: ".concat(e)})})).finally((function(){x.querySelector(".button").textContent="Сохранить",a(A)}))}));C.addEventListener("click",(function(){f(k,v),i(E)})),k.addEventListener("submit",(function(n){var r;n.preventDefault(),k.querySelector(".button").textContent="Сохранение...",(r=L.value,fetch(r,{method:"HEAD"}).then((function(t){var n=t.headers.get("Content-Type");return alert(n),e.some((function(e){return e===n}))&&t.ok?t.url:Promise.reject(n)}))).then((function(e){var n;(n=e,fetch("".concat(t.baseUrl,"/users/me/avatar "),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)}))).then((function(e){return t=e.avatar,void(g.src=t);var t})).catch((function(e){return console.error("Ошибка: ".concat(e))})).finally((function(){f(k,v),a(E)}))})).catch((function(e){console.log("Неподходящий тип : ".concat(e)),f(k,v)})),k.querySelector(".button").textContent="Сохранить"})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()}));var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);_(n,r,e.inactiveButtonClass),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n,r):function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"popup__error_visible",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"popup__input_type_error",c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,r)}(t,o,e.errorClass,e.inputErrorClass),_(n,r,e.inactiveButtonClass)}))}))}))}(v),n.forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(){a(e)})),e.addEventListener("click",(function(t){t.target.classList.contains("popup_is-opened")&&a(e)}))})),fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then((function(e){M(e),m=e._id})).catch((function(e){return M({name:"Ошибка: ".concat(e),about:"Ошибка: ".concat(e),avatar:"./images/avatar.jpg"})})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then((function(e){e.forEach((function(e){h.append(d(y,e,m,J))}))})).catch((function(e){console.error("Ошибка: ".concat(e)),h.append(d(y,{_id:e,link:e,name:e,owner:{_id:m},likes:[]},m,J))}))})();