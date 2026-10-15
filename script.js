document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
const form = document.querySelector('#booking-form');
const service = document.querySelector('#service');
const master = document.querySelector('#master');
const result = document.querySelector('#result');
const reset = document.querySelector('#reset');
function clearResult() { result.hidden = true; result.replaceChildren(); reset.hidden = true; }
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { service.value = link.dataset.service; clearResult(); }));
document.querySelectorAll('[data-master]').forEach(button => button.addEventListener('click', () => { master.value = button.dataset.master; clearResult(); document.querySelector('#booking').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); service.focus({ preventScroll: true }); }));
form.addEventListener('change', clearResult);
form.addEventListener('submit', event => { event.preventDefault(); if (!form.reportValidity()) return; const selection = document.createElement('strong'); selection.textContent = `${service.selectedOptions[0].textContent} · ${master.value}`; const message = document.createElement('p'); message.textContent = 'Это демонстрация. Запись не создана, данные никуда не отправлены'; result.replaceChildren(selection, message); result.hidden = false; reset.hidden = false; });
form.addEventListener('reset', () => { clearResult(); service.focus(); });
