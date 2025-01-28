'use strict'

const title = document.getElementsByTagName('h1');
console.log(title[0])

const btn = document.getElementsByClassName('handler_btn');
console.log(btn)

const plus = document.querySelector('.screen-btn');
console.log(plus)

const otherItems1 = document.querySelectorAll('.other-items + .percent');
console.log(otherItems1)
const otherItems2 = document.querySelectorAll('.other-items + .number');
console.log(otherItems2)

const range = document.querySelector('.rollback > div > [type="range"]')
console.log(range)
const rangeValue = document.querySelector('.rollback > div > .range-value')
console.log(rangeValue)

const totalInput = document.getElementsByClassName('total-input');
for (let element of totalInput) {
	console.log(element)
}

let screen = document.querySelectorAll('.screen');
console.log(screen)



const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	rollback: 50,
	adaptive: true,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},
	start: function () {
		appData.asking()
		appData.addPrices()
		appData.getFullPrice()
		appData.getServicePercentPrices()
		appData.getTitle()

		appData.logger()
	},
	isNymber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num)
	},
	
	asking: function() {
		appData.title = prompt ("Как называется ваш проект?", "Калькулятор верстки");
			
		for (let i = 0; i < 2; i++) {
			let name = prompt ("Какие типы экранов нужно разработать?");
			let price = 0

			do  {
				price= prompt ("Сколько будет стоить данная работа?");
			} while (!appData.isNymber(price))

			appData.screens.push({id: i, name: name, price: price})
		}
	
		for (let i = 0; i < 2; i++) {
			let name = prompt ("Какой дополнительный тип услуги нужен?");
			let price = 0

			do {
				price = prompt ("Сколько это будет стоить");
			} while (!appData.isNymber(price))

			appData.services[name] = +price
		
		}	

		appData.adaptive = confirm ("Нужен ли адаптив на сайте?");
	},
	addPrices: function() {
		for (let screen of appData.screens) {
			appData.screenPrice += +screen.price
		}

		for(let key in appData.services) {
			appData.allServicePrices += appData.services[key]
		}
	},

	getFullPrice: function() {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},
	getTitle: function() {
		appData.title = appData.title.trim().toUpperCase()[0] + appData.title.trim().slice(1).toLowerCase();
	},
	getServicePercentPrices: function() {
		appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)));
	},
	getRollBackMassage: function () {
		if (fullPrice >= 30000) {
			return "Даем скидку в 10%";
		} else if (fullPrice >= 15000 && fullPrice < 30000) {
			return "Даем скидку в 5%";
		} else if (fullPrice < 15000 && fullPrice >= 0) {
			return "Скидка не предусмотрена";
		} else {
			return "Что-то пошло не так";
		}
	},
	logger: function () {
		// for (let key in appData)
		// 	console.log(appData[key])
		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log(appData.screens);
	}
}

// appData.start()