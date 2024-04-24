(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697","Content-Type":"application/json"}},t=document.querySelectorAll(".popup"),n=document.querySelector(".popup_type_question"),r=n.querySelector(".popup__button"),o=n.querySelector(".popup__title"),c=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)},a=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)},i=function(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))},u=function(t){var i;(i={buttonText:"Ок",titleText:"Вы уверены?",data:t.target.closest(".card").getAttribute("id")},new Promise((function(e){o.textContent=i.titleText,r.textContent=i.buttonText,n.setAttribute("data",i.data),r.addEventListener("click",(function(){e(),c(n)})),a(n)}))).then((function(){var n;(n=t.target.closest(".card").getAttribute("id"),fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){t.target.closest(".card").remove()})).catch((function(e){return console.error("Ошибка: ".concat(e))}))})).catch((function(e){return console.error("Ошибка: ".concat(e))}))},s=function(t){var n=t.target,r=n.closest(".card"),o=r.getAttribute("id"),c=r.querySelector(".card__like-counter");r.getAttribute("liked")?function(t){return fetch("".concat(e.baseUrl,"//cards/likes/").concat(t),{method:"DELETE",headers:{authorization:"a1b07ad8-68b9-4aea-9bd1-7f4f85e9a697","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o).then((function(e){r.removeAttribute("liked"),n.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка: ".concat(e))})):function(t){return fetch("".concat(e.baseUrl,"//cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o).then((function(e){r.setAttribute("liked",!0),n.classList.add("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.error("Ошибка: ".concat(e))}))};function l(e,t,n,r){var o=e.querySelector(".card").cloneNode(!0);return o.setAttribute("id",t._id),o.querySelector(".card__image").src=t.link,o.querySelector(".card__image").setAttribute("alt",t.name),o.querySelector(".card__image").addEventListener("click",r),o.querySelector(".card__title").textContent=t.name,t.owner._id===n?o.querySelector(".card__delete-button").addEventListener("click",u):o.querySelector(".card__delete-button").classList.add("hidden"),o.querySelector(".card__like-button").addEventListener("click",s),o.querySelector(".card__like-counter").textContent=t.likes.length,t.likes.some((function(e){return e._id===n}))?(o.setAttribute("liked",!0),o.querySelector(".card__like-button").classList.add("card__like-button_is-active")):o.removeAttribute("liked"),o}var d=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__error_visible",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"popup__input_type_error",o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),o.classList.remove(n),o.textContent=""},p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"popup__button_disabled";!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n):t.classList.add(n)},_=function(e,t){var n=e.querySelector(t.submitButtonSelector),r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(n){n.setCustomValidity(""),n.value="",d(e,n,t.errorClass,t.inputErrorClass)})),n.classList.remove(t.inactiveButtonClass),p(r,n,t.inactiveButtonClass)},f="",m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},v=document.querySelector("#card-template").content,y=document.querySelector(".places__list"),h=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__image-avatar"),k=document.querySelector(".popup__form[name='editProfileAvatar']"),g=document.querySelector(".profile__image-avatar-button"),L=k.querySelector(".popup__input_type_avatar"),C=document.querySelector(".popup_type_edit_avatar"),E=document.querySelector(".popup_type_edit"),A=document.querySelector(".popup__form[name='editProfile']"),j=A.querySelector(".popup__input_type_name"),x=A.querySelector(".popup__input_type_description"),P=document.querySelector(".profile__add-button"),T=document.querySelector(".popup_type_new-card"),U=document.querySelector(".popup__form[name='new-place']"),w=U.querySelector(".popup__input[name='place-name']"),B=U.querySelector(".popup__input[name='link']"),D=document.querySelector(".popup_type_image"),N=D.querySelector(".popup__image"),O=D.querySelector(".popup__caption"),J=function(e){N.src=e.target.getAttribute("src"),N.alt=e.target.getAttribute("alt"),N.title=e.target.getAttribute("alt"),O.textContent=e.target.getAttribute("alt"),a(D)};P.addEventListener("click",(function(){_(U,m),a(T)})),U.addEventListener("submit",(function(t){var n,r;t.preventDefault(),(n=w.value,r=B.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){y.prepend(l(v,e,f,J))})).catch((function(e){console.error("Ошибка: ".concat(e)),y.append(l(v,{_id:e,link:e,name:e,owner:{_id:f},likes:[]},f,J)).finally((function(){return _(U,m)}))})),c(T),t.target.reset()}));var M=function(e){h.textContent=e.name,b.textContent=e.about,q.src=e.avatar};S.addEventListener("click",(function(){j.value=h.textContent,x.value=b.textContent,_(A,m),a(E)})),A.addEventListener("submit",(function(t){var n,r;t.preventDefault(),(n=j.value,r=x.value,void fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){return M(e)})).catch((function(e){return M({name:"Ошибка: ".concat(e),about:"Ошибка: ".concat(e),avatar:"./images/avatar.jpg"})})),c(E)}));g.addEventListener("click",(function(){_(k,m),a(C)})),k.addEventListener("submit",(function(t){var n;t.preventDefault(),(n=L.value,fetch("".concat(e.baseUrl,"/users/me/avatar "),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){return function(e){q.src=e.avatar}(e)})).catch((function(e){console.error(e)})).finally((function(){_(k,m),c(C)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()}));var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);p(n,r,e.inactiveButtonClass),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n,r):function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"popup__error_visible",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"popup__input_type_error",c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,r)}(t,o,e.errorClass,e.inputErrorClass),p(n,r,e.inactiveButtonClass)}))}))}))}(m),t.forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(){c(e)})),e.addEventListener("click",(function(t){t.target.classList.contains("popup_is-opened")&&c(e)}))})),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){M(e),f=e._id})).catch((function(e){return M({name:"Ошибка: ".concat(e),about:"Ошибка: ".concat(e),avatar:"./images/avatar.jpg"})})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){y.append(l(v,e,f,J))}))})).catch((function(e){console.error("Ошибка: ".concat(e)),y.append(l(v,{_id:e,link:e,name:e,owner:{_id:f},likes:[]},f,J))}))})();