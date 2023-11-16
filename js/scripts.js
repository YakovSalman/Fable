// Custom Scripts

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    // If we need pagination
    pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    bulletClass:'swiper_pagination_img',
    bulletActiveClass:'swiper_pagination_img-active',
    },

    // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
    el: '.swiper-scrollbar',
    },

});



const sizeLink = document.querySelectorAll('.size__link');

sizeLink.forEach(item => {
    item.addEventListener('click', (e) => {
        clearActiveClasses();
        e.preventDefault();

        item.classList.add('active');
    });
});

function clearActiveClasses() {
    sizeLink.forEach((item) => {
        item.classList.remove('active');
    });
}

function dropdown(linkDropdown, dropdown) {
    linkDropdown = document.querySelector(linkDropdown);
    dropdown = document.querySelector(dropdown);

    linkDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
    if(dropdown) {
        document.addEventListener('click', (e) => {
            if(!e.target.closest('.dropdown') &&
                e.target != linkDropdown) {
                dropdown.classList.remove('active');
            }
        })
    }
}
dropdown('.nav__link-dropdown', '.dropdown');
dropdown('.nav-mob-link-dropdown', '.dropdown-mob');


// select

const filter = document.querySelectorAll('.filter');
const triggerBtn = document.querySelector('.filter__select-current');
const selectList = document.querySelector('.filter__select-list');
const selectItem = document.querySelectorAll('.filter__select-item');
const selectArrow = document.querySelector('.filter__select-arrow');

filter.forEach(filter => {
    triggerBtn.addEventListener('click', (e) => {
        selectList.classList.toggle('active');
        selectArrow.classList.toggle('active');

        selectItem.forEach(item => {
            if(item.textContent === triggerBtn.textContent) {
                item.classList.add('inactive');
            } else {
                item.classList.remove('inactive');
            }
        })

    })

    selectItem.forEach(item => {
        item.addEventListener('click', (e) => {
            triggerBtn.textContent = item.textContent;
            selectList.classList.remove('active')
            selectArrow.classList.remove('active')

            sort()
        })

        document.addEventListener('click', (e) => {
            e.stopPropagation()
            if(!e.target.closest('.filter')) {
                selectList.classList.remove('active')
                selectArrow.classList.remove('active')
            }
        })
    })
})
const productWrap = document.querySelectorAll('.section__product');

productWrap.forEach(item => {
    const arrProducts = Array.from(item.children);

    arrProducts.forEach((product, i) => {
        product.dataset.id = i + 1;
    });
});

function sort() {
    const productWrap = document.querySelectorAll('.section__product');

    productWrap.forEach(item => {
        const products = [];
        const arrProducts = Array.from(item.children);

        arrProducts.forEach(item => {
            const product = {
                dataId:item.dataset.id,
                href:  item.getAttribute('href'),
                img:   item.querySelector('.section__img').getAttribute('src'),
                name:  item.querySelector('.section__name').textContent,
                price: item.querySelector('.section__price').textContent
            }
            products.push(product);
        })

        products.forEach(product => {
            product.price = product.price.replace(/\D/g, '');
        });

        if(triggerBtn.textContent === 'Price: Low to High') {
            products.sort((a, b) => a.price - b.price);
        }

        if(triggerBtn.textContent === 'Price: High to Low') {
            products.sort((a, b) => b.price - a.price);
        }

        if(triggerBtn.textContent === 'Featured') {
            products.sort((a, b) => a.dataId - b.dataId);
        }

        item.innerHTML = '';
        products.forEach(product => {
            item.innerHTML +=  `<a class="section__item"data-id="${product.dataId}" href="${product.href}">
                                    <img class="section__img section__img-product" src="${product.img}" alt="">
                                    <div class="section__name">${product.name}</div>
                                    <div class="section__price">€${product.price}</div>
                                </a> `
        });

    });
};





const tabsContentImg = document.querySelector('.tabs__content-item-img');
const body = document.querySelector('body');
const tab = document.querySelector('.tabs');
const cardFullImg = document.querySelector('.card__full-img')

if(tabsContentImg) {
    tabsContentImg.addEventListener('click', (e) => {

        const imgSrc = tabsContentImg.getAttribute('src')
        const fullImgHtml = `<div class="card__full-img">
                                <img src="${imgSrc}" alt="">
                                <i class="fa-solid fa-xmark card__full-img-cross"></i>
                            </div>
                            <div class="card__full-img-background"></div>`

        tab.insertAdjacentHTML('afterend', fullImgHtml)
        body.classList.add('locked')
    });
}


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('card__full-img-cross') ) {
        const fullImg = document.querySelector('.card__full-img');
        const tabsContentBackground = document.querySelector('.card__full-img-background');

        fullImg.remove();
        tabsContentBackground.remove();
        body.classList.remove('locked')
    }
})

const ordersRadio = document.querySelectorAll('.form-orders-radio');

ordersRadio.forEach(radioInputWrap => {
    const inputRadio = radioInputWrap.querySelectorAll('.form-orders-input-radio');
    const labelRadio = radioInputWrap.querySelectorAll('.form-orders-label-radio');

    inputRadio.forEach(input => {
        labelRadio.forEach(label => {

            input.addEventListener('change', () => {
                label.style.color="#080b13"
                if(input.checked) {
                    const ordersItem = input.closest('.form-orders-item')
                    ordersItem.querySelector('label').style.color="white"
                }

            })
        })
    })
})



// form

const formOrders = document.querySelectorAll('.form-orders')

formOrders.forEach(form => {

    const inputsOrders = form.querySelectorAll('.form-orders-input');
    const formCheckbox = form.querySelectorAll('.form-orders-checkbox');
    const formOrdersInputRadio = form.querySelectorAll('.form-orders-input-radio');

    const ordersRadioWrap = document.querySelectorAll('.form-orders-radio');
    const ordersRadioWrapColum = document.querySelectorAll('.form-orders-radio-colum');
    const ordersWrap = form.querySelectorAll('.form-orders-wrap');

    function isFormValid(inputs) {
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].value.trim() === '') {
            return false;
          }
        }
        return true;
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        inputsOrders.forEach(input => {
            if(input.value == '') {
                input.classList.add('inactive')
            } else {
                input.classList.remove('inactive')
            }

            if(input.classList.contains('form-orders-input-optional')) {
                input.classList.remove('inactive')

            }
        })

        ordersRadioWrap.forEach(inputWrap => {
            const inputs = inputWrap.querySelectorAll('input');
            const labels = inputWrap.querySelectorAll('label');

            function validateRadio() {
                let atLeastOneSelected = false;

                inputs.forEach(input => {
                    if (input.checked) {
                      atLeastOneSelected = true;
                    }
                  });

                if (!atLeastOneSelected) {
                  inputs.forEach(input => {
                    labels.forEach(label => {
                        input.classList.add('inactive')
                        label.classList.add('inactive')
                    })
                  });
                } else {
                    inputs.forEach(input => {
                        labels.forEach(label => {
                            input.classList.remove('inactive')
                            label.classList.remove('inactive')
                        })
                      });
                }
            }
            validateRadio()
        });

        function validateRadio2(inputsWrap) {
            let atLeastOneSelected = false;

            inputsWrap.forEach(input => {
                const inputRadio = input.querySelectorAll('.form-orders-input-radio');

                inputRadio.forEach(item => {
                    if (item.checked) {
                        atLeastOneSelected = true;
                      }
                });
            });

            if (!atLeastOneSelected) {
                return false;
            } else {
                return true;
            }
        }

        formCheckbox.forEach(checkbox => {
            if(!checkbox.checked) {
                const checkboxLabel = checkbox.closest('.form-orders-group-checkbox').querySelector('label');

                checkboxLabel.classList.add('inactive')
                checkbox.classList.add('inactive');
            }
        })

        formCheckbox.forEach(checkbox => {
            if(checkbox.checked) {
                if(isFormValid(inputsOrders) &&
                   validateRadio2(ordersRadioWrap) &&
                   validateRadio2(ordersRadioWrapColum)) {

                    ordersRadioWrap.forEach(inputWrap => {
                        const labelsRadio = inputWrap.querySelectorAll('label')

                        labelsRadio.forEach(label => {
                            label.style.color = '#080b13'
                        });
                    })

                    form.reset();

                    clearingOrders();
                }

            }

        })
    });

    ordersRadioWrap.forEach(inputWrap => {
        const inputs = inputWrap.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                if(input.checked) {
                    inputs.forEach(input => {
                        input.classList.remove('inactive')
                    })
                }
            });
        });
    });



    const testEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const testNoNumber = /^[^\d]*$/;
    const testNoSymbols = /[^!@#$%^&*()_]/;



    inputsOrders.forEach(input => {
        input.addEventListener('change', (e) => {

            if(input.name == 'city') {
                if(!testNoNumber.test(input.value) ||
                   !testNoSymbols.test(input.value)) {
                    const error = input.closest('.form-orders-group').querySelector('.form-orders-error');

                    input.classList.add('inactive');
                    error.classList.add('active');
                } else {
                    const error = input.closest('.form-orders-group').querySelector('.form-orders-error');

                    input.classList.remove('inactive');
                    error.classList.remove('active');
                }
            }

            if(input.name == 'address') {
                if(!testNoSymbols.test(input.value)) {
                    const error = input.closest('.form-orders-group').querySelector('.form-orders-error');

                    input.classList.add('inactive');
                    error.classList.add('active');
                } else {
                    const error = input.closest('.form-orders-group').querySelector('.form-orders-error');

                    input.classList.remove('inactive');
                    error.classList.remove('active');
                }
            }

            if(input.value == '') {
                const error = input.closest('.form-orders-group').querySelector('.form-orders-error');

                input.classList.remove('inactive');
                error.classList.remove('active');
            }
        });
    });

    ordersWrap.forEach(item => {
        const inputsWrap = item.querySelectorAll('input')

        inputsWrap.forEach(input => {
            input.addEventListener('change', () => {

                if(input.name == 'nameSurname') {
                    if(!testNoNumber.test(input.value)) {
                        input.placeholder = 'Enter correct Name and Surname'
                        input.value = ''
                        input.classList.add('inactive')
                    } else {
                        input.classList.remove('inactive')
                        input.placeholder = 'Enter name and surname'
                    }
                }

                if(input.name == 'email') {
                    if(!testEmail.test(input.value)) {
                        input.placeholder = 'Enter correct email';
                        input.value = ''
                        input.classList.add('inactive')
                    } else {
                        input.classList.remove('inactive')
                        input.placeholder = 'Enter email';
                    }
                };

                if(input.name == 'tel') {
                    if(!input.value == '') {
                        input.placeholder = 'Enter phone number';
                        input.classList.remove('inactive')
                    }
                }
            });
        });
    });

    formCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkboxLabel = checkbox.closest('.form-orders-group-checkbox').querySelector('label');

            if(checkbox.checked) {
                checkboxLabel.classList.remove('inactive')
                checkbox.classList.remove('inactive')
            }
        })
    })

    document.addEventListener("DOMContentLoaded", function () {
        const eventCalllback = function (e) {
            let el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
            if (clearVal !== 'false' && e.type === 'blur') {
                if (val.length < matrix.match(/([\_\d])/g).length) {
                    e.target.value = '';
                    return;
                }
            }
            if (def.length >= val.length) val = def;
            e.target.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
        }
        const phone_inputs = document.querySelectorAll('[data-phone-pattern]');
        for (let elem of phone_inputs) {
            for (let ev of ['input', 'blur', 'focus']) {
                elem.addEventListener(ev, eventCalllback);
            }
        }
    });
});


// Custom scripts
const tabsHeader = document.querySelectorAll('.tabs')

    function tabs(headerSelector, tabSelector, contentSelector, activeClass, display='flex') {
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector)
        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none'
            });
            tab.forEach(item => {
                item.classList.remove(activeClass)
            });
        }
        function showTabContent(i = 0) {
        content[i].style.display = display
        tab[i].classList.add(activeClass)
        }
        hideTabContent()
        showTabContent()
        header.addEventListener('click', e => {
            const target = e.target
            if (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
                tab.forEach((item, i) => {
                    if ( target == item || target.parentNode == item ) {
                        hideTabContent()
                        showTabContent(i)
                    }
                });
            }
        })
    }

    tabsHeader.forEach(item => {
        if(item) {
            tabs( '.tabs__header' ,'.tabs__header-item', '.tabs__content-item', 'active');
        }
    })




// card

const cardsEl = document.querySelectorAll('.card__inner');

const navItemOrder = document.querySelector('.nav__item-order span');
let numberOrder = 0;
let cards = [];
function countingGoods() {
    if(cards.length > 0) {
        let numberOrders = cards.length;
        numberOrder = numberOrders;

        navItemOrder.textContent = `(${numberOrders})`

        saveToLocalStorageNumberOrders()
    }

    if(cards.length == 0) {
        numberOrder = 0
        navItemOrder.textContent = ''
        saveToLocalStorageNumberOrders()
    }

}

cardsEl.forEach(card => {
    const cardBtn = card.querySelector('.card__btn');
    const cardSizeWrap = card.querySelector('.card__size');
    const cardColorWrap = card.querySelector('.card__color');
    const sizes = cardSizeWrap.querySelectorAll('input')
    const cardImgWrap = card.querySelector('.swiper');
    const cardSubtitle = document.querySelector('.card__subtitle');

    const cardColors = cardColorWrap.querySelectorAll('a')

    cardColors.forEach(color => {
        const colorHref = color.getAttribute('href').replace(/^\.+/g, '')
        console.log(window.location.pathname);
        if(window.location.pathname == colorHref) {
            color.classList.add('active')

            color.addEventListener('click', (e) => {
                e.preventDefault()
            });
        };
    });

    function validateSize(inputs) {
        let atLeastOneSelected = false;

        inputs.forEach(input => {
            if (input.checked) {
                atLeastOneSelected = true;
              }
        });

        if (!atLeastOneSelected) {
            return false;
        } else {
            return true;
        }
    }

    function sizesValue() {
        sizes.forEach(size => {
            size.addEventListener('change', () => {
                const sizeValue = size.value;
                return sizeValue;

            })
        })
    }



    sizesValue()
    cardBtn.addEventListener('click', (e) => {

        if(validateSize(sizes)) {

            const checkedRadio = document.querySelector('input[type="radio"]:checked');

            const sizeError = document.querySelector('.card__size-error');

            if(sizeError) {
                sizeError.remove()
            }

            let cardInfo = {
                collection: cardSubtitle.querySelector('span').textContent,
                article: 11,
                img: cardImgWrap.querySelector('.swiper-slide-active img').getAttribute('src'),
                name: document.querySelector('.card__title').textContent,
                price: document.querySelector('.card__price').textContent,
                priceNull: document.querySelector('.card__price').textContent,
                color: document.querySelector('.card__color-link.active').dataset.color,
                size: checkedRadio.value,
                quantity: 1
            };

            cards.forEach((card, i) => {
                if(cardInfo.size == card.size &&
                    cardInfo.name == card.name) {
                    cards.splice(i, 1);
                }
            })

            cards.push(cardInfo)

            saveToLocalStorage()

            if(localStorage.getItem('cards')) {
                cards = JSON.parse(localStorage.getItem('cards'))
            }
            countingGoods()
        } else {
            const errorHtml = `<div class="card__size-error">Choose the size</div>`
            cardSizeWrap.insertAdjacentHTML('beforeend', errorHtml);
        }
    });
});

if(localStorage.getItem('numberOrders')) {
    numberOrder = JSON.parse(localStorage.getItem('numberOrders'))
}
navItemOrder.textContent = `(${numberOrder})`;


function saveToLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function saveToLocalStorageNumberOrders() {
    localStorage.setItem('numberOrders', JSON.stringify(numberOrder));
}

if(localStorage.getItem('cards')) {
    cards = JSON.parse(localStorage.getItem('cards'))
}


const orders = document.querySelectorAll('.orders');

orders.forEach(order => {

    if(localStorage.getItem('cards')) {
        cards = JSON.parse(localStorage.getItem('cards'))
    }

    cards.forEach(card => {

        const ordersCardsInner = document.querySelector('.orders-cards-inner');

        const orderCardHtml = `<div class="orders-cards">
                                <img class="orders-cards-img" src="${card.img}" alt="">
                                <div class="orders-cards-info">
                                    <div class="orders-cards-name">${card.name}</div>
                                    <div class="orders-cards-item orders-cards-item-collection">
                                        Collection:<span>${card.collection}</span>
                                    </div>
                                    <div class="orders-cards-item orders-cards-item-article">
                                        Article:<span>${card.article}</span>
                                    </div>
                                    <div class="orders-cards-wrap orders-cards-wrap-feature">
                                        <div class="orders-cards-feature orders-cards-feature-size">
                                            Size:<span>${card.size}</span>
                                        </div>
                                        <div class="orders-cards-feature  orders-cards-feature-color">
                                            Color:<span>${card.color}</span>
                                        </div>
                                        <div class="orders-cards-feature orders-cards-feature-quantity">

                                            <div class="orders-cards-subtitle">Quantity:</div>
                                            <div class="orders-cards-counter">
                                                <button class="minus">-</button> <span>${card.quantity}</span> <button class="plus">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="orders-cards-wrap orders-cards-wrap-price">
                                        <div class="orders-cards-price">
                                            Price:<span>${card.price}</span>
                                        </div>
                                        <button class="orders-cards-price-btn">Delete</button>
                                    </div>
                                </div>
                            </div>`

        ordersCardsInner.insertAdjacentHTML('afterbegin', orderCardHtml);
    });

    countPrice()

});



const quantityProducts = document.querySelectorAll('.orders-cards-counter');

quantityProducts.forEach(quantityProduct => {
    const minus = quantityProduct.querySelector('.minus')
    const plus = quantityProduct.querySelector('.plus')
    const quantity = quantityProduct.querySelector('span');
    let quantityNum = parseInt(quantity.textContent)

    const ordersCards = quantityProduct.closest('.orders-cards')
    const ordersCardsPric = ordersCards.querySelector('.orders-cards-price span')

    const euroSymbol = '€';
    const priceProduct = parseInt(ordersCardsPric.textContent.replace(/\D/g, ''))

    const currentCard = quantity.closest('.orders-cards');
    const currentName = currentCard.querySelector('.orders-cards-name');
    const currentSize = currentCard.querySelector('.orders-cards-feature-size span');
    const currentColor = currentCard.querySelector('.orders-cards-feature-color span');

    quantityProduct.addEventListener('click', (e) => {
        if(e.target == plus) {
            let value = ++quantityNum;
            quantity.textContent = value;
        }

        if(e.target == minus) {
            if(quantityNum != 1) {
                let value = --quantityNum;
                quantity.textContent = value;
            }
        }
        cards.forEach(item => {
            if(
                currentName.textContent == item.name &&
                currentSize.textContent == item.size &&
                currentColor.textContent == item.color
                ) {
                    let sum =  parseInt(item.priceNull.replace(/\D/g, '')) * quantityNum;
                    ordersCardsPric.textContent = `${euroSymbol}${sum}`

                    item.quantity = quantity.textContent
                    item.price = `${euroSymbol}${sum}`

                    saveToLocalStorage()
                }
        })

        countPrice()
        countTotalPrice()
    });


});

const removeProduct = document.querySelectorAll('.orders-cards-price-btn')

removeProduct.forEach(remove => {
    remove.addEventListener('click', (e) => {
        const card = remove.closest('.orders-cards');
        const name = card.querySelector('.orders-cards-name').textContent
        const size = card.querySelector('.orders-cards-feature-size span').textContent
        const color = card.querySelector('.orders-cards-feature-color span').textContent
        const ordersItemSummary = document.querySelector('.orders-full-amount-item-summary .orders-full-price');
        const euroSymbol = '€';

        cards.forEach((item, i) => {
            if(
                name == item.name &&
                size == item.size &&
                color == item.color
            ) {
                cards.splice(i, 1);
                saveToLocalStorage()
            }
        })

        card.remove()
        countPrice()
        countingGoods()
        countTotalPrice()

        if(cards.length == 0) {
            ordersItemSummary.textContent = `${euroSymbol}0`;
        }
    })
})

function countPrice() {
    let price = 0
    const cardsPrice = document.querySelectorAll('.orders-cards-price span');
    const ordersFull = document.querySelector('.orders-full-amount-wrap')
    const euroSymbol = '€';

    cardsPrice.forEach(item => {
        price += parseInt(item.textContent.replace(/\D/g, ''))

        if(ordersFull) {
            const ordersItemSummary = ordersFull.querySelector('.orders-full-amount-item-summary .orders-full-price')
            ordersItemSummary.textContent = `${euroSymbol}${price}`
        }
    })
}


function countTotalPrice() {
    const ordersFullAmount = document.querySelector('.orders-full-amount');

    if (ordersFullAmount) {
        let sum = 0

        const euroSymbol = '€';

        const summary = document.querySelector('.orders-full-amount-item-summary .orders-full-price')
        const delivery = document.querySelector('.orders-full-amount-item-delivery .orders-full-price')
        const promocode = document.querySelector('.orders-full-amount-item-promo .orders-full-price')

        const total = document.querySelector('.orders-full-amount-total .orders-full-price')
        if(cards.length != 0) {
            delivery.textContent = '€30'
        } else {
            delivery.textContent = '€0'
        }

        if(parseInt(promocode.textContent.replace(/\D/g, '')) != 0) {
            const sumPromo = parseInt(summary.textContent.replace(/\D/g, '')) - parseInt(promocode.textContent.replace(/\D/g, ''))
            sum = sumPromo + parseInt(delivery.textContent.replace(/\D/g, ''))
        } else {
            sum = parseInt(summary.textContent.replace(/\D/g, '')) + parseInt(delivery.textContent.replace(/\D/g, ''))
        }

        if(cards.length == 0) {
            sum = 0
        }

        total.textContent = `${euroSymbol}${sum}`;
    }
}

countTotalPrice()

// =========== promocode ===========

const promocode = document.querySelectorAll('.orders-full-amount-promocode');
promocode.forEach(promo => {
    const promoInput = promo.querySelector('.orders-full-amount-promocode-input');
    const fullPromoPrice = document.querySelector('.orders-full-amount-item-promo .orders-full-price');
    const promp1 = '1f5kv7' //"€50"
    const promp2 = 'fby6kg' //"€100"
    const promp3 = '2bgk6h' //"€150"

    promo.addEventListener('submit', (e) => {
        e.preventDefault();

        if(promoInput.value == promp1) {
            fullPromoPrice.textContent = '€50';
        }
        if(promoInput.value == promp2) {
            fullPromoPrice.textContent = '€100';
        }
        if(promoInput.value == promp3) {
            fullPromoPrice.textContent = '€150';
        }

        if(
            promoInput.value == promp1 ||
            promoInput.value == promp2 ||
            promoInput.value == promp3
        ) {
            promoInput.style.border='1px solid #00ce37'

        } else {
            promoInput.style.border='1px solid #080B13'
            fullPromoPrice.textContent = '€0';
        }

        countTotalPrice()
    })
});

function clearingOrders() {
    localStorage.clear()

    const ordersInner = document.querySelector('.orders__inner');
    const ordersCards = document.querySelectorAll('.orders-cards')

    const header = document.querySelector('.header');
    const headerPosition = header.getBoundingClientRect().top;
    const offsetPosition = headerPosition - 50

    const fullSummary = document.querySelector('.orders-full-amount-item-summary .orders-full-price')
    const fullTotal = document.querySelector('.orders-full-amount-total .orders-full-price')
    const fullDelivery = document.querySelector('.orders-full-amount-item-delivery .orders-full-price')
    const fullPromo = document.querySelector('.orders-full-amount-item-promo .orders-full-price')

    const navItemOrder = document.querySelector('.nav__item-order span')

    const messageHtml = `<div class="orders-message">Your order has been received, you will be contacted soon</div>`

    window.scrollBy ({
      top: headerPosition,
      behavior: "smooth",
    });


    ordersCards.forEach(card => {
        card.remove()
    })

    fullSummary.textContent = '€0'
    fullTotal.textContent = '€0'
    fullDelivery.textContent = '€0'
    fullPromo.textContent = '€0'
    navItemOrder.textContent = ''

    ordersInner.insertAdjacentHTML('afterbegin', messageHtml);
}


// Custom scripts


    // function tabs(headerSelector, tabSelector, contentSelector, activeClass, display='flex') {
    //     const header = document.querySelector(headerSelector),
    //         tab = document.querySelectorAll(tabSelector),
    //         content = document.querySelectorAll(contentSelector)
    //     function hideTabContent() {
    //         content.forEach(item => {
    //             item.style.display = 'none'
    //         });
    //         tab.forEach(item => {
    //             item.classList.remove(activeClass)
    //         });
    //     }
    //     function showTabContent(i = 0) {
    //     content[i].style.display = display
    //     tab[i].classList.add(activeClass)
    //     }
    //     hideTabContent()
    //     showTabContent()
    //     header.addEventListener('click', e => {
    //         const target = e.target
    //         if (target.classList.contains(tabSelector.replace(/\./, '')) ||
    //         target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
    //             tab.forEach((item, i) => {
    //                 if ( target == item || target.parentNode == item ) {
    //                     hideTabContent()
    //                     showTabContent(i)
    //                 }
    //             });
    //         }
    //     })
    // }

    // ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
    // ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
    // ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
    // ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
    // tabs( '.tabs__header' ,'.tabs__header-item', '.tabs__content-item', 'active');



