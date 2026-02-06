# COFFEE-PAY SDK for Node.js

Node.js SDK to integrate with the **COFFEE-PAY** payment gateway easily and securely using TypeScript/JavaScript.

[![npm version](https://img.shields.io/npm/v/coffee-pay-sdk)](https://www.npmjs.com/package/coffee-pay-sdk)
[![license](https://img.shields.io/npm/l/coffee-pay-sdk)](https://github.com/coffee-pay/sdk-nodejs/blob/main/LICENSE)

---

## ✨ Features

- 🔐 **Automatic JWT Authentication**: Handles `apiKey` and `apiSecret` encryption automatically.
- 🧾 **Subscription Management**: Full CRUD support for subscription plans.
- 🛡️ **Web Signing Utilities**: Easy signature generation for secure web payment buttons.
- 🧠 **Fully Typed**: Built with TypeScript for excellent developer experience.
- ⚙️ **Modern**: Compatible with Node.js v18+.

---

## 📦 Installation

```bash
npm install coffee-pay-sdk
# or
yarn add coffee-pay-sdk
```

---

## 🚀 Quick Start

### 1. Initialize the Client

The SDK automatically handles JWT token generation (valid for 30s) for every request.

```typescript
import { CoffeeSDK } from 'coffee-pay-sdk';

const coffee = new CoffeeSDK({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
  // baseUrl: 'https://staging.coffee-pay.co/api/v1' // Optional: default is production
});
```

### 2. Manage Subscription Plans (CRUD)

```typescript
// List plans
const plans = await coffee.subscriptionsPlans.list(10, 1);

// Create a new plan
const newPlan = await coffee.subscriptionsPlans.create({
  name: 'Monthly Premium',
  description: 'Pro access',
  price: 25000,
  currencyId: '...', // Bogota UUID
  interval: 'monthly',
  accountId: '...',
  billingDay: 1,
  freeDays: 0,
  status: true,
  source: 'API'
});

// Get by ID
const plan = await coffee.subscriptionsPlans.get('PLAN_ID');

// Update plan
await coffee.subscriptionsPlans.update('PLAN_ID', {
  description: 'Updated description'
});

// Delete plan
await coffee.subscriptionsPlans.delete('PLAN_ID');
```

### 3. Consult Currencies

```typescript
// List currencies
const currencies = await coffee.currencies.list(10, 1);

// Get currency by ID
const currency = await coffee.currencies.get('CURRENCY_ID');
```

### 4. Signing for Web Payments

Use this utility to sign requests made from the browser (e.g., for payment buttons).

```typescript
import { CryptoUtils } from 'coffee-pay-sdk';

const accountKey = "YOUR_ACCOUNT_KEY";
const integrityKey = "YOUR_INTEGRITY_KEY";
const timestamp = Math.floor(Date.now() / 1000);

const signature = CryptoUtils.generateWebSignature(accountKey, integrityKey, timestamp);
```

---

## 🛠️ API Reference

### `CoffeeSDK`

| Option | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` | Your Coffee-Pay API Key. |
| `apiSecret` | `string` | Your Coffee-Pay API Secret. |
| `baseUrl` | `string` | (Optional) API endpoint URL. |
| `timeout` | `number` | (Optional) Request timeout in ms (default: 30000). |

### `subscriptionsPlans`

| Method | Description |
| --- | --- |
| `list(limit, page)` | Returns a paginated list of plans. |
| `create(data)` | Creates a new plan. |
| `get(id)` | Retrieves a plan by ID. |
| `update(id, data)` | Partially updates a plan. |
| `delete(id)` | Deletes a plan. |

### `currencies`

| Method | Description |
| --- | --- |
| `list(limit, page)` | Returns a list of supported currencies. |
| `get(id)` | Retrieves detailed information for a specific currency. |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

MIT © [Coffee-Pay](https://coffee-pay.co)
