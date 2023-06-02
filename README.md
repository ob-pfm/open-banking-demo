
# Project Name: pfm-brazil-demo

  

![Language](https://img.shields.io/badge/Language-React-blue.svg)

  

## Table of contents

  

- [Introduction](#introduction)

- [Project Setup](#project-setup)

- [Scripts](#scripts)

- [Usage](#usage) 

- [Open Banking SDK](#open-banking-sdk)

- [Open Banking Web Components](#open-banking-web-components)

  

## Introduction

  

**pfm-brazil-demo** is a React web app for personal financial management. It ilustrates the use and the way to integrate the Open Banking SDK and Open Banking Web Components in a web application.

  

The [Open Banking SDK](#open-banking-sdk) is used to consume the API in an easier way and its responses are passed to the [Open Banking Web Components](#open-banking-web-components) to show the data and interact with them.

  

For example:

The [Transactions Component](#transactions-component) uses three data models as input **transactionsData**, **accountsData**  and **categoriesData**

  

```html

<ob-transactions-component  
	transactionsData 
	accountsData 
	categoriesData
></ob-transactions-component>

```

If the data input is not provided then the web component won't show any data so you have to use the  [Open Banking SDK](#open-banking-sdk) methods to provide the data needed.

In the previous example to get the data needed you have to use the next methods from the sdk:

- [Transactions List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-transactions)
- [Accounts List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-accounts)
- [Categories List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-categories-with-subcategories)

So in the demo to set the Categories data the implementation is the next:


```javascript
...
import { CategoriesClient} from  'open-banking-pfm-sdk';
...
const  categoryServices = useMemo(() =>  new  CategoriesClient(apiKey, URL_SERVER), [apiKey]);
...
useEffect(() => {
	if (userId) {
		categoryServices
		.getListWithSubcategories(userId)
		.then((response) => {
			componentRef.current.categoriesData = response;
		})
		.catch((error) => {
			showErrorToast(error);
		});
	}
}, [categoryServices, userId]);
...

```

```html
...

return(
	<ob-transactions-component
		ref={componentRef}  // Reference to the component for later use
		lang="pt"  // Language for the component, e.g. Portuguese
		currencyLang="pt-BR"  // Language for currency formatting, e.g. Brazilian Portuguese
		currencyType="BRL"  // Currency type, e.g. Brazilian Real
	/>
);
...

```


## Project Setup

  

1. Clone the repository from the project's repository.

  

```console
git clone https://github.com/Finerio-Connect/pfm-brazil-demo.git
```

  

2. Navigate to the project directory using the terminal.

  

```console
cd pfm-brazil-demo
```

  

3. Run npm install to install the project dependencies.

  

```console
npm install
```

  

4. Create the environment files *.env.development* and *.env.test* in the project root directory setting the API URL where you will be pointing to the Test or Dev environment. 

```console
REACT_APP_API_URL="https://pfmapiserver.com/api/v1/"
```
  

5. Run the app using the react-scripts command or use one of the start commands showed in the [scripts section](#scripts) 

  

## Scripts

  

```console
start:dev
```

  

> Runs the app in development mode with environment variables from .env.development file.

  

```console
start:qa
```

  

> Runs the app in QA mode with environment variables from .env.test file.

  

```console
build:dev
```

  

> Builds the app for development with environment variables from .env.development file.

  

```console
build:qa
```

  

> Builds the app for qa with environment variables from .env.test file.

  

```console
start:qa
```

  

> Runs the app in QA mode with environment variables from .env.test file.

## Usage

Once you have runned the demo, it will appear the next form:

![demoStep1](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/72d5bc68-7cd8-4efb-a530-8d3cdfc37b78)

Please fill the fields and submit it.

Then the onboarding form will be displayed, here you have to enter a valid CPF and submit it.

![Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/6e984c57-11e5-4ae8-ba47-9b81410acc9a)

The user was created.

![1Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/c2c2b2d2-cdd6-448a-9708-4d668ac70175)

You can now create a consent and do the bank aggregation process. To do it click on the PLUS icon, select the bank and period of time that the consent will be granted.

![2Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/42d508f9-cb7b-4c7f-b66c-9f3908effc97)

![4Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/72233757-3029-44bb-a6cf-71def50f9758)

This will open a new window where you have to enter the bank credentials.

![5Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/4a8a4d80-fc25-4860-ab6d-36245c9edcda)

If the credentials were correct then the consent was granted, the resources will be showed and aggregation process will run in background.

![6Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/a32c29b8-66d3-433a-997e-764d3a2541e3)

You now will see the consent in the consents tab and its status.

![7Captura](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/7cef6479-ba87-40b6-bbc7-0f164c0769e2)

You have to wait the aggregation process to be completed to see the data in the PFM [Open Banking Web Components](#open-banking-web-components).

## Open Banking SDK

[Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk)

The Open Banking PFM SDK uses Client classes and with **Promises** to get responses from the Open Banking PFM API in an easier way and structured as data models.


```console
 npm i open-banking-pfm-sdk
```

## Table of contents

- [Users Client](#users-client)
- [Banks Client](#banks-client)
- [Categories Client](#categories-client)
- [Accounts Client](#accounts-client)
- [Transactions Client](#transactions-client)
- [Budgets Client](#budgets-client)
- [Bank Aggregation Client](#bank-aggregation-client)
- [Consents Client](#consents-client)
- [Credits Client](#credits-client)
- [Insights Client](#insights-client)
- [Helpers](#helpers)
- [Error Codes](#error-codes)


# Users Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client contains the available actions related to users.
In order to successfully integrate the following functions, it is important to previously load the users explained in the installation guide.
  

## Setup

  

```javascript

import { UsersClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const usersClient = new UsersClient({ apiKey, serverUrl });
```

  

## How to use

  

### Get User

  

Given a valid user ID, fetches the information of an user.

  

```javascript
usersClient
	.get(userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
UserDetail {
	id: 2230303,
	cpf: '27767376109'
	dateCreated: '1646243107260',
}
```

<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>
  

### Get Financial Entities

  

Fetches the information of the user's financial entities.

  

```javascript
usersClient
	.getFinancialEntities()
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```


Output:


```console
[
	{
		"id": 291340104,
		"name": "Cash",
		"code": "1234",
		"imagePath": "https://cdn.finerio.mx/pfm/financial-entities/default.jpg",
		"isBankAggregation": false,
		"dateCreated": 1683239167408,
		"lastUpdated": 1683239167408
	}
]
```

<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>


# Banks Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client contains the available actions related to banks.

  

## Setup

  

```javascript
import { BanksClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const banksClient = new BanksClient ({ apiKey, serverUrl });
```

  

## How to use

  

### Available Banks

  

Returns the list of available banks to be able to add and manage movements, money and balance with the bank.

  

```javascript
const userId = 123232;
banksClient
	.getAvailables(userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

Output:

  

```console
[
	Bank {
		bankId: 1115160,
		name: "Bank 1",
		imagePath: "https://cdn.finerio.mx/pfm/financial-entities/bank_BNW_shield.png",
		financialEntityId: 497394395,
		isBankAggregation: true,
        hasActiveConsent: false
	},
	Bank {
		bankId: 1115155,
		name: "Bank 2",
		imagePath: "https://cdn.finerio.mx/pfm/financial-entities/bank_BNW_shield.png",
		financialEntityId: 497394395,
		isBankAggregation: true,
        hasActiveConsent: false
	},
	...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 401

Invalid authorization.



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>
 
 # Categories Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client contains the available actions related to the classification of transactions and budgets.

  

## Setup

  

```javascript
import { CategoriesClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const categoriesClient = new CategoriesClient({ apiKey, serverUrl });
```

  

## How to use

  

### List Categories with subcategories

  

Fetches a list of categories, sorted by ID in descending order with its corresponding subcategories

  

```javascript
categoriesClient
	.getListWithSubcategories(userId, cursor)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

The cursor param is optional. If a cursor is specified, the list starts with the item that has that ID. If a user ID is specified, both system and user categories are fetched. If a user ID is not specified, only system categories are fetched.

  

Output:

  

```console
[
	Category {
		id: 1,
		name: 'Hogar',
		color: '#A3CB38',
		imagePath: 'https://cdn.image.com',
		parentCategoryId: null,
		userId: null,
		isUserCategory: false,
		subcategories: [Category,Category,Category]
	},
	Category {
		id: 2,
		name: 'Alimentos',
		color: '#FECA46',
		imagePath: 'https://cdn.image.com',
		parentCategoryId: null,
		userId: null,
		isUserCategory: false,
		subcategories: [Category,Category,Category]
	},
	...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### List Categories

  

Fetches a list of categories, sorted by ID in descending order

  

```javascript
categoriesClient
	.getList(userId, cursor)
	.then((data) =>  console.log(data))
	.catch((error) =>  console.log(error));
```

  

The cursor param is optional. If a cursor is specified, the list starts with the item that has that ID. If a user ID is specified, both system and user categories are fetched. If a user ID is not specified, only system categories are fetched.

  

Output:

  

```console
[
	Category {
		id: 1,
		name: 'Hogar',
		color: '#A3CB38',
		imagePath: 'https://cdn.image.com',
		parentCategoryId: null,
		userId: null,
		isUserCategory: false,
	},
	Category {
		id: 2,
		name: 'Alimentos',
		color: '#FECA46',
		imagePath: 'https://cdn.image.com',
		parentCategoryId: null,
		userId: null,
		isUserCategory: false,
	},
	...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Get Category

  

Given a valid category ID, fetches the information of a category.

  

```javascript
const categoryId = 2;
categoriesClient
	.get(categoryId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Category {
	id: 2,
	name: 'Alimentos',
	color: '#FECA46',
	imagePath: 'https://cdn.image.com',
	parentCategoryId: null,
	userId: null,
	isUserCategory: false,
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Create Category

  

Creates a category. If a user ID is not specified, the category is considered as a system category. If a parent category ID is specified, the category is considered a subcategory. You have to import the Category Payload Model to update it.

  

```javascript
import { CategoryPayload } from "open-banking-pfm-sdk";
...
const newCategoryData = new CategoryPayload(
	{
		userId: 858263023, //The ID of the user that owns the category
		name: "Sports", //The name of the category. It's required.
		color: "f848ef", //The color of the category
		parentCategoryId: null, //The ID of the parent category that owns this subcategory
	}
);

categoriesClient.create(newCategoryData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Category {
	id: 363479579,
	name: "Sports",
	color: "f848ef",
	imagePath: "https://cdn.finerio.mx/pfm/financial-entities/default.jpg",
	parentCategoryId: null,
	userId: 858263023,
	isUserCategory: true,
	dateCreated: 1678317553755,
	lastUpdated: 1678317553755
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Update Category

  

Given a valid category id updates a category. You can pass an object with the properties to update ( `name`: _string_, `color`: _string_, `parentCategoryId`: [_number_, _null_] ).

  

```javascript
const modifiedCategoryData = { name: 'Ball Sports' };

categoriesClient
	.edit(categoryId, modifiedCategoryData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Category {
	id: 363479579,
	name: "Ball Sports",
	color: "f848ef",
	imagePath: "https://cdn.finerio.mx/pfm/financial-entities/default.jpg",
	parentCategoryId: null,
	userId: 858263023,
	isUserCategory: true,
	dateCreated: 1678317553755,
	lastUpdated: 1678317553755
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Delete Category

  

Given a valid category id deletes a category.

  

```javascript
categoriesClient
	.delete(categoryId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

If the category was removed, the response will be returned as true.


<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

# Accounts Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client helps in managing users' bank accounts.

  

## Setup

  

```javascript
import { AccountsClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const accountsClient = new AccountsClient ({ apiKey, serverUrl });
```

  

## How to use

  

### List Accounts

  

Fetches a list of accounts per user, sorted by ID in descending order.

  

```javascript
accountsClient
	.getList(userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

The ID of the user that owns the accounts is required.

  

Output:

  

```console
[
	Account {
		id: 320023867,
		providerId: '296ac8fc-1f79-456f-b051-1ad1770dfd5d',
		nature: 'Credit card',
		name: 'Dinners Grafite',
		number: 'Dinners Grafite',
		balance: 0,
		chargeable: false,
		dateCreated: 1673471719653,
		lastUpdated: 1673471822866,
		isBankAggregation: false,
		financialEntityId: 547953460
	},
	Account {
		id: 278020899,
		providerId: '291e5a29-49ed-401f-a583-193caa7acddd',
		nature: 'Debit',
		name: '11188222-4',
		number: '111882224',
		balance: 41233.07,
		chargeable: false,
		dateCreated: 1672938088048,
		lastUpdated: 1673487691911,
		isBankAggregation: false,
		financialEntityId: 547953460
	}
	...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Get Account

  

Given a valid account ID, fetches the information of an account.

  

```javascript
accountsClient
	.get(accountId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Account {
	id: 320023867,
	providerId: '296ac8fc-1f79-456f-b051-1ad1770dfd5d',
	nature: 'Credit card',
	name: 'Dinners Grafite',
	number: 'Dinners Grafite',
	balance: 0,
	chargeable: false,
	dateCreated: 1673471719653,
	lastUpdated: 1673471822866,
	isBankAggregation: false,
	financialEntityId: 547953460
},
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Create Account

  

Creates an account. A previosuly created user and a financial entity is required. You have to import the Account Payload Model to create a new one.

 The possible values for nature property are "_*Debit*_" , "_*Credit card*_" , "_*Credit*_" , "_*Investment*_" , "_*Mortgage*_"

```javascript

import { AccountPayload } from "open-banking-pfm-sdk";
...
const newAccountData = new AccountPayload(
	{
		userId: 1115164, //The ID of the user that owns the account. It's required.
		financialEntityId: 743443, //The ID of the financial entity of the account. It's required.
		nature: 'Debit', //The nature of the account (check the account nature values down). It's required.
		name: 'Premium', //The name of the account. It's required.
		number: '1111 1111 1111 1111', //The number of the account. It's required.
		balance: 1000, //The balance of the account. It's required.
		chargeable: false //A flag that indicates if the balance of an account will change with transactions changes. It's required.
	}
);

accountsClient.create(newAccountData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Account {
	id: 2230303,
	providerId: '296ac8fc-1f79-456f-b051-1ad1770dfd5d',
	nature: 'Debit',
	name: "Premium",
	number: "1111 1111 1111 1111",
	balance: 1000,
	chargeable: false,
	dateCreated: 1673471719653,
	lastUpdated: 1673471822866,
	isBankAggregation: false,
	financialEntityId: 547953460
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>
  

### Update Account

  

Updates an account. You can pass an object with the properties to update ( `nature`: _string_, `name`: _string_, `number`: _string_, `balance`: _number_, `chargeable`: _boolean_ ).

  

```javascript
const modifiedAccountData = { name: 'Gold' };

accountsClient
	.update(accountId, modifiedAccountData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Account {
	id: 2230303,
	providerId: '296ac8fc-1f79-456f-b051-1ad1770dfd5d',
	nature: 'Debit',
	name: "Gold",
	number: "1111 1111 1111 1111",
	balance: 1000,
	chargeable: false,
	dateCreated: 1673471719653,
	lastUpdated: 1673471822866,
	isBankAggregation: false,
	financialEntityId: 547953460
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Delete Account

  

Deletes an account and all its information, including transactions.

  

```javascript
accountsClient
	.delete(accountId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>


# Transactions Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client helps in the management of financial movements within an account.

  

## Setup

  

```javascript
import { TransactionsClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const transactionsClient = new TransactionsClient ({ apiKey, serverUrl });
```

  

## How to use

  

### List Transactions

  

Fetches a list of transactions per account. You can pass a filter options object as parameter if is not passed all transactions are listed.

  

```javascript
const filterOptions = {
	categoryId: 12, //optional
	description: 'netflix', //optional
	charge: true, //optional
	minAmount: 0, //optional
	maxAmount: 1000, //optional
	dateFrom: 1587567125458, //optional
	dateTo: 1587567125458, //optional
	page: 0, //optional
	size: 100, //optional
	field: 'executionDate', //optional
	order: 'desc' //optional
}; // optional

transactionsClient
	.getList(accountId, filterOptions)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
[
	Transaction {
		id: 123,
		date: 1587567125458,
		charge: true,
		description: "UBER EATS",
		amount: 1234.56,
		categoryId: 123,
		dateCreated: 1587567125458,
		lastUpdated: 1587567125458,
		isBankAggregation: true
	},
	Transaction {
		id: 456,
		date: 1587567145458,
		charge: true,
		description: "RAPPI",
		amount: 1234.56,
		categoryId: 123,
		dateCreated: 1646259197099,
		lastUpdated: 1646259197099,
		isBankAggregation: true
	}
	...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Get Transaction

  

Given a valid transaction ID, fetches the information of a transaction.

  

```javascript
transactionsClient
	.get(transactionId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

```console
Transaction {
	id: 123,
	date: 1587567125458,
	charge: true,
	description: "UBER EATS",
	amount: 1234.56,
	categoryId: 123,
	dateCreated: 1587567125458,
	lastUpdated: 1587567125458,
	isBankAggregation: true
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Create Transaction

  

Creates a transaction. A previosuly created account is required. You have to import the Transaction Payload Model to create a new one.

  

```javascript
import { TransactionPayload } from "open-banking-pfm-sdk";
...
const newTransactionData = new TransactionPayload(
	{
	accountId: 487870282, //The ID of the account that holds the transaction. It´s required.
	amount: 1111, //The amount of the transaction. It´s required.
	charge: true, //A flag that indicates if the transaction is a charge or a deposit. It´s required.
	date: 1678255200000, //The date of the transaction. It´s required.
	description: 'Transaction Test', //The description of the transaction. It´s required.
	categoryId: 16 //The category ID of the transaction
	}
);

transactionsClient.create(newTransactionData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Transaction {
	id: 789,
	date: 1587567145458,
	charge: true,
	description: "Transaction Test",
	amount: 1111,
	categoryId: 16,
	dateCreated: 1587567145458,
	lastUpdated: 1587567145458,
	isBankAggregation: false
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Update Transaction

  

Given a valid transaction id updates a transaction. You can pass an object with the properties to update ( `amount`: _number_, `charge`: _boolean_, `date`: _number_, `description`: _string_, `categoryId`: _number_ ).

  

```javascript
const modifiedTransactionData = { description: 'Edited Transaction Test' };
transactionsClient
	.edit(transactionId, modifiedTransactionData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Transaction {
	id: 789,
	date: 1587567145458,
	charge: true,
	description: "Edited Transaction Test",
	amount: 1111,
	categoryId: 16,
	dateCreated: 1587567145458,
	lastUpdated: 1587567145458,
	isBankAggregation: false
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Delete Transaction

  

Deletes a transaction and all its information.

  

```javascript
transactionsClient
	.delete(transactionId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Delete all transactions from an account

  

Deletes all transactions of the account by its identifier.

  

```javascript
transactionsClient
	.deleteAll(accountId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```
Possible Errors:
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

 # Budgets Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client has the actions that allow you to manage the representations of the user's budget plans.

  

## Setup

  

```javascript
import { BudgetsClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const budgetsClient = new BudgetsClient({ apiKey, serverUrl });
```

  

## How to use

  

### List Budgets

  

Fetches a list of budgets per user, sorted by ID in descending order.

  

```javascript
budgetsClient
	.getList(userId, cursor)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

The cursor param is optional. If a cursor is specified, the list starts with the item that has that ID.

  

Output:

 
```console
[
	Budget {
		id: 982908114,
		categoryId: 11,
		name: "Sports",
		amount: 1111.00,
		warningPercentage: 0.70,
		spent: 0.00,
		leftToSpend: 1111.00,
		status: "ok",
		dateCreated: 1677714920234,
		lastUpdated: 1677714920234
	},
	Budget {
		id: 982908115,
		categoryId: 11,
		name: "Travelling",
		amount: 1111.00,
		warningPercentage: 0.70,
		spent: 0.00,
		leftToSpend: 1111.00,
		status: "ok",
		dateCreated: 1677714920234,
		lastUpdated: 1677714920234
	}
	...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Get Budget

  

Given a valid budget ID, fetches the information of a budget.

  

```javascript
const budgetId = 982908114;
budgetsClient
	.get(budgetId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Budget {
	id: 982908114,
	categoryId: 11,
	name: "Sports",
	amount: 1111.00,
	warningPercentage: 0.70,
	spent: 0.00,
	leftToSpend: 1111.00,
	status: "ok",
	dateCreated: 1677714920234,
	lastUpdated: 1677714920234
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Create Budget

  

Creates a budget. A previously created user and a category is required. There can be only one budget per category.

  

```javascript
import { BudgetPayload } from "open-banking-pfm-sdk";
...
const newBudgetData = new BudgetPayload(
	{
		amount: 100, //The amount of the budget. It's required.
		categoryId: 62, //The category ID of the budget. It's required.
		name: "Donaciones", //The name of the budget. It's required.
		userId: 1859616, //The ID of the user that owns the budget. It's required.
		warningPercentage: 0.5 //The percentage where the budget status changes from stable to warning. This is optinal field. By default is 0.7.
	}
);

budgetsClient.create(newBudgetData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Budget {
	id: 234924782,
	categoryId: 62,
	name: "Donaciones",
	amount: 100.00,
	warningPercentage: 0.70,
	spent: 0.00,
	leftToSpend: 100.00,
	status: "ok",
	dateCreated: 1678317204886,
	lastUpdated: 1678317204886
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Update Budget

  

Update a budget. You can pass an object with the properties to update ( `amount`: _number_, `name`: _string_, `warningPercentage`: _number_ ).

  

```javascript
const modifiedBudgetData = { amount: 500 };

budgetsClient
	.edit(budgetId, modifiedBudgetData)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Budget {
	id: 234924782,
	categoryId: 62,
	name: "Donaciones",
	amount: 500.00,
	warningPercentage: 0.70,
	spent: 0.00,
	leftToSpend: 100.00,
	status: "ok",
	dateCreated: 1678317204886,
	lastUpdated: 1678317204886
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Delete Budget

  

Deletes a budget and all its information.

  

```javascript
budgetsClient
	.delete(budgetId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

If the budget was removed, the response will be returned as true.


<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```


## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>


 
  

# Bank Aggregation Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This is the same client as [Banks Client](#banks-client), next contains the available actions related to bank aggregation process.


  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)


## Setup

  

```javascript
import { BanksClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const banksClient = new BanksClient ({ apiKey, serverUrl });
```


## How to use



  

### Create Bank Consent

  

Given a bank ID and a user ID, create consent and retrieve the url for ask it.

  

```javascript
const bankId = 'c55a1362-93fd-49eb-86ae-d82205b861c5'; //The ID of the bank to request
const userId = 487969842; //The ID of the user to request.
const time = 3; //Term of expiration of consent expressed in months: 3, 6 or 12.

banksClient
	.createConsent(bankId, userId, time)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
{
	bankId: "c55a1362-93fd-49eb-86ae-d82205b861c5",
	userId: 487969842,
	url: "https://auth1.tboz-csbx.staging.ozoneapi-br.com/auth?client_id=75deaf3f-2597-48a0-bf70"
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Authorize Bank Consent

  

The code, token and consent state are received to authorize of the consent. In the background, the consent is consumed.

  
This function not requires the ApiKey, so in the client constructor you don't have to specify it.


```javascript
import { BanksClient } from 'open-banking-pfm-sdk';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const banksClient = new BanksClient ({ serverUrl });
```

```javascript
const code = 'c55a136207f52861-97e8-4329-8bc5-c324089de119'; //The authCode given by the bank
const id_token = 'eyJhbGciOiJQUzI1NiIsImtpZCI6IkpWdlBicE12bjVaVFJKaGhTaFFGcllJVElHQklVZj'; //The token given by the bank
const state = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; //The state given by the bank.

banksClient
	.authorize(code, id_token, state)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
true
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

### Get Bank aggregation status

  

Action to obtain bank aggregation status. The status can be *_'CONSENT_REQUESTED' , 'CONSENT_AUTHORISED',  'CONSENT_REJECTED' , 'CONSENT_DELETED' , 'AGGREGATION_STARTED' , 'AGGREGATION_COMPLETED' , 'PROCESS_FAILED'_*

```javascript
const bankId = 'c55a1362-93fd-49eb-86ae-d82205b861c5'; //The ID of the bank to request
const userId = 487969842; //The ID of the user to request.
banksClient
	.getAggregationStatus(bankId, userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
{
	bankId: "c55a1362-93fd-49eb-86ae-d82205b861c5",
	userId: 487969842,
	status: "CONSENT_REQUESTED"
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Bank aggregation status with Long Polling

  

Starts a long polling to get bank aggregation status.

  

```javascript
const options = {
	bankId: 2230303, //The ID of the bank to request. Is required
	userId: 1111, //The ID of the user to request. Is required.
	onResponse: () => null, //Triggered when the response is received.
	onError: () => null //Triggered when a server error occurs
	time: 5000 //Interval between requests
};

banksClient
	.aggregationStatusSubscribe(options)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

To stop the long polling:

  

```javascript
banksClient.aggregationStatusUnsubscribe();
```

  

### Get Bank Resources

  

Consult the resources granted to the user for the given bank and start in the background the aggregation of the resources that the user is authorised to user.

  

```javascript
const bankId = 'c55a1362-93fd-49eb-86ae-d82205b861c5'; //The ID of the bank to request
const userId = 487969842; //The ID of the user to request.

banksClient
	.getResources(bankId, userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
{
	bankId: "c55a1362-93fd-49eb-86ae-d82205b861c5",
	userId: 487969842,
	resources: [
		"ACCOUNT", "CREDIT_CARD_ACCOUNT"
	]
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Synchronize

  

Start of the resources that the user is authorised for.

  

```javascript
const bankId = 'c55a1362-93fd-49eb-86ae-d82205b861c5'; //The ID of the bank to request
const userId = 487969842; //The ID of the user to request.

banksClient
	.synchronize(bankId, userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:
  

```console
true
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Consume Bank Consent (deprecated)

  

Given a authCode, token and state, consume consent and retrieve consent's status.

  

```javascript
const authCode = 'c55a136207f52861-97e8-4329-8bc5-c324089de119'; //The authCode given by the bank
const token = 'eyJhbGciOiJQUzI1NiIsImtpZCI6IkpWdlBicE12bjVaVFJKaGhTaFFGcllJVElHQklVZj'; //The token given by the bank
const state = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; //The state given by the bank.

banksClient
	.consumeConsent(authCode, token, state)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
{
	status: "CONSENT_AUTHORISED"
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Aggregate Banks (deprecated)

  

Retrieve a list of banks that have successfully completed the bank aggregation process.

  

```javascript
const userId = 10; //The ID of the user to request.

banksClient
	.getAggregates(userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
[
	BankAggregated {
		consentId: "urn:consumption:aac-649a4ef6-d4b4-43a8-b32e-1aba5a0355fd",
		originBankName: null,
		customerIdentification: null,
		cpf: "76109277673",
		targetInstitution: "consumptionSandboxAuth1234",
		deadline: 0,
		expirationDay: 1686184974479,
		status: "CONSENT_REQUESTED",
		isSynchronized: null
	},
...
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

 # Consents Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client helps in Open Banking Consents endpoints.

  

## Setup

  

```javascript
import { ConsentsClient} from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const consentsClient = new ConsentsClient({ apiKey, serverUrl });
```

  

## How to use

  

### Get Consent

  

Given a valid consent ID, fetches the information of a consent.

  

```javascript
consentsClient
	.get(consentId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
ConsentDetail {
	consentId: "urn:consumption:aac-372ed338-76e7-4616-b793-e792b74215d7",
	originBankName: "test304 test304 test304",
	customerIdentification: null,
	cpf: null,
	BankConsent: {
		bankId: 885402086,
		name: "Consumption Sandbox Auth Server"
	},
	purpose: "Finanças Pessoais",
	deadline: 3,
	status: "ACTIVATED",
	isSynchronized: false
},
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Get Consent List

  

Fetches a list of consents per user.

  

```javascript
const filterOptions = {
	type: 'ACTIVATED' | 'PENDING' | 'EXPIRED' | 'CANCELLED', //Optional
	status: 'RECEIVED' | 'TRANSMITTED' //Optional
};

consentsClient
	.getList(userId, filterOptions)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
[
Consent {
	consentId: "urn:consumption:aac-372ed338-76e7-4616-b793-e792b74215d7",
	expirationDate: 1688513720224,
	BankConsent: {
		bankId: 885402086,
		name: "Consumption Sandbox Auth Server"
	},
	status: "ACTIVATED"
	}
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 401

Invalid authorization.

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Cancel Consent

  

A consent is canceled given the identifier.

  

```javascript
consentsClient
	.delete(consentId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

If the consent was cancelled, the response will be returned as true.

<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  


# Credits Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

This client helps in managing users' credit accounts.

  

## Setup

  

```javascript
import { CreditsClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const creditsClient = new CreditsClient({ apiKey, serverUrl });
```

  

## How to use

  

### List Credits

  

Fetches a list of credit accounts per user.

  

```javascript
creditsClient
	.getList(userId)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

The ID of the user that owns the accounts is required.

  

Output:

  

```console
{
	"data": [
		{
			"id": 927241071,
			"providerId": "141000000000000000000013",
			"financialEntityId": 941746456,
			"nature": "Credit card",
			"name": "Cartão INFINITE",
			"number": "Cartão INFINITE",
			"balance": 8247.81,
			"chargeable": false,
			"dateCreated": 1682652624964,
			"lastUpdated": 1682652624964,
			"lineName": "CREDITO_A_VISTA",
			"availableAmount": 8247.8111,
			"limitAmount": 49856.0111,
			"usedAmount": 41609.2111,
			"isBankAggregation": true
		}
	],
	"nextCursor": null,
	"totalBalance": {
		"availableAmount": 8247.8111,
		"limitAmount": 49856.0111,
		"usedAmount": 41609.2111
	}
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  


# Insights Client

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

Insights and datapoints about user financial information.

  

## Setup

  

```javascript
import { InsightsClient } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const insightsClient = new InsightsClient({ apiKey, serverUrl });
```

  

## How to use

  

### Resume

  

Given a valid user ID, fetches a resume of the financial information of a user. It contains expenses, incomes and balances.

  

```javascript
const insightsOptions = {
	accountId:525742481,//Mandatory
	dateFrom: number,//Optional
	dateTo: number;//Optional
}

insightsClient
	.getResume(userId, insightsOptions)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
Resume {
	incomes: [],
	expenses: [
		IncomeExpense {
			date: 1672552800000,
			categories: [
				CategoryResume {
					categoryId: 2,
					amount: 720.82,
					subcategories: [
						SubcategoryInsights {
							categoryId: 16,
							amount: 720.82,
							transactionsByDate: [
								TransactionsByDate {
									date: 1674194400000,
									transactions: [
										Transaction {
											id: 796541939,
											date: 1674194400000,
											charge: true,
											description: 'Clk*Compao Plaza',
											amount: 720.82,
											categoryId: 16,
											dateCreated: 1676572948884,
											lastUpdated: 1676981093696
										}
									]
								}
							]
						}
					]
				},
				CategoryResume {
					categoryId: 4,
					amount: 433.82,
					subcategories: [ [SubcategoryInsights] ]
				},
				CategoryResume {
					categoryId: 7,
					amount: 369.82,
					subcategories: [ [SubcategoryInsights] ]
				}
			],
			amount: 1524.46
		},
		IncomeExpense {
			date: 1675231200000,
			categories: [Array],
			amount: 12006.02
		}
	],
	balances: [
		Balance { incomes: 0, expenses: 12006.02, date: 1675231200000 },
		Balance { incomes: 0, expenses: 1524.46, date: 1672552800000 }
	]
}
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

  

### Analysis

  

Given a valid user ID, fetches an analysis of the financial information of a user. It contains expenses, incomes and balances. It receives an object as parameter, accountId is required.

  

```javascript
const insightsOptions = {
	accountId:525742481,//Required
	dateFrom: number,//Optional
	dateTo: number;//Optional
}
insightsClient
	.getAnalysis(userId, insightsOptions)
	.then((data) => console.log(data))
	.catch((error) => console.log(error));
```

  

Output:

  

```console
[
	Analysis {
		date: 1672552800000,
		categories: [
			CategoryAnalysis {
				categoryId: 2,
				amount: 720.82,
				subcategories: [
					SubcategoryAnalysis {
						categoryId: 16,
						average: 720.82,
						quantity: 1,
						amount: 720.82,
						transactions: [
							TransactionAnalysis {
								description: 'Clk*Compao Plaza',
								average: 720.82,
								quantity: 1,
								amount: 720.82
							}
						]
					}
				]
			},
			CategoryAnalysis {
				categoryId: 4,
				amount: 433.82,
				subcategories: [ [SubcategoryAnalysis] ]
			},
			CategoryAnalysis {
				categoryId: 7,
				amount: 369.82,
				subcategories: [ [SubcategoryAnalysis] ]
			}
		]
	},
	Analysis {
		date: 1675231200000,
		categories: [
			[CategoryAnalysis],
			[CategoryAnalysis],
			[CategoryAnalysis],
			[CategoryAnalysis],
			[CategoryAnalysis],
			[CategoryAnalysis],
			[CategoryAnalysis]
		]
	},
	Analysis {
		date: 1677650400000,
		categories: [ [CategoryAnalysis] ]
	}
]
```
<details>
  <summary><h4>Possible Errors</h4></summary>
  
  ### Error 400

Something in your request was wrong.


```json
{
  "errors": [
    {
      "code": "string",
      "title": "string",
      "detail": "string"
    }
  ]
}
```

## Error 404

The requested param was not found.

```json
{
	"errors": [
	    {
	      "code": "string",
	      "title": "string",
	      "detail": "string"
	    }
	]
}
```



## Error 500

Something in your request was wrong.


```json
{
	"message": "string"
}
```
</details>

 

# Helpers

  

![Language](https://img.shields.io/badge/Language-Typescript-blue.svg) ![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

  

Helpers are functions that can complement the use of clients.

  

## How to use

  

### Build Clients

  

This function is used to instantiate all clients with a single call.

  

```javascript
import { buildClients } from 'open-banking-pfm-sdk';
//The constructor receives an object with two properties, the first is the api key to validate access to all of its functions, the second is the API Server Url, both are required.
const apiKey = 'XXXX-XXXX-XXXX';
const serverUrl = 'https://pfmapiserver.com/api/v1/';
const clients = new buildClients({ apiKey, serverUrl });
console.log(clients);
```

  

Output:

  

```console
ClientDictionary {
	accountsClient: AccountsClient,
	banksClient: BanksClient,
	budgetsClient: IBudgetsClient;
	categoriesClient: ICategoriesClient;
	transactionsClient: TransactionsClient,
	usersClient: UsersClient,
	creditsClient: CreditsClient,
	consentsClient: ConsentsClient
}
```




## Open Banking Web Components

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

The Open Banking Web Componentes are reusable components with their functionality encapsulated away from the rest of your code that brings you an User Interface to use with the Open Banking SDK in ypur web applications.

## Table of contents

- [Styles](#styles)
- [Currency](#currency)
- [Language](#language)
- [Loading View Managment](#loading-view-managment)
- [Web Components](#web-components)
  - [Consent Component](#consent-component)
  - [Accounts Component](#accounts-component)
  - [Credits Component](#credits-component)
  - [Transactions Component](#transactions-component)
  - [Categories Component](#categories-component)
  - [Budget Component](#budget-component)
  - [Summary Component](#summary-component)
- [Theme Colors](#theme-colors)
- [Global components](#global-components)

## Styles

The Web components allow their styles to be overridden via the `componentStyles` property. This property supports a string style but can also support a css file if the [css-loader](https://webpack.js.org/loaders/css-loader/) module is configured via `Webpack`.

## Currency

The Web components provide the option to change the currency format that will be displayed in their views via the `currencyLang` and `currencyType` properties. To apply the format to numbers we use [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format).

## Language

Web components have default texts that can be presented in two languages ​​using the `lang` property. Spanish (_"es"_) and Portuguese (_"pt"_) languages ​​are currently available.

## Loading View Managment

In the web components there are 2 views that help represent a pending process. The `showMainLoading` property manages the loading overview. The `showModalLoading` property manages the loading view in a modal.

## Common Properties list

You can manage these properties in any web component.

| Name                 | Type      | Description                                | Default  |
| -------------------- | --------- | ------------------------------------------ | -------- |
| **componentStyles**  | `string`  | Override styles                            | _""_     |
| **showMainLoading**  | `boolean` | Show Main loading view                     | _false_  |
| **mainLoadingSize**  | `string`  | Main loading view size                     | _"34px"_ |
| **showModalLoading** | `boolean` | Show Modal loading view                    | _false_  |
| **modalLoadingSize** | `string`  | Modal loading view size                    | _"82px"_ |
| **fontFamily**       | `string`  | Font family in the component               | _""_     |
| **lang**             | `string`  | Language selected for the texts            | _"pt"_   |
| **currencyLang**     | `string`  | Indicates currency format through language | _"pt-BR"_|
| **currencyType**     | `string`  | Indicate the type of currency              | _"BRL"_  |
|                      |           |                                            |          |

## Web components:

# Consent Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component displays the consent list, consent detail and banks list to start consent consume process.

![consetns2](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/4d48a71b-0b98-4a8d-8a0f-b7313ee731b4)

## Installation

Download de *_ob-consent-wizard-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-consent-wizard-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-consent-wizard-component.js"></script>
```
  
```javascript
import './libs/ob-consent-wizard-component';
```

## How to use

Insert the html tag in your web application as follow.

```html
<ob-consent-wizard-component 
	banksData 
	consentsData 
	consentSelectedData
></ob-consent-wizard-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name                    | Type                   | Description                                                  | Default | SDK Function                                                                          |
| ----------------------- | ---------------------- | ------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------- |
| **banksData**           | [`string`, `Array`]    | The data of the banks that will be used                      | _[]_    | [Available Banks](https://www.npmjs.com/package/open-banking-pfm-sdk#available-banks) |
| **consentsData**        | [`string` , `Array`]   | The data of the consents that will be used                   | _[]_    | [Consent List](https://www.npmjs.com/package/open-banking-pfm-sdk#get-consent-list)   |
| **consentSelectedData** | [`string` , `Consent`] | The object data consent that will be displayed in the detail | null    | [Get Consent](https://npmjs.com/package/open-banking-pfm-sdk#get-consent)             |

## Customization Properties

| Name                                     | Type                  | Description                                                                                            | Default                                                        |
| ---------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| **bankListTitle**                        | `string`              | The custom text to be displayed in the title of the bank list view                                     | "Conecte-se com segurança à sua instituição"                  |
| **bankListTitleIsShown**                 | [`string`, `boolean`] | Show title in bank list view                                                                           | _true_                                                         |
| **bankListDescription**                  | `string`              | The custom text to be displayed in the description of the bank list view                               | "Selecione seu banco e autorize a conexão"                   |
| **bankListDescriptionIsShown**           | [`string`, `boolean`] | Show description in bank list view                                                                     | _true_                                                         |
| **expirationDateFormTitle**              | `string`              | The custom text to be displayed in the title of the expiration date form                               | "Data de vencimento"                                         |
| **expirationDateFormTitleIsShown**       | [`string`, `boolean`] | Show title in expiration date form                                                                     | _true_                                                         |
| **expirationDateFormDescription**        | `string`              | The custom text to be displayed in the description of the expiration date form                         | "Selecione a expiração do seu link"                  |
| **expirationDateFormDescriptionIsShown** | [`string`, `boolean`] | Show description in expiration date form view                                                          | _true_                                                         |
| **submitButtonText**                     | `string`              | The custom text to be displayed in the submit button of the expiration date form view                  | "Prosseguir"                                                    |
| **termFieldLabel**                       | `string`              | The custom text to be displayed in the term field label of the expiration date form                    | "Prazo"                                                        |
| **title**                                | `string`              | The custom text to be displayed in the component's title                                               | "Meus consetimentos"                                              |
| **showAddConsent**                       | `boolean`             | Show the icon to add a new consent                                                                     | _true_                                                         |
| **titleTypeConsentText**                 | `string`              | The first title displayed in filter modal, consent type.                                               | "Tipo de consetimento"                                       |
| **titleStatusConsentText**               | `string`              | The second title displayed in filter modal, consent status.                                            | "Status de consetimento"                                     |
| **receivedTypeText**                     | `string`              | The text to be displayed in filter modal to received type.                                             | "Recebidos"                                                    |
| **trasmitedTypeText**                    | `string`              | The text to be displayed in filter modal to transmitted type.                                          | "Transmitidos"                                                 |
| **activeButtonText**                     | `string`              | The text to be displayed in filter modal to active status.                                             | "Ativo"                                                       |
| **pendingButtonText**                    | `string`              | The text to be displayed in filter modal to pending status.                                            | "Pendente"                                                    |
| **expiredButtonText**                    | `string`              | The text to be displayed in filter modal to expired status.                                            | "Vencido"                                                      |
| **closedButtonText**                     | `string`              | The text to be displayed in filter modal to closed status.                                             | "Cancelado"                                                    |
| **filterText**                           | `string`              | The text to be displayed in the filter button.                                                         | "Filtrar"                                                      |
| **detailsConsentTitleText**              | `string`              | The text to be displayed in the title of consent detail modal.                                         | "Detalhes do consetimento:"                                          |
| **clientIdentificacionText**             | `string`              | The text to be displayed in the client identification label inside consent detail modal.               | "Indentificação do cliente"                                   |
| **CPFText**                              | `string`              | The text to be displayed in the cpf label inside consent detail modal.                                 | "CPF"                                                          |
| **purposeOfDataText**                    | `string`              | The text to be displayed in the purpose label inside consent detail modal.                             | "Objetivo dos dados"                                        |
| **instituteDestinationText**             | `string`              | The text to be displayed in the financial institution label inside consent detail modal.               | "Instituição de destino"                                       |
| **dateLimitToSharedText**                | `string`              | The text to be displayed in the date limit label inside consent detail modal.                          | "Prazo do consetimento"                                  |
| **deleteButtonText**                     | `string`              | The text to be displayed in the cancel buttton inside consent detail modal.                            | "Cancelar"                                                     |
| **renewButtonText**                      | `string`              | The text to be displayed in the renew buttton inside consent detail modal.                             | "Renovar consetimento"                                       |
| **dataSharedTitle**                      | `string`              | The text to be displayed in the title of data shared container inside consent detail modal.            | "Dados compartilhados"                                            |
| **dataSharedFirstSubTitle**              | `string`              | The text to be displayed in the first subtitle of data shared container inside consent detail modal.   | "Dados Cadastrais"                                            |
| **dataSharedFirstContent**               | `string`              | The text to be displayed in the first container of data shared container inside consent detail modal.  | "Função da pessoa, Tipo da pessoa, Nome completo, CPF ou CNPJ" |
| **dataSharedSecondSubTitle**             | `string`              | The text to be displayed in the second subtitle of data shared container inside consent detail modal.  | "Informações complementares"                                |
| **dataSharedSecondContent**              | `string`              | The text to be displayed in the second container of data shared container inside consent detail modal. | "Logradouro, Código Postal, UF, Celular"           |
| **monthsText**                           | `string`              | The text to be displayed in the months label inside consent detail modal.                              | "Meses"                                                        |
| **titleModalDeleteConsent**              | `string`              | The text to be displayed in the title of the delete modal.                                             | "Aviso"                                                  |
| **descriptionModalDeleteConsent**        | `string`              | The text to be displayed in the content of the delete modal.                                           | "Tem certeza de que deseja cancelar este consetimento?"      |
| **textCancelButtonModalConsent**         | `string`              | The text to be displayed in the cancel button of the delete modal.                                     | "Voltar"                                                       |
| **textConfirmButtonModalConsent**        | `string`              | The text to be displayed in the confirm button of the delete modal.                                    | "Cancelar consentimiento"                                      |
| **showFilter**                           | [`string`, `boolean`] | Show the filter button                                                                                 | _false_                                                        |
| **closeDisabled**                        | [`string`, `boolean`] | The Close events are disabled                                                                          | _false_                                                        |
|                                          |                       |                                                                                                        |

## Events

| Name                       | Description                                                            | Detail Data       |
| -------------------------- | ---------------------------------------------------------------------- | ----------------- |
| **component-mount**        | Triggers when the component is mounted                                 | _None_            |
| **component-unmount**      | Triggers when the component is unmounted                               | _None_            |
| **on-click-add**           | Triggers when the add consent icon is clicked                          | _None_            |
| **close-modal**            | Triggers when the modal is closed                                      | _None_            |
| **select-bank**            | Triggers when a bank is selected                                       | bankId: `string`  |
| **on-change-term**         | Triggers when a term is selected                                       | term: `string`    |
| **on-submit**              | Triggers when the submit button on the expiration date form is clicked | term: `string`    |
| **select-consent**         | Triggers when a consent is selected                                    | consent: `object` |
| **cancel-consent**         | Triggers when the cancel conset button is clicked                      | consent: `object` |
| **cancel-consent-back**    | Triggers when the back button of delete consent modal is clicked       | _None_            |
| **cancel-consent-confirm** | Triggers when the confirm button of delete consent modal is clicked    | consent: `object` |
| **renew-consent**          | Triggers when the renew button is clicked                              | consent: `object` |
| **select-filter**          | Triggers when a filter is selected                                     | item: `object`    |
|                            |                                                                        |                   |

# Accounts Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component helps in managing accounts and calculating their balance.

![accounts](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/24649fb1-a563-4980-b5db-00c9f8e56587)

## Installation

Download de *_ob-accounts-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-accounts-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-accounts-component.js"></script>
```
  
```javascript
import './libs/ob-accounts-component';
```

## How to use

Insert the html tag in your web application as follow.

```html
<ob-accounts-component
	accountsData 
	financialEntitiesData
></ob-accounts-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name                      | Type                 | Description                                                   | Default | SDK Function                                                                                         |
| ------------------------- | -------------------- | ------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| **accountsData**          | [`string`, `Array`]  | The data of the accounts that will be used                    | _[]_    | [Accounts List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-accounts)                    |
| **financialEntitiesData** | [`string` , `Array`] | The data of the financial entities or banks that will be used | _[]_    | [Financial Entities List](https://www.npmjs.com/package/open-banking-pfm-sdk#get-financial-entities) |
|                           |                      |                                                               |

## Customization Properties

| Name                              | Type                  | Description                                                                          | Default                      |
| --------------------------------- | --------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| **title**                         | `string`              | The custom text to be displayed in the title of the view                             | "Contas agregadas"          |
| **titleShow**                     | [`string`, `boolean`] | Show view title                                                                      | _true_                       |
| **newAccountDisabled**            | [`string`, `boolean`] | Disable the option to add accounts                                                   | _false_                      |
| **editAccountDisabled**           | [`string`, `boolean`] | Disable the option to edit accounts                                                  | _false_                      |
| **deleteAccountDisabled**         | [`string`, `boolean`] | Disable the option to delete accounts                                                | _false_                      |
| **newAccountSubmitButton**        | `string`              | The custom text that will be displayed on the Submit button of the new account form  | "Criar conta"               |
| **deleteAccountButton**           | `string`              | The custom text that will be displayed on the Delete button of the edit account form | "Apagar"                   |
| **editAccountSubmitButton**       | `string`              | The custom text that will be displayed on the Submit button of the edit account form | "Salvar"                    |
| **newAccountModalTitle**          | `string`              | The custom text to display in the title of the new account modal.                    | "Criar conta"               |
| **editAccountModalTitle**         | `string`              | The custom text to display in the title of the edit account modal.                   | "Edição: conta"            |
| **debitAndCashSectionTitle**      | `string`              | The custom text to display in the title of the Debit and cash section                | "Débito"          |
| **debitAndCashSectionOrder**      | [`string`, `number`]  | Position number in the list of the Debit and cash section                            | _1_                          |
| **debitAndCashSectionShow**       | [`string`, `boolean`] | Show Debit and cash section                                                          | _true_                       |
| **creditCardAndDebtSectionTitle** | `string`              | The custom text to display in the title of the Credit card and debt section          | "Cartão de crédito e dívidas" |
| **creditCardAndDebtSectionOrder** | [`string`, `number`]  | Position number in the list of the Credit card and debt section                      | _2_                          |
| **creditCardAndDebtSectionShow**  | [`string`, `boolean`] | Show Credit card and debt section                                                    | _true_                       |
| **shortTermBalanceSectionTitle**  | `string`              | The custom text to display in the title of the Short-term balance section            | "Saldo a curto prazo"        |
| **shortTermBalanceSectionOrder**  | [`string`, `number`]  | Position number in the list of the Short-term balance section                        | _3_                          |
| **shortTermBalanceSectionShow**   | [`string`, `boolean`] | Show Short-term balance section                                                      | _true_                       |
| **investmentsSectionTitle**       | `string`              | The custom text to display in the title of the Investments section                   | "Investimentos"                |
| **investmentsSectionOrder**       | [`string`, `number`]  | Position number in the list of the Investments section                               | _4_                          |
| **investmentsSectionShow**        | [`string`, `boolean`] | Show Investments section                                                             | _true_                       |
| **creditsSectionTitle**           | `string`              | The custom text to display in the title of the Credits section                       | "Créditos"                   |
| **creditsSectionOrder**           | [`string`, `number`]  | Position number in the list of the Credits section                                   | _5_                          |
| **creditsSectionShow**            | [`string`, `boolean`] | Show Credits section                                                                 | _true_                       |
| **longTermBalanceSectionTitle**   | `string`              | The custom text to display in the title of the Long-term balance section             | "Saldo a longo prazo"        |
| **longTermBalanceSectionOrder**   | [`string`, `number`]  | Position number in the list of the Long-term balance section                         | _6_                          |
| **longTermBalanceSectionShow**    | [`string`, `boolean`] | Show Long-term balance section                                                       | _true_                       |
| **totalSectionTitle**             | `string`              | The custom text to display in the title of the Total section                         | _null_                       |
| **totalSectionOrder**             | [`string`, `number`]  | Position number in the list of the Total section                                     | _7_                          |
| **totalSectionShow**              | [`string`, `boolean`] | Show Total section                                                                   | "Patrimônio Líquido"            |
|                                   |                       |                                                                                      |

## Events

| Name                                  | Description                                            | Detail Data                                                                   |
| ------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| **component-mount**                   | Triggers when the component is mounted                 | _None_                                                                        |
| **component-unmount**                 | Triggers when the component is unmounted               | _None_                                                                        |
| **open-new-modal**                    | Triggers when new account modal is opened              | _None_                                                                        |
| **open-edit-modal**                   | Triggers when edit account modal is opened             | _None_                                                                        |
| **close-new-modal**                   | Triggers when new account modal is closed              | _None_                                                                        |
| **close-edit-modal**                  | Triggers when edit account modal is closed             | _None_                                                                        |
| **field-change**                      | Triggers when an account form field is changed         | {name: `string`, value: `string`}                                             |
| **save-edit**                         | Triggers when edit modal form is submitted             | {account: `object`, onSuccess: `void`}                                        |
| **save-new**                          | Triggers when new modal form is submitted              | {account: `object`, onSuccess: `void`}                                        |
| **open-collapsible-section**          | Triggers when collapsible section is opened            | name: `string`                                                                |
| **close-collapsible-section**         | Triggers when collapsible section is closed            | name: `string`                                                                |
| **open-bank-collapsible-section**     | Triggers when bank's collapsible section is opened     | { bankId:`number`, bankName:`string`, imagePath:`string`, accounts: `Array` } |
| **close-bank-collapsible-section**    | Triggers when bank's collapsible section is closed     | { bankId:`number`, bankName:`string`, imagePath:`string`, accounts: `Array` } |
| **click-account-collapsible-section** | Triggers when account in collapsible section is closed | id: `number`                                                                  |
|                                       |                                                        |                                                                               |

# Credits Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component shows credit accounts information.

![credit](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/58b426f2-3ef0-4058-9107-a2ffb6ae1c99)

## Installation

Download de *_ob-credit-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-credit-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-credit-component.js"></script>
```
  
```javascript
import './libs/ob-credit-component';
```

## How to use

Insert the html tag in your web application as follow.

```html
<ob-credit-component
	creditData
	banksData
></ob-credit-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name                | Type                 | Description                                                    | Default | SDK Function                                                                                                                               |
| ------------------- | -------------------- | -------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **creditData**      | [`string`, `Array`]  | The data of the credits that will be used                      | _[]_    | [Credits List](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#list-credits)                                                       |
| **banksData**       | [`string` , `Array`] | The data of the banks that will be used                        | _[]_    | [Available Banks](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#available-banks)                                                 |
| **availableAmount** | [`number`,`string`]  | The total available amount showed in the total credits section | 0       | [Credits List](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#list-credits) (availableAmount property inside totalBalance object) |
| **limitAmount**     | [`number`,`string`]  | The total limit amount showed in the total credits section     | 0       | [Credits List](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#list-credits) (limitAmount property inside totalBalance object)     |
| **usedAmount**      | [`number`,`string`]  | The total used amount showed in the total credits section      | 0       | [Credits List](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#list-credits) (usedAmount property inside totalBalance object)      |

## Customization Properties

| Name                                  | Type                | Description                                                                                              | Default                                                                                      |
| ------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **creditTitle**                       | `string`            | The custom text to display in the title of the web component                                             | "Crédito"                                                                                    |
| **totalCreditTitle**                  | `string`            | The custom text to display in the available amount section of the total credits section                  | "Limite disponivel total:"                                                                   |
| **totalActualText**                   | `string`            | The custom text to display in the used amount section of total credits section                           | "Fatura atual total:"                                                                      |
| **totalInitialLimitText**             | `string`            | The custom text to display in the limit amount section of total credits section                          | "Limite inicial total:"                                                                      |
| **allCreditHeaderTextBank**           | `string`            | The custom text to display in the first column of the credits table                                      | "Banco"                                                                                      |
| **allCreditHeaderTextName**           | `string`            | The custom text to display in the second column of the credits table                                     | "Nome da Linha"                                                                            |
| **allCreditHeaderTextCurrentBalance** | `string`            | The custom text to display in the third column of the credits table                                      | "Fatura atual"                                                                              |
| **allCreditHeaderTextAvailableLimit** | `string`            | The custom text to display in the fourth column of the credits table                                     | "Limite disponivel"                                                                          |
| **allCreditHeaderTextInitialLimit**   | `string`            | The custom text to display in the fifth column of the credits table                                      | "Limite inicial"                                                                             |
| **warningPercentage**                 | [`number`,`string`] | The custom warning percentage where the progress bar will change color                                   | 0.7                                                                                          |
| **isEmpty**                           | `boolean`           | Show the empty view in the component                                                                     | _false_                                                                                      |
| **emptyViewTitle**                    | `string`            | The custom text to be displayed in the Title section of the Empty view (When there are no credits)       | "Bem-vindo ao seu resumo de crédito"                                                        |
| **emptyViewDescription**              | `string`            | The custom text to be displayed in the Description section of the Empty view (When there are no credits) | "Assim que você registrar uma conta bancária aqui, verá um resumo de suas contas de crédito." |
| **emptyViewActionText**               | `string`            | The custom text to be displayed in the Action Button of the Empty view (When there are no credits)       | "Adicionar Conta"                                                                             |

## Events

| Name                   | Description                                          | Detail   |
| ---------------------- | ---------------------------------------------------- | -------- |
| **component-mount**    | Triggers when the component is mounted               | _None_   |
| **component-unmount**  | Triggers when the component is unmounted             | _None_   |
| **empty-button-click** | Triggers when action button in empty view is clicked | _None_   |
| **credit-click**       | Triggers when a credit is clicked                    | _Credit_ |

# Transactions Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component helps in managing transactions.

![transacciones](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/ff72271a-dfbb-4430-94fb-55a662e311e1)

## Installation

Download de *_ob-transactions-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-transactions-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-transactions-component.js"></script>
```
  
```javascript
import './libs/ob-transactions-component';
```

## How to use

Insert the html tag in your web application as follow.

```html
<ob-transactions-component 
	transactionsData 
	accountsData 
	categoriesData
></ob-transactions-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name                 | Type                 | Description                                    | Default | SDK Function                                                                              |
| -------------------- | -------------------- | ---------------------------------------------- | ------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **transactionsData** | [`string`, `Array`]  | The data of the transactions that will be used | _[]_    | [Transactions List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-transactions) |
| **accountsData**     | [`string` , `Array`] | data of the accounts that will be used         | _[]_    | [Accounts List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-accounts)         | (https://www.npmjs.com/package/open-banking-pfm-sdk#list-categories-with-subcategories) (filter accounts) |
| **categoriesData**   | [`string` , `Array`] | data of the categories that will be used       | _[]_    | [Categories List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-categories-with-subcategories)     |

## Customization Properties

| Name                             | Type                                                                                   | Description                                                                                                       | Default                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **isEmpty**                      | `boolean`                                                                              | Show the empty view in the component                                                                              | _false_                                                                  |
| **title**                        | `string`                                                                               | The custom text to be displayed in the title of the view                                                          | "Transações"                                                          |
| **titleShow**                    | [`string`, `boolean`]                                                                  | Show view title                                                                                                   | _true_                                                                   |
| **accountColumnText**            | `string`                                                                               | The custom text that will be displayed on the account column header                                               | "Conta"                                                                 |
| **accountColumnOrder**           | [`string`, `number`]                                                                   | Position number in the table of the account column                                                                | _1_                                                                      |
| **accountColumnShow**            | [`string`, `boolean`]                                                                  | Show account column                                                                                               | _true_                                                                   |
| **dateColumnText**               | `string`                                                                               | The custom text that will be displayed on the date column header                                                  | "Data"                                                                  |
| **dateColumnOrder**              | [`string`, `number`]                                                                   | Position number in the table of the date column                                                                   | _2_                                                                      |
| **dateColumnShow**               | [`string`, `boolean`]                                                                  | Show date column                                                                                                  | _true_                                                                   |
| **amountColumnText**             | `string`                                                                               | The custom text that will be displayed on the amount column header                                                | "Quantia"                                                                  |
| **amountColumnOrder**            | [`string`, `number`]                                                                   | Position number in the table of the amount column                                                                 | _3_                                                                      |
| **amountColumnShow**             | [`string`, `boolean`]                                                                  | Show amount column                                                                                                | _true_                                                                   |
| **descriptionColumnText**        | `string`                                                                               | The custom text that will be displayed on the description column header                                           | "Descrição"                                                            |
| **descriptionColumnOrder**       | [`string`, `number`]                                                                   | Position number in the table of the description column                                                            | _4_                                                                      |
| **descriptionColumnShow**        | [`string`, `boolean`]                                                                  | Show description column                                                                                           | _true_                                                                   |
| **categoryColumnText**           | `string`                                                                               | The custom text that will be displayed on the category column header                                              | "Categoria"                                                              |
| **categoryColumnOrder**          | [`string`, `number`]                                                                   | Position number in the table of the category column                                                               | _4_                                                                      |
| **categoryColumnShow**           | [`string`, `boolean`]                                                                  | Show category column                                                                                              | _true_                                                                   |
| **nameFieldLabel**               | `string`                                                                               | The custom text that will be displayed on the name field label                                                    | "Nome"                                                                 |
| **nameFieldOrder**               | [`string`, `number`]                                                                   | Position number in the form of the name field                                                                     | _1_                                                                      |
| **categoryFieldLabel**           | `string`                                                                               | The custom text that will be displayed on the category field label                                                | "Categoria"                                                              |
| **categoryFieldOrder**           | [`string`, `number`]                                                                   | Position number in the form of the category field                                                                 | _5_                                                                      |
| **subcategoryFieldLabel**        | `string`                                                                               | The custom text that will be displayed on the subcategory field label                                             | "Subcategoria"                                                           |
| **subcategoryFieldOrder**        | [`string`, `number`]                                                                   | Position number in the form of the subcategory field                                                              | _6_                                                                      |
| **ammountFieldLabel**            | `string`                                                                               | The custom text that will be displayed on the ammount field label                                                 | "Quantia"                                                                  |
| **ammountFieldOrder**            | [`string`, `number`]                                                                   | Position number in the form of the ammount field                                                                  | _3_                                                                      |
| **transactionTypeFieldLabel**    | `string`                                                                               | The custom text that will be displayed on the transaction type field label                                        | "Tipo de saldo"                                                          |
| **transactionTypeFieldOrder**    | [`string`, `number`]                                                                   | Position number in the form of the transaction type field                                                         | _4_                                                                      |
| **accountFieldLabel**            | `string`                                                                               | The custom text that will be displayed on the account field label                                                 | "Tipo de conta"                                                         |
| **accountFieldOrder**            | [`string`, `number`]                                                                   | Position number in the form of the account field                                                                  | _2_                                                                      |
| **dateFieldLabel**               | `string`                                                                               | The custom text that will be displayed on the date field label                                                    | "Data"                                                                  |
| **dateFieldOrder**               | [`string`, `number`]                                                                   | Position number in the form of the date field                                                                     | _7_                                                                      |
| **newTransactionTitle**          | `string`                                                                               | The custom text to be displayed in the title of the new transaction modal                                         | "Nova transação"                                                       |
| **newTransactionButton**         | `string`                                                                               | The custom text to display on the new transaction button                                                          | "Criar transação"                                                       |
| **editTransactionTitle**         | `string`                                                                               | The custom text to be displayed in the title of the edit transaction modal                                        | "Detalhe da transação"                                                  |
| **editTransactionButton**        | `string`                                                                               | The custom text to display on the edit transaction button                                                         | "Salvar"                                                        |
| **deletetTransactionButtonText** | `string`                                                                               | The custom text to display on the delete transaction button                                                       | "Apagar"                                                               |
| **newTransactionDisabled**       | [`string`, `boolean`]                                                                  | Disable the option to create transactions                                                                         | _false_                                                                  |
| **editTransactionDisabled**      | [`string`, `boolean`]                                                                  | Disable the option to edit transactions                                                                           | _false_                                                                  |
| **deleteTransactionDisabled**    | [`string`, `boolean`]                                                                  | Disable the option to delete transactions                                                                         | _false_                                                                  |
| **chargeText**                   | `string`                                                                               | The custom text that refers to the charges                                                                        | "Gasto"                                                                  |
| **debitText**                    | `string`                                                                               | The custom text that refers to the debits                                                                         | "Recebimento"                                                                |
| **searchPlaceholder**            | `string`                                                                               | The custom text to be displayed in the placeholder of the search transaction field                                | "Pesquisa de transação"                                                |
| **searchDebounceTime**           | [`string`, `number`]                                                                   | Time in milliseconds it takes to fire the search field event                                                      | _2000_                                                                   |
| **defaultFilterOptions**         | {caategoryId: `string`, subcategoryId: `string`, dateFrom: `string`, dateTo: `string`} | The default values for the filter modal                                                                           | _None_                                                                   |
| **filterDisabled**               | [`string`, `boolean`]                                                                  | Disable the option to filter transactions                                                                         | _false_                                                                  |
| **filterModalTitle**             | `string`                                                                               | The custom text to be displayed in the title of the filter transaction modal                                      | "Filtrado"                                                               |
| **cleanFilterButtonText**        | `string`                                                                               | The custom text to display on the clean filter button                                                             | "Filtros limpos"                                                        |
| **submitFilterButtonText**       | `string`                                                                               | The custom text to display on the submit filter button                                                            | "Aplicar filtros"                                                       |
| **predefinedDateFilterTitle**    | `string`                                                                               | The custom text to be displayed in the predefined date filter section                                             | "Data predefinida"                                                      |
| **customDateFilterTitle**        | `string`                                                                               | The custom text to be displayed in the custom date filter section                                                 | "Data personalizada"                                                    |
| **lastWeekButtonText**           | `string`                                                                               | The custom text to display on the last week button                                                                | "Semana Anterior"                                                          |
| **lastFifteenDaysButtonText**    | `string`                                                                               | The custom text to display on the last fifteen days button                                                        | "Últimos 15 días"                                                        |
| **lastThirtyDaysButtonText**     | `string`                                                                               | The custom text to display on the last thirty days button                                                         | "Últimos 30 días"                                                        |
| **emptyViewTitle**               | `string`                                                                               | The custom text to be displayed in the Title section of the Empty view (When there are no transactions) tab       | "Você não tem transações."                                                  |
| **emptyViewDescription**         | `string`                                                                               | The custom text to be displayed in the Description section of the Empty view (When there are no transactions) tab | "Ao registrar suas contas, você verá uma lista com todas as suas transações." |
| **emptyViewActionText**          | `string`                                                                               | The custom text to be displayed in the Action Button of the Empty view (When there are no transactions) tab       | "Adicionar transação"                                                       |
| **totalPages**                   | `number`                                                                               | The total pages in te transactions component                                                                      | 0                                                                        |
| **activePage**                   | `number`                                                                               | The current active page                                                                                           | 1                                                                        |
|                                  |                                                                                        |                                                                                                                   |                                                                          |

## Events

| Name                    | Description                                                 | Detail Data                                                     |
| ----------------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
| **component-mount**     | Triggers when the component is mounted                      | _None_                                                          |
| **component-unmount**   | Triggers when the component is unmounted                    | _None_                                                          |
| **field-change**        | Triggers when an transaction form field is changed          | {name: `string`, value: `string`}                               |
| **open-new-modal**      | Triggers when new transaction modal is opened               | _None_                                                          |
| **open-edit-modal**     | Triggers when edit transaction modal is opened              | _None_                                                          |
| **filter-field-change** | Triggers when the filter field is changed                   | {name: `string`, value: `string`}                               |
| **open-filter-modal**   | Triggers when filter transaction modal is opened            | _None_                                                          |
| **filter-trigger**      | Triggers when the filter is activated from the modal        | {...filterObject}                                               |
| **filter-text-trigger** | Triggers when the filter is activated from the search field | {...filterObject}                                               |
| **close-filter-modal**  | Triggers when the filter modal is closed                    | _None_                                                          |
| **clean-filter-modal**  | Triggers when the filter modal is closed                    | _None_                                                          |
| **close-new-modal**     | Triggers when new transaction modal is closed               | _None_                                                          |
| **close-edit-modal**    | Triggers when edit transaction modal is closed              | _None_                                                          |
| **save-edit**           | Triggers when edit modal form is submitted                  | {transaction: `object`, onSuccess: `void`, showToast: `void`}   |
| **save-new**            | Triggers when new modal form is submitted                   | {transaction: `object`, onSuccess: `void`, showToast: `void`}   |
| **delete**              | Triggers when delete button is clicked                      | {transactionId: `string`, onSuccess: `void`, showToast: `void`} |
| **click-page**          | Triggers when a page button is clicked                      | {page: `number`}                                                |
| **click-prev-page**     | Triggers when previous page button is clicked               | {page: `number`}                                                |
| **click-next-page**     | Triggers when next page button button is clicked            | {page: `number`}                                                |
|                         |                                                             |                                                                 |

# Categories Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component helps in managing categories.

![categorias](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/7ce74783-c278-40bf-ad06-a544005d4eb2)

## Installation

Download de *_ob-categories-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-categories-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-categories-component.js"></script>
```
  
```javascript
import './libs/ob-categories-component';
```

## How to use

```html
<ob-categories-component 
	categoriesData
></ob-categories-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name               | Type                 | Description                              | Default | SDK Function                                                                          |
| ------------------ | -------------------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| **categoriesData** | [`string` , `Array`] | data of the categories that will be used | _[]_    | [Categories List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-categories-with-subcategories) |

## Customization Properties

| Name                                         | Type                  | Description                                                                                   | Default                                                                         |
| -------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **cardMyCategoriesTitle**                    | `string`              | The custom text to be displayed in the title of the Own Categories Card                       | "Minhas categorias"                                                                |
| **categoriesTitle**                          | `string`              | The custom text to be displayed in the title of the view                                      | "Categorias"                                                                    |
| **categoryButtonText**                       | `string`              | The custom text that will go on the button whose action shows the details of the category     | "Detalhes"                                                                      |
| **deleteCategoryDisabled**                   | [`string`, `boolean`] | Delete Category action is disabled                                                            | _false_                                                                         |
| **deleteCategoryButtonText**                 | `string`              | The custom text to be displayed in the Delete Category button                                 | "Apagar categoria"                                                            |
| **deleteSubcategoryDisabled**                | [`string`, `boolean`] | Delete Subcategory action is disabled                                                         | _false_                                                                         |
| **deleteOwnCategoryDisabled**                | [`string`, `boolean`] | Delete Own Category action is disabled                                                        | _false_                                                                         |
| **deleteOwnCategoryButtonText**              | `string`              | The custom text to be displayed in the Delete own Category button                             | "Apagar categoria"                                                            |
| **deleteOwnSubategoryDisabled**              | [`string`, `boolean`] | Delete Own Subategory action is disabled                                                      | _false_                                                                         |
| **myCategoryButtonText**                     | `string`              | The custom text that will go on the button whose action shows the details of the own category | "Detalhes"                                                                      |
| **newCategoryModalButtonText**               | `string`              | The custom text to display on the submit button in the new category modal                     | "Salvar"                                                                       |
| **newCategoryModalInputColorPickerLabel**    | `string`              | The custom text to display on the Color Picker Label in the new category modal                | "Cor"                                                                         |
| **newCategoryModalInputLabel**               | `string`              | The custom text to display on the Name Field Label in the new category modal                  | "Nome"                                                                        |
| **newCategoryModalTitle**                    | `string`              | The custom text to display on the title of the new category modal                             | "Nova categoria"                                                               |
| **newSubCategoryModalButtonText**            | `string`              | The custom text to display on the submit button in the new subcategory modal                  | "Salvar"                                                                       |
| **newSubCategoryModalInputColorPickerLabel** | `string`              | The custom text to display on the Color Picker Label in the new subcategory modal             | "Cor da subcategoria"                                                      |
| **newSubCategoryModalInputLabel**            | `string`              | The custom text to display on the Name Field Label in the new subcategory modal               | "Nome da subcategoria"                                                     |
| **newSubCategoryModalTitle**                 | `string`              | The custom text to display on the title of the new category modal                             | "Nova subcategoría"                                                            |
| **detailsCategoryModalTitle**                | `string`              | The custom text to display on the title of the Category details modal                         | "Detalhes da categoria"                                                      |
| **detailsCategoryModalButtonText**           | `string`              | The custom text to display on the new subcategory button in the category details modal        | "Criar subcategoría"                                                            |
| **detailsCategoryModalSubCategoryText**      | `string`              | The custom text to be displayed in the subcategories title in the category details modal      | "Subcategorias"                                                                 |
| **confirmDeleteDialogTitle**                 | `string`              | The custom text to be displayed in the title of the Confirm Delete Dialog                     | "Aviso"                                                                   |
| **confirmDeleteDialogMessage**               | `string`              | The custom text to be displayed in the body of the Confirm Delete Dialog                      | "Tem certeza de que deseja apagar essa categoria? Esta ação é irreversível." |
| **confirmDeleteDialogNegativeButtonText**    | `string`              | The custom text to be displayed in the Negative Button of the Confirm Delete Dialog           | "Cancelar"                                                                      |
| **confirmDeleteDialogPositiveButtonText**    | `string`              | The custom text to be displayed in the Positive Button of the Confirm Delete Dialog           | "Eliminar"                                                                      |
| **editSubcategoryDisabled**                  | [`string`, `boolean`] | Edit Subcategory action is disabled                                                           | _false_                                                                         |
| **editOwnSubcategoryDisabled**               | [`string`, `boolean`] | Edit Own Subcategory action is disabled                                                       | _false_                                                                         |
| **editOwnCategoryDisabled**                  | [`string`, `boolean`] | Edit Own Category action is disabled                                                          | _false_                                                                         |
| **editOwnCategoryButtonText**                | `string`              | The custom text to display on the edit own category button                                    | "Editar Categoria"                                                              |
| **editCategoryDisabled**                     | [`string`, `boolean`] | Edit Category action is disabled                                                              | _false_                                                                         |
| **editCategoryButtonText**                   | `string`              | The custom text to display on the edit category button                                        | "Editar Categoria"                                                              |
| **editCategoryModalTitle**                   | `string`              | The custom text to display on the title of the edit category modal                            | "Editar Categoria"                                                              |
| **editSubCategoryModalTitle**                | `string`              | The custom text to display on the title of the edit subcategory modal                         | "Editar Subcategoria"                                                           |
|                                              |                       |                                                                                               |

## Events

| Name                            | Description                                                        | Detail Data                                                  |
| ------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| **component-mount**             | Triggers when the component is mounted                             | _None_                                                       |
| **component-unmount**           | Triggers when the component is unmounted                           | _None_                                                       |
| **open-new-modal**              | Triggers when new category modal is opened                         | _None_                                                       |
| **open-subcategory-new-modal**  | Triggers when new subcategory modal is opened                      | _None_                                                       |
| **open-detail-modal**           | Triggers when category detail modal is opened                      | category: `object`                                           |
| **close-new-modal**             | Triggers when new category modal is closed                         | _None_                                                       |
| **close-new-subcategory-modal** | Triggers when new subcategory modal is closed                      | _None_                                                       |
| **close-detail-modal**          | Triggers when category detail modal is closed                      | _None_                                                       |
| **field-change**                | Triggers when an category form field is changed                    | {name: `string`, value: `string`}                            |
| **click-random-colors**         | Triggers when the random color generation action button is clicked | colors: `Array`                                              |
| **click-color**                 | Triggers when an color option is clicked                           | color: `string`                                              |
| **back-modal**                  | Triggers when back button is clicked in the subcategory modal      | category: `object`                                           |
| **save-new-subcategory**        | Triggers when new subcategory modal form is submitted              | {category: `object`, onSuccess: `void`, showToast: `void`}   |
| **save-new**                    | Triggers when new category modal form is submitted                 | {category: `object`, onSuccess: `void`, showToast: `void`}   |
| **delete-category**             | Triggers when delete button is clicked in the category modal       | {categoryId: `string`, onSuccess: `void`, showToast: `void`} |
| **delete-own-category**         | Triggers when delete button is clicked in the category modal       | {categoryId: `string`, onSuccess: `void`, showToast: `void`} |
|                                 |                                                                    |                                                              |

# Budget Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component helps in managing and calculating budgets.

![bufgets](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/45779d73-3868-4743-b746-8609326af0e7)

## Installation

Download de *_ob-budget-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-budget-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-budget-component.js"></script>
```
  
```javascript
import './libs/ob-budget-component';
```

## How to use

Insert the html tag in your web application as follow.

```html
<ob-budget-component 
	budgetData 
	categoriesData
></ob-budget-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name               | Type                 | Description                               | Default | SDK Function                                                                          |
| ------------------ | -------------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| **budgetData**     | [`string`, `Array`]  | The data of the budgets that will be used | _[]_    | [Budgets List](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#list-budgets)  |
| **categoriesData** | [`string` , `Array`] | data of the categories that will be used  | _[]_    | [Categories List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-categories-with-subcategories) |

## Customization Properties

| Name                                      | Type      | Description                                                                                                             | Default                                                                           |
| ----------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **budgetTitle**                           | `string`  | The custom text to be displayed in the title of the view                                                                | "Limite de orçamentos"                                                                    |
| **budgetTotalTitle**                      | `string`  | The custom text to be displayed in the title of the Total budget section                                                | "Limite de orçamentos total"                                                               |
| **budgetModalFirstTitle**                 | `string`  | The custom text to be displayed in the first title of the new budget modal                                              | "Selecione uma categoria"                                                        |
| **budgetModalSecondTitle**                | `string`  | The custom text to be displayed in the second title of the new budget modal                                             | " ?", ? will be replaced by category's name                                        |
| **budgetModalDetailTitle**                | `string`  | The custom text to be displayed in the first title of the budget detail modal                                           | "Detalhes"                                                                         |
| **formCategoriesText**                    | `string`  | The custom text to display in the category section title in the new budget modal when a category has been selected      | "Categoria"                                                                       |
| **formSubcategoriesText**                 | `string`  | The custom text to display in the subcategories section title in the new budget modal when a category has been selected | "Subcategorias"                                                                   |
| **warningPercentage**                     | `number`  | The percentage where the budget status changes from stable to warning                                                   | _"70"_                                                                            |
| **budgetCardMessage**                     | `string`  | The custom text indicating the remaining budget                                                                         | "Por executar:"                                                                   |
| **formCreateButtonText**                  | `string`  | The custom text to display on the submit button in the new budget modal                                                 | "Criar limite orçamentário"                                                               |
| **formSaveButtonText**                    | `string`  | The custom text to display on the submit button in the edit budget modal                                                | "Salvar"                                                                 |
| **editButtonText**                        | `string`  | The custom text to be displayed in the edit button of the budget detail modal                                           | "Editar"                                                                          |
| **deleteButtonText**                      | `string`  | The custom text to be displayed in the delete button of the budget detail modal                                         | "Apagar"                                                                        |
| **confirmDeleteDialogTitle**              | `string`  | The custom text to be displayed in the title of the Confirm Delete Dialog                                               | "Aviso"                                                                     |
| **confirmDeleteDialogMessage**            | `string`  | The custom text to be displayed in the body of the Confirm Delete Dialog                                                | "Tem certeza de que deseja apagar esse limite orçamentário? Esta ação é irreversível." |
| **confirmDeleteDialogNegativeButtonText** | `string`  | The custom text to be displayed in the Negative Button of the Confirm Delete Dialog                                     | "Cancelar"                                                                        |
| **confirmDeleteDialogPositiveButtonText** | `string`  | The custom text to be displayed in the Positive Button of the Confirm Delete Dialog                                     | "Apagar"                                                                        |
| **isEmpty**                               | `boolean` | Show the empty view in the component                                                                                    | _false_                                                                           |
| **emptyViewTitle**                        | `string`  | The custom text to be displayed in the Title section of the Empty view (When there are no budgets)                      | "Você não possui limites orçamentários"                                                          |
| **emptyViewDescription**                  | `string`  | The custom text to be displayed in the Description section of the Empty view (When there are no budgets)                | "Novo limite orçamentário"                                                               |
| **emptyViewActionText**                   | `string`  | The custom text to be displayed in the Action Button of the Empty view (When there are no budgets)                      | "Clique para criar seus limites orçamentários"                                     |
|                                           |           |                                                                                                                         |

## Events

| Name                  | Description                                                       | Detail Data                                               |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| **component-mount**   | Triggers when the component is mounted                            | _None_                                                    |
| **component-unmount** | Triggers when the component is unmounted                          | _None_                                                    |
| **open-new-modal**    | Triggers when the new budget modal is opened                      | _None_                                                    |
| **open**              | Triggers when the budget detail modal is opened                   | budget: `object`                                          |
| **select-category**   | Triggers when a category is selected                              | category: `object`                                        |
| **field-change**      | Triggers when a budget form field is changed                      | {name: `string`, value: `string`}                         |
| **save-edit**         | Triggers when edit modal form is submitted                        | {budgets: `object`, onSuccess: `void`, showToast: `void`} |
| **save-new**          | Triggers when new modal form is submitted                         | {budgets: `object`, onSuccess: `void`, showToast: `void`} |
| **close-new-modal**   | Triggers when new budget modal is closed                          | _None_                                                    |
| **close-edit-modal**  | Triggers when edit budget modal is closed                         | _None_                                                    |
| **back-modal**        | Triggers when back button is clicked in the budget modal          | categories: `Array`                                       |
| **delete**            | Triggers when delete button is clicked in the budget detail modal | {budget: `object`, onSuccess: `void`, showToast: `void`}  |
| **edit**              | Triggers when edit button is clicked in the budget detail modal   | budget: `object`                                          |
|                       |                                                                   |                                                           |

# Summary Component

![Language](https://img.shields.io/badge/Language-HTML-red.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![Category](https://img.shields.io/badge/Category-WebComponents-blue.svg)

This component shows data in graphic charts.

![summary](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/ce9f9ded-d249-4de3-a543-3997986be97d)

## Installation

Download de *_ob-summary-component.js_* file from *_latest_* folder of [Open Banking SDK Web Components](https://github.com/ob-pfm/open-banking-sdk/blob/master/dist/latest/ob-summary-component.js)

Refer to this file from your local file system using script tag or import it to your web application.
```html
<script src="/libs/ob-summary-component.js"></script>
```
  
```javascript
import './libs/ob-summary-component';
```

## How to use

Insert the html tag in your web application as follow.

```html
<ob-summary-component 
	summaryData 
	categoriesData
></ob-summary-component>
```

## Data Properties

The [Open Banking SDK](https://www.npmjs.com/package/open-banking-pfm-sdk) is the data source of this component.

| Name               | Type                 | Description                               | Default                                    | SDK Function                                                                          |
| ------------------ | -------------------- | ----------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| **summaryData**    | [`string`, `Object`] | The data of the summary that will be used | _{incomes: [], expenses: [], balances:[]}_ | [Resume](httpshttps://www.npmjs.com/package/open-banking-pfm-sdk#resume)              |
| **categoriesData** | [`string` , `Array`] | data of the categories that will be used  | _[]_                                       | [Categories List](https://www.npmjs.com/package/open-banking-pfm-sdk#list-categories-with-subcategories) |

## Customization Properties

| Name                                          | Type      | Description                                                                                                                    | Default                                                                                                                                                    |
| --------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **analysisExpensesTableAverageTitle**         | `string`  | The custom text to display in the average column header of the analysis table of expenses                                      | "Média"                                                                                                                                                 |
| **analysisExpensesTableDescrTitle**           | `string`  | The custom text to display in the description column header of the analysis table of expenses                                  | "Descrição"                                                                                                                                              |
| **analysisExpensesTableNumTranTitle**         | `string`  | The custom text to display in the number of transactions column header of the analysis table of expenses                       | "Num. de transações"                                                                                                                                    |
| **analysisExpensesTableSubTitle**             | `string`  | The custom text to display in the subtitle of the analysis table of expenses                                                   | "Total"                                                                                                                                                    |
| **analysisExpensesTableTitle**                | `string`  | The custom text to display in the title of the analysis table of expenses                                                      | "Análise"                                                                                                                                                 |
| **analysisExpensesTableTotalTitle**           | `string`  | The custom text to display in the total column header of the analysis table of expenses                                        | "Total"                                                                                                                                                    |
| **analysisIncomesTableAmountTitle**           | `string`  | The custom text to display in the amount column header of the analysis table of incomes                                        | "Quantia"                                                                                                                                                    |
| **analysisIncomesTableCategoryTitle**         | `string`  | The custom text to display in the category column header of the analysis table of incomes                                      | "Categoria"                                                                                                                                                |
| **analysisIncomesTableConceptTitle**          | `string`  | The custom text to display in the concept column header of the analysis table of incomes                                       | "Conceito"                                                                                                                                                 |
| **analysisIncomesTableDateTitle**             | `string`  | The custom text to display in the date column header of the analysis table of incomes                                          | "Data"                                                                                                                                                    |
| **analysisIncomesTableSubTitle**              | `string`  | The custom text to display in the subtitle of the analysis table of incomes                                                    | "Total"                                                                                                                                                    |
| **analysisIncomesTableTitle**                 | `string`  | The custom text to display in the title of the analysis table of incomes                                                       | "Análisis"                                                                                                                                                 |
| **cardBalanceChartTitle**                     | `string`  | The custom text to display in the chart title on the balance section                                                           | "Selecione o mês"                                                                                                                            |
| **cardBalanceExpenseTitle**                   | `string`  | The custom text that will be displayed in the title of the expense card in the balance section                                 | "Gastos"                                                                                                                                                  |
| **cardBalanceIncomeTitle**                    | `string`  | The custom text that will be displayed in the title of the income card in the balance section                                  | "Recebimentos"                                                                                                                                                 |
| **cardBalanceTitle**                          | `string`  | The custom text that will be displayed in the title of the balance card in the balance section                                 | "Saldo"                                                                                                                                                    |
| **cardExpensesBarChartTitle**                 | `string`  | The custom text to display in the title of the bar chart in the expenses section                                               | "Selecione o mês"                                                                                                                            |
| **cardExpensesCatTableTitle**                 | `string`  | The custom text that will be displayed in the title of the categories table in the expenses section                            | "Gastos"                                                                                                                                                  |
| **cardExpensesDonChartTitle**                 | `string`  | The custom text to display in the title of the doughnut chart in the expense section                                           | ""                                                                                                                                                         |
| **cardExpensesSubcatTableTitle**              | `string`  | The custom text that will be displayed in the title of the subcategories table in the expenses section                         | "Detalhamento de gastos"                                                                                                                                       |
| **cardExpensesTotalTitle**                    | `string`  | The custom text to display in the title of the expense total card in the expense section                                       | "Total de gastos"                                                                                                                                             |
| **cardIncomesBarChartTitle**                  | `string`  | The custom text to display in the title of the bar chart in the incomes section                                                | "Selecione o mês"                                                                                                                            |
| **cardIncomesCatTableTitle**                  | `string`  | The custom text that will be displayed in the title of the categories table in the incomes section                             | "Detalhamento de recebimentos por categoria"                                                                                                                       |
| **cardIncomesDonChartTitle**                  | `string`  | The custom text to display in the title of the doughnut chart in the incomes section                                           | ""                                                                                                                                                         |
| **cardIncomesSubcatTableTitle**               | `string`  | The custom text that will be displayed in the title of the subcategories table in the incomes section                          | "Detalhamento de recebimentos"                                                                                                                                     |
| **cardIncomesTotalTitle**                     | `string`  | The custom text to display in the title of the total card in the incomes section                                               | "Total de recebimentos"                                                                                                                                            |
| **categoryExpensesTableAmountTitle**          | `string`  | The custom text to display in the total column header of the category table in the expenses section                            | "Quantia"                                                                                                                                                    |
| **categoryExpensesTableConceptTitle**         | `string`  | The custom text to display in the concept column header of the category table in the expenses section                          | "Conceito"                                                                                                                                                 |
| **categoryExpensesTableDetailTitle**          | `string`  | The custom text to display in the detail column header of the category table in the expenses section                           | "Detalhes"                                                                                                                                                 |
| **categoryExpensesTablePercentTitle**         | `string`  | The custom text to display in the percentage column header of the category table in the expenses section                       | "Porcentagem"                                                                                                                                               |
| **categoryIncomesTableAmountTitle**           | `string`  | The custom text to display in the total column header of the category table in the incomes section                             | "Quantia"                                                                                                                                                    |
| **categoryIncomesTableConceptTitle**          | `string`  | The custom text to display in the concept column header of the category table in the incomes section                           | "Conceito"                                                                                                                                                 |
| **categoryIncomesTableDetailTitle**           | `string`  | The custom text to display in the detail column header of the category table in the incomes section                            | "Detalhes"                                                                                                                                                 |
| **categoryIncomesTablePercentTitle**          | `string`  | The custom text to display in the percentage column header of the category table in the incomes section                        | "Porcentagem"                                                                                                                                               |
| **expensesBarChartColor**                     | `string`  | The color of the bar chart in the expenses section                                                                             | _"#F89A9A"_                                                                                                                                                       |
| **expensesBarChartSelectedColor**             | `string`  | The color of the bar chart selected in the expenses section                                                                    | _"#BC7474"_                                                                                                                                                       |
| **iconExpensesAnalysisTooltip**               | `string`  | The custom text that will be displayed on the tooltip of the analysis button of the category table in the expenses section     | "Análise"                                                                                                                                                 |
| **iconExpensesTransactionTooltip**            | `string`  | The custom text that will be displayed on the tooltip of the transactions button of the category table in the expenses section | "Transacciones"                                                                                                                                            |
| **iconIncomesAnalysisTooltip**                | `string`  | The custom text that will be displayed on the tooltip of the analysis button of the category table in the incomes section      | "Análise"                                                                                                                                                 |
| **iconIncomesTransactionTooltip**             | `string`  | The custom text that will be displayed on the tooltip of the transactions button of the category table in the incomes section  | "Movimentos"                                                                                                                                            |
| **incomesBarChartColor**                      | `string`  | The color of the bar chart in the incomes section                                                                              | _"#3FD8AF"_                                                                                                                                                       |
| **incomesBarChartSelectedColor**              | `string`  | TThe color of the bar chart selected in the incomes section                                                                    | _"#21866B"_                                                                                                                                                       |
| **subcategoryExpensesTableAmountTitle**       | `string`  | The custom text to display in the total column header of the subcategory table in the expenses section                         | "Quantia"                                                                                                                                                    |
| **subcategoryExpensesTableConceptTitle**      | `string`  | The custom text to display in the concept column header of the subcategory table in the expenses section                       | "Conceito"                                                                                                                                                 |
| **subcategoryExpensesTableTransactionsTitle** | `string`  | The custom text to display in the transactions column header of the subcategory table in the expenses section                  | "Movimentos"                                                                                                                                            |
| **subcategoryExpensesTablePercentTitle**      | `string`  | The custom text to display in the percentage column header of the category table in the expenses section                       | "Porcentagem"                                                                                                                                               |
| **subcategoryIncomesTableAmountTitle**        | `string`  | The custom text to display in the total column header of the subcategory table in the incomes section                          | "Quantia"                                                                                                                                                    |
| **subcategoryIncomesTableConceptTitle**       | `string`  | The custom text to display in the concept column header of the subcategory table in the incomes section                        | "Conceito"                                                                                                                                                 |
| **subcategoryIncomesTableTransactionsTitle**  | `string`  | The custom text to display in the transactions column header of the subcategory table in the incomes section                   | "Movimentos"                                                                                                                                            |
| **subcategoryIncomesTablePercentTitle**       | `string`  | The custom text to display in the percentage column header of the category table in the incomes section                        | "Porcentagem"                                                                                                                                               |
| **summaryTitle**                              | `string`  | The custom text that will be displayed on the main component title                                                             | "Resumo"                                                                                                                                                  |
| **tabBalanceTitle**                           | `string`  | The custom text that will be displayed on the balance tab                                                                      | "Saldo"                                                                                                                                                  |
| **tabExpensesTitle**                          | `string`  | The custom text that will be displayed on the expenses tab                                                                     | "Gastos"                                                                                                                                                   |
| **tabIncomesTitle**                           | `string`  | The custom text that will be displayed on the incomes tab                                                                      | "Recebimentos"                                                                                                                                                 |
| **isEmpty**                                   | `boolean` | Show the empty view in the component                                                                                           | _false_                                                                                                                                                    |
| **emptyViewTitle**                            | `string`  | The custom text to be displayed in the Title section of the Empty view (When the summary is not available) tab                 | "Bem-vindo ao seu resumo de gastos"                                                                                                                        |
| **emptyViewDescription**                      | `string`  | The custom text to be displayed in the Description section of the Empty view (When the summary is not available) tab           | "Quando você autorizar uma nova conta bancária ou quando registrar seus movimentos financeiros dos últimos 6 meses, você verá aqui um resumo gráfico dos seus gastos por categoria." |
| **emptyViewActionText**                       | `string`  | The custom text to be displayed in the Action Button of the Empty view (When the summary is not available) tab                 | "Agregar conta"                                                                                                                                           |
|                                               |           |                                                                                                                                |                                                                                                                                                            |

## Events

| Name                                 | Description                                                    | Detail                              | Data   |
| ------------------------------------ | -------------------------------------------------------------- | ----------------------------------- | ------ |
| **component-mount**                  | Triggers when the component is mounted                         | _None_                              |
| **component-unmount**                | Triggers when the component is unmounted                       | _None_                              |
| **tab-click**                        | Triggers when a tab is selected                                | {summary: `object`}                 |
| **bar-chart-click**                  | Triggers when the bar chart is clicked                         | object                              |
| **doughnut-chart-subcategory-click** | Triggers when the doughnut chart of the subcategory is clicked | {summary: `object`}                 |
| **doughnut-chart-click**             | Triggers when the doughnut chart is clicked                    | {type: `string`, summary: `object`} |
| **subcategory-detail-click**         | Triggers when the subcategory´s right arrow button is clicked  | {summary: `object`, date: `number   | Date`} |
| **category-detail-click**            | Triggers when the category´s right arrow button is clicked     | {summary: `object`, type: `string`} |
| **transactions-detail-back**         | Triggers when the transaction´s left arrow button is clicked   | _None_                              |
| **analysis-click**                   | Triggers when subcategory´s analysis button is clicked         | {analysis: `array`}                 |
| **modal-analysis-open**              | Triggers when edit analysis modal is opened                    | _None_                              |
| **modal-analysis-close**             | Triggers when new analysis modal is closed                     | _None_                              |
| **empty-button-click**               | Triggers when action button in empty view is clicked           | _None_                              |
|                                      |                                                                |                                     |

# Theme Colors

The theme colors can be changed from the component properties.

- **primaryColor:** The default value is _#3FD8AF._
- **primaryColor10:** The default value is _#2EC4A3._
- **primaryColor20:** The default value is _#29AE94._
- **primaryColor40:** The default value is _#1F8374._
- **primaryColor60:** The default value is _#155850._
- **secondaryColor:** The default value is _#00113d._
- **secondaryColor2:** The default value is _#6072F1._
- **secondaryColor3:** The default value is _#F09468._
- **secondaryColor4:** The default value is _#989DB3._
- **accentColor:** The default value is _#C84AF2._
- **neutralColor:** The default value is _#FFF._
- **neutralColor05:** The default value is _#F1F2F5._
- **neutralColor10:** The default value is _#E3E5EB._
- **neutralColor20:** The default value is _#8C94AE._
- **neutralColor40:** The default value is _#989DB3._
- **neutralColor60:** The default value is _#656E8D._
- **neutralColor80:** The default value is _#333F65._
- **neutralColor100:** The default value is _#CACDD9._
- **neutralColor120:** The default value is _#F5F5F5._
- **intenseColor:** The default value is _linear-gradient(270deg, #33D9BF 0%, #00AABC 100%)._
- **chargeColor:** The default value is _#F35757._
- **debitColor:** The default value is _#3FD8AF._
- **expenseColor:** The default value is _#F89A9A._
- **incomeBarSelColor:** The default value is _#21866B._
- **expenseBarSelColor:** The default value is _#BC7474._
- **expenseBgColor:** The default value is _#FCECEC._
- **bgPrimary:** The default value is _#EFFCF8._

# Global components

These elements are used in several of our web components. Overriding the style via the classname is required for customization.

- [Button Component](#button-component)
- [Card Component](#card-component)
- [Checkbox Component](#checkbox-component)
- [Collapsible Container Component](#collapsible-container-component)
- [Color Option Component](#color-option-component)
- [Confirm Dialog Component](#confirm-dialog-component)
- [Dropdown Component](#dropdown-component)
- [Empty View Component](#empty-view-component)
- [Icon Button Component](#icon-button-component)
- [Loading Modal Component](#loading-modal-component)
- [Loading Spinner Component](#loading-spinner-component)
- [Modal Component](#modal-component)
- [Options Field Component](#options-field-component)
- [Search Field Component](#search-field-component)
- [Select Field Component](#select-field-component)
- [Sidebar Modal Component](#sidebar-modal-component)
- [Switch Component](#switch-component)
- [Tab Menu Component](#tab-menu-component)
- [Text Field Component](#text-field-component)
- [Title Component](#title-component)
- [Toast Component](#toast-component)

## **`Button Component`**

---

This component represents a button that contains only text and performs a specific action such as submitting a form. It can be presented in different styles depending on the variant used. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- `ob-summary-component`
- 
![1](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/01b5c38a-4b74-47e6-a8f0-e03ea649fc22)

The component structure is:

```html
<button class="opwc-button">
  <div class="opwc-button__hover-drop">...</div>
  <span class="opwc-button__text">...</span>
</button>
```

| ClassName                 | Element    | Description                                | Variants                                                                                                        |
| ------------------------- | ---------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `opwc-button`             | **Button** | It is the main ClassName                   | [`--danger`, `--danger-outline`, `--light`, `--light-black`, `--outline`, `--rounded`, `--solid`, `--disabled`] |
| `opwc-button__hover-drop` | **Div**    | Refers to the 'hover' effect of the button | _None_                                                                                                          |
| `opwc-button__text`       | **Span**   | Refers to the button text                  | _None_                                                                                                          |
|                           |            |                                            |

## **`Card Component`**

---

Cards are used to display content made up of different types of objects. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-summary-component`
- 
![2](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/a7dac85c-1510-4b4b-acf7-21401cc7bcba)

The component structure is:

```html
<div class="opwc-card">...</div>
```

| ClassName   | Element | Description              | Variants |
| ----------- | ------- | ------------------------ | -------- |
| `opwc-card` | **Div** | It is the main ClassName | _None_   |
|             |         |                          |          |

## **`Checkbox Component`**

---

Element that allows to inform about the acceptance of the option that is linked to it. This component is used by `ob-accounts-component` web component.

![3](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/c4bf7f2a-ea31-441c-8d59-b57be253d00c)

The component structure is:

```html
<button class="opwc-checkbox__container">
  <div class="opwc-checkbox">
    <svg class="opwc-checkbox__icon">...</svg>
  </div>
  <span class="opwc-button__label">...</span>
</button>
```

| ClassName                                             | Element  | Description                  | Variants                     |
| ----------------------------------------------------- | -------- | ---------------------------- | ---------------------------- |
| `opwc-checkbox`                                       | **Div**  | It is the main ClassName     | [ `--checked`, `--disabled`] |
| `opwc-checkbox__container`                            | **Div**  |
| Refers to the container of the checkbox and the label | _None_   |
| `opwc-checkbox__icon`                                 | **Svg**  | Refers to the check icon     | _None_                       |
| `opwc-checkbox__label`                                | **Span** | Refers to the checkbox label | _None_                       |
|                                                       |          |                              |                              |

## **`Collapsible Container Component`**

---

The Collapsible COntainer are used to show or hide content. This component is used by `ob-accounts-component` web component.

![4](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/0bd7bba9-1edb-47bf-a89d-7e88eedd4417)

The component structure is:

```html
<div class="opwc-collapsible-container">...</div>
```

| ClassName                    | Element | Description              | Variants |
| ---------------------------- | ------- | ------------------------ | -------- |
| `opwc-collapsible-container` | **Div** | It is the main ClassName | _None_   |
|                              |         |                          |

## **`Color Option Component`**

---

Cards are used to display content made up of different types of objects. This component is used by next web components:

- `ob-budget-component`
- `ob-categories-component`
- 
![5](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/d7233df5-eda3-4107-80f8-11dff46090c8)

The component structure is:

```html
<div class="opwc-color-option">...</div>
```

| ClassName           | Element | Description              | Variants                                          |
| ------------------- | ------- | ------------------------ | ------------------------------------------------- |
| `opwc-color-option` | **Div** | It is the main ClassName | [ `--is-selected`, `--with-shadow`, `--disabled`] |
|                     |         |                          |

## **`Confirm Dialog Component`**

---

A modal that displays a warning message and requires confirmation of the action via button interaction. This component is used by next web components:

- `ob-budget-component`
- `ob-categories-component`

![6](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/4acba20d-01e2-4f16-886c-1ead77fd54cd)

The component structure is:

```html
<div class="opwc-confirm-dialog__background">
  <div class="opwc-confirm-dialog">
    <h2 class="opwc-confirm-dialog__title">...</h2>
    <div class="opwc-confirm-dialog__close-button">...</div>
    <p class="opwc-confirm-dialog__message">...</p>
    <div class="opwc-confirm-dialog__buttons-container">
      <button class="opwc-confirm-dialog__cancel-button">...</button>
      <button class="opwc-confirm-dialog__confirm-button">...</button>
    </div>
  </div>
</div>
```

| ClassName                                | Element                                   | Description                                                 | Variants |
| ---------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | -------- |
| `opwc-confirm-dialog`                    | **Div**                                   | It is the main ClassName                                    | _None_   |
| `opwc-confirm-dialog__background`        | **Div**                                   | It is the translucent background that goes behind the modal | _None_   |
| `opwc-confirm-dialog__title`             | **H2**                                    | It is the title text                                        | _None_   |
| `opwc-confirm-dialog__close-button`      | **Div**                                   | It is the Close Button and contains the close icon          | _None_   |
| `opwc-confirm-dialog__message`           | **P**                                     | It is the message to display                                | _None_   |
| `opwc-confirm-dialog__buttons-container` | **Div**                                   | Contains the action buttons                                 | _None_   |
| `opwc-confirm-dialog__cancel-button`     | **[Button Component](#button-component)** | It is the cancel action button                              | _None_   |
| `opwc-confirm-dialog__confirm-button`    | **[Button Component](#button-component)** | It is the confirm action button                             | _None_   |
|                                          |                                           |                                                             |

## **`Dropdown Component`**

---

Shows a dropdown list when interacting with it. This component is used by `ob-transactions-component` web component.

![image](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/5c958295-2538-47da-b03a-3111306cd8ee)

The component structure is:

```html
<div class="opwc-dropdown">
  <label class="opwc-dropdown__label">...</label>
  <div class="opwc-dropdown__container">
    <div class="opwc-dropdown-selected-item">
      <div class="opwc-dropdown-selected-item__icon-container">...</div>
      <span class="opwc-dropdown-selected-item__text">...</span>
      <svg class="opwc-dropdown-selected-item__arrow-icon">...</svg>
    </div>
    <div class="opwc-dropdown__menu">
      <div class="opwc-dropdown__item">
        <div class="opwc-dropdown__icon-container">...</div>
        <span class="opwc-dropdown__item-text">...</span>
      </div>
    </div>
  </div>
</div>
```

| ClassName                                     | Element   | Description                                       | Variants                          |
| --------------------------------------------- | --------- | ------------------------------------------------- | --------------------------------- |
| `opwc-dropdown`                               | **Div**   | It is the main ClassName                          | _None_                            |
| `opwc-dropdown__label`                        | **Label** | Refers to the dropdown label                      | _None_                            |
| `opwc-dropdown__container`                    | **Div**   | Contains the dropdown elements                    | _None_                            |
| `opwc-dropdown__menu`                         | **Div**   | Contains the dropdown list items                  | _None_                            |
| `opwc-dropdown__item`                         | **Div**   | Refers to the list item                           | [ `--selected`]                   |
| `opwc-dropdown__icon-container`               | **Div**   | Refers to the icon container of the list item     | _None_                            |
| `opwc-dropdown__item-text`                    | **Span**  | Refers to the text of the list item               | [ `--with-icon`]                  |
| `opwc-dropdown-selected-item`                 | **Div**   | Refers to the selected item of the dropdown       | [ `--no-clickable`, `--disabled`] |
| `opwc-dropdown-selected-item__text`           | **Span**  | Refers to the text of the selected item           | [ `--with-icon`, `--placeholder`] |
| `opwc-dropdown-selected-item__arrow-icon`     | **Svg**   | Refers to the arrow icon of the selected item     | _None_                            |
| `opwc-dropdown-selected-item__icon-container` | **Div**   | Refers to the icon container of the selected item | _None_                            |
|                                               |           |                                                   |

## **`Empty View Component`**

---

This view appears when you have no items to display. This component is used by next web components:

- `ob-budget-component`
- `ob-transactions-component`
- `ob-summary-component`
- 
![7](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/f925232d-ea41-4e5a-8b53-4e7ba2ffca5b)

The component structure is:

```html
<div class="opwc-empty-view">
  <div class="opwc-empty-view__container">
    <div class="opwc-empty-view__image-container">...</div>
    <span class="opwc-empty-view__title">...</span>
    <span class="opwc-empty-view__description">...</span>
    <button class="opwc-empty-view__button">...</button>
  </div>
</div>
```

| ClassName                          | Element                                   | Description                       | Variants |
| ---------------------------------- | ----------------------------------------- | --------------------------------- | -------- |
| `opwc-empty-view`                  | **Div**                                   | It is the main ClassName          | _None_   |
| `opwc-empty-view__container`       | **Div**                                   | Contains the elements of the view | _None_   |
| `opwc-empty-view__image-container` | **Div**                                   | Contains the image                | _None_   |
| `opwc-empty-view__title`           | **Span**                                  | It is the title                   | _None_   |
| `opwc-empty-view__description`     | **Span**                                  | It is the description text        | _None_   |
| `opwc-empty-view__button`          | **[Button Component](#button-component)** | Refers to the action button       | _None_   |
|                                    |                                           |                                   |

## **`Icon Button Component`**

---

This component represents a button that can only contain one icon and performs a specific action. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- `ob-summary-component`
- 
![8](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/4287f9d8-194b-4d93-9bce-e315d66fc117)

The component structure is:

```html
<div class="opwc-icon-button">
  <div class="opwc-icon-button__hover-drop">...</div>
  <span class="opwc-icon-button__tooltip">...</span>
</div>
```

| ClassName                      | Element    | Description                                | Variants                                               |
| ------------------------------ | ---------- | ------------------------------------------ | ------------------------------------------------------ |
| `opwc-icon-button`             | **Button** | It is the main ClassName                   | [`--danger`, `--gray`, `--with-tooltip`, `--disabled`] |
| `opwc-icon-button__hover-drop` | **Div**    | Refers to the 'hover' effect of the button | _None_                                                 |
| `opwc-icon-button__tooltip`    | **Span**   | Refers to the button tooltip               | _None_                                                 |
|                                |            |                                            |

## **`Loading Modal Component`**

---

A modal with a Spinner view used to render processes. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- `ob-summary-component`


![9](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/d0e1cb7e-d13c-440c-bcb2-a3f8b0f8dfad)

The component structure is:

```html
<div class="opwc-loading-modal">
    <img class="opwc-loading-spinner">...</img>
</div>
```

| ClassName              | Element                                                     | Description                | Variants |
| ---------------------- | ----------------------------------------------------------- | -------------------------- | -------- |
| `opwc-loading-modal`   | **[Modal Component](#modal-component)**                     | It is the main ClassName   | _None_   |
| `opwc-loading-spinner` | **[Loading Spinner Component](#loading-spinner-component)** | Refers to the Spinner view | _None_   |
|                        |                                                             |                            |

## **`Loading Spinner Component`**

---

It is a Spinner view used to represent processes. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- `ob-summary-component`
- 
![9](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/a13a4cf4-cc3e-40ab-9984-00561d466577)

The component structure is:

```html
<img class="opwc-loading-spinner">
    ...
</img>
```

| ClassName              | Element | Description              | Variants |
| ---------------------- | ------- | ------------------------ | -------- |
| `opwc-loading-spinner` | **Img** | It is the main ClassName | _None_   |
|                        |         |                          |

## **`Modal Component`**

---

It is a popup window that can contain different objects such as forms or tables. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- `ob-summary-component`

![13](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/db849f37-05d2-4a6c-bfa8-4860e546828e)

The component structure is:

```html
<div class="opwc-modal__background">
  <div class="opwc-modal">
    <div class="opwc-modal__back-icon">...</div>
    <h2 class="opwc-modal__title">...</h2>
    <div class="opwc-modal__close-button">...</div>
    ...
  </div>
</div>
```

| ClassName                | Element | Description                                                     | Variants |
| ------------------------ | ------- | --------------------------------------------------------------- | -------- |
| `opwc-modal`             | **Div** | It is the main ClassName                                        | _None_   |
| `opwc-modal__background` | **Div** | Refers to the translucent background that goes behind the modal | _None_   |
| `opwc-modal__back-icon`  | **Div** | Contains the back icon                                          | _None_   |
| `opwc-modal__title`      | **H2**  | Refers to the title of the modal                                | _None_   |
| `opwc-modal__close-icon` | **Div** | Contains the close icon                                         | _None_   |
|                          |         |                                                                 |

## **`Options Field Component`**

---

Displays a series of options from which only one can be selected. It is commonly used in forms. This component is used by next web components:

- `ob-accounts-component`
- `ob-transactions-component`

![2](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/2790defe-8e02-475d-be1c-2540862be64b)

The component structure is:

```html
<div class="opwc-options-field">
    <label class="opwc-options-field__label">...</label>
    <div class="opwc-options-field__container">
        <div class="opwc-options-field__item">
            <input class="opwc-options-field__radio-input">...</input>
            <label class="opwc-options-field__radio-label">...</label>
        </div>
    </div>
</div>
```

| ClassName                         | Element   | Description                                  | Variants    |
| --------------------------------- | --------- | -------------------------------------------- | ----------- |
| `opwc-options-field`              | **Div**   | It is the main ClassName                     | _None_      |
| `opwc-options-field__label`       | **Label** | Refers to the field label                    | _None_      |
| `opwc-options-field__container`   | **Div**   | Contains the option items                    | _None_      |
| `opwc-options-field__item`        | **Div**   | Refers to the option item                    | _None_      |
| `opwc-options-field__radio-input` | **Input** | Refers to the radio input of the option item | `--checked` |
| `opwc-options-field__radio-label` | **Label** | Refers to the label of the option item       | _None_      |
|                                   |           |                                              |

## **`Search Field Component`**

---

Text field used for searching. This component is used by `ob-transactions-component` web component.

![10](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/b4741743-b25a-45a7-835c-a236857df879)

The component structure is:

```html
<div class="opwc-search-field">
    <div class="opwc-search-field__container">
        <svg class="opwc-search-field__icon">...</svg>
        <input class="opwc-search-field__input">...</input>
    </div>
</div>
```

| ClassName                      | Element   | Description                                        | Variants     |
| ------------------------------ | --------- | -------------------------------------------------- | ------------ |
| `opwc-search-field`            | **Div**   | It is the main ClassName                           | _None_       |
| `opwc-search-field__container` | **Div**   | Contains the field an the icon of the search field | _None_       |
| `opwc-search-field__icon`      | **Svg**   | Refers to the Search icon in the field             | _None_       |
| `opwc-search-field__input`     | **Input** | Refers to Search type input                        | `--disabled` |
|                                |           |                                                    |

## **`Select Field Component`**

---

This is a field that displays a single selection list. It is commonly used in forms. This component is used by next web components:

- `ob-accounts-component`
- `ob-transactions-component`

![11](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/bb0010ef-3074-4431-b2ec-ae1d78dfda34)

The component structure is:

```html
<div class="opwc-select-field">
  <label class="opwc-select-field__label">...</label>
  <div class="opwc-select-field__container">
    <div class="opwc-selected-item">
      <div class="opwc-selected-item__icon-container">...</div>
      <span class="opwc-selected-item__text">...</span>
      <svg class="opwc-selected-item__arrow-icon">...</svg>
    </div>
    <div class="opwc-select-field__menu">
      <div class="opwc-select-field__item">
        <div class="opwc-select-field__icon-container">...</div>
        <span class="opwc-select-field__item-text">...</span>
      </div>
    </div>
  </div>
</div>
```

| ClassName                            | Element   | Description                                       | Variants                          |
| ------------------------------------ | --------- | ------------------------------------------------- | --------------------------------- |
| `opwc-select-field`                  | **Div**   | It is the main ClassName                          | _None_                            |
| `opwc-select-field__label`           | **Label** | Refers to the dropdown label                      | _None_                            |
| `opwc-select-field__container`       | **Div**   | Contains the dropdown elements                    | _None_                            |
| `opwc-select-field__menu`            | **Div**   | Contains the dropdown list items                  | _None_                            |
| `opwc-select-field__item`            | **Div**   | Refers to the list item                           | [ `--selected`]                   |
| `opwc-select-field__icon-container`  | **Div**   | Refers to the icon container of the list item     | _None_                            |
| `opwc-select-field__item-text`       | **Span**  | Refers to the text of the list item               | [ `--with-icon`]                  |
| `opwc-selected-item`                 | **Div**   | Refers to the selected item of the dropdown       | [ `--no-clickable`, `--disabled`] |
| `opwc-selected-item__text`           | **Span**  | Refers to the text of the selected item           | [ `--with-icon`, `--placeholder`] |
| `opwc-selected-item__arrow-icon`     | **Svg**   | Refers to the arrow icon of the selected item     | _None_                            |
| `opwc-selected-item__icon-container` | **Div**   | Refers to the icon container of the selected item | _None_                            |
|                                      |           |                                                   |

## **`Sidebar Modal Component`**

---

It is a pop-up window that is displayed from the right of the screen and can contain different objects such as forms. This component is used by next web components:

- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`

![1](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/bc1df911-f8f6-4215-ba35-98910356b06a)

The component structure is:

```html
<div class="opwc-sidebar-modal__background">
  <div class="opwc-sidebar-modal">
    <div class="opwc-sidebar-modal__header">
      <div class="opwc-sidebar-modal__back-icon">...</div>
      <h2 class="opwc-sidebar-modal__title">...</h2>
      <div class="opwc-sidebar-modal__close-button">...</div>
    </div>
    <div class="opwc-sidebar-modal__body">...</div>
  </div>
</div>
```

| ClassName                        | Element | Description                                                     | Variants |
| -------------------------------- | ------- | --------------------------------------------------------------- | -------- |
| `opwc-sidebar-modal`             | **Div** | It is the main ClassName                                        | _None_   |
| `opwc-sidebar-modal__background` | **Div** | Refers to the translucent background that goes behind the modal | _None_   |
| `opwc-sidebar-modal__header`     | **Div** | Contains the title and the close actions of the modal           | _None_   |
| `opwc-sidebar-modal__back-icon`  | **Div** | Contains the back icon                                          | _None_   |
| `opwc-sidebar-modal__title`      | **H2**  | Refers to the title of the modal                                | _None_   |
| `opwc-sidebar-modal__close-icon` | **Div** | Contains the close icon                                         | _None_   |
| `opwc-sidebar-modal__body`       | **Div** | Contains the body of the modal                                  | _None_   |
|                                  |         |                                                                 |

## **`Switch Component`**

---

It is special checkbox used for binary states like on/off. This component is used by `ob-transactions-component` web component.

![14](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/edb08ac7-8428-4b18-8adc-45f8672ca4a7)

The component structure is:

```html
<div class="opwc-switch">
  <span class="opwc-switch__slider">...</span>
</div>
```

| ClassName             | Element  | Description               | Variants                    |
| --------------------- | -------- | ------------------------- | --------------------------- |
| `opwc-switch`         | **Div**  | It is the main ClassName  | [`--checked`, `--disabled`] |
| `opwc-switch__slider` | **Span** | Refers to the toggle view | _None_                      |
|                       |          |                           |

## **`Tab Menu Component`**

---

The tab structure consists of an unordered list of tabs that display content when one of them is activated. This component is used by `ob-summary-component` web component.

![16](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/a223f755-0e3f-4248-a623-c53be3b8d908)

The component structure is:

```html
<ul class="opwc-tab-list">
  <li class="opwc-tab">
    <span class="opwc-tab__title">...</span>
  </li>
  <div class="opwc-tab-list_container">...</div>
</ul>
```

| ClassName                  | Element  | Description                              | Variants   |
| -------------------------- | -------- | ---------------------------------------- | ---------- |
| `opwc-tab-list`            | **Ul**   | It is the main ClassName                 | _None_     |
| `opwc-tab-list__container` | **Div**  | Contains the active tab content          | _None_     |
| `opwc-tab`                 | **Li**   | Refers to the tab view                   | `--danger` |
| `opwc-tab__title`          | **Span** | Refers to the title text of the tab view | _None_     |
|                            |          |                                          |

## **`Text Field Component`**

---

Text field used in forms. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- 
![15](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/7f60e95d-950b-4ae9-900f-020b9ccf2876)

The component structure is:

```html
<div class="opwc-text-field">
    <label class="opwc-text-field__label">...</label>
    <div class="opwc-text-field__container">
        <svg class="opwc-text-field__calendar-icon">...</svg>
        <div class="opwc-text-field__icon-container">...</div>
        <input class="opwc-text-field__input">...</input>
    </div>

</div>
```

| ClassName                         | Element   | Description                                           | Variants                             |
| --------------------------------- | --------- | ----------------------------------------------------- | ------------------------------------ |
| `opwc-text-field`                 | **Div**   | It is the main ClassName                              | _None_                               |
| `opwc-text-field__label`          | **Label** | Refers to the field label                             | _None_                               |
| `opwc-text-field__container`      | **Div**   | Contains the input and the icon of the field          | _None_                               |
| `opwc-text-field__calendar-icon`  | **Svg**   | Refers to the Calendar icon when input type is 'Date' | _None_                               |
| `opwc-text-field__icon-container` | **Div**   | Contains the append icon                              | _None_                               |
| `opwc-text-field__input`          | **Input** | Refers to the input element                           | [`--with-append-icon`, `--disabled`] |
|                                   |           |                                                       |

## **`Title Component`**

---

Shows a text as a title. This component is used by next web components:

- `ob-accounts-component`
- `ob-budget-component`
- `ob-categories-component`
- `ob-transactions-component`
- `ob-summary-component`

![18](https://github.com/Finerio-Connect/pfm-brazil-demo/assets/100369880/1bb4b84a-0341-4676-81c9-586ba2f267ac)

The component structure is:

```html
<h1 class="opwc-title">...</h1>
```

| ClassName    | Element | Description              | Variants |
| ------------ | ------- | ------------------------ | -------- |
| `opwc-title` | **H1**  | It is the main ClassName | _None_   |
|              |         |                          |
