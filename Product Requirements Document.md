# Product Requirements Document (PRD)

## Weekly Shopping List & Daily Intake Tracker

---

## 1. Purpose

This application will help a user:

1. Generate a **weekly shopping list** based on fixed daily food quantities.
2. Track **daily intake** of foods against target quantities.
3. See **alternative food options** within each food category.
4. Maintain consistency with a repeatable weekly plan.

The system is intended for a **single-user workflow** and should be simple and predictable.

---

## 2. Core Concepts

### 2.1 Food Item

A **food item** is a measurable ingredient with a defined daily target quantity.

Examples:

| Food Item      | Example Daily Quantity |
| -------------- | ---------------------- |
| Chicken breast | 240 g                  |
| White fish     | 115 g                  |
| Whey isolate   | 43 g                   |
| Eggs           | 1 egg                  |
| Greek yogurt   | 170 g                  |

Each food item must include:

* Name
* Measurement unit
* Daily target quantity
* Quantity interpretation:

  * Cooked
  * Uncooked
  * Whole units (e.g., eggs)

---

### 2.2 Food Category

A **food category** groups similar foods together.

Example:

| Category          | Suitable Foods           |
| ----------------- | ------------------------ |
| White fish        | Cod, Tilapia, Haddock    |
| Fruit             | Apples, Bananas, Berries |
| Frozen vegetables | Broccoli, Peas, Carrots  |

Each category must include:

* Category name
* List of suitable foods

Categories allow flexibility without changing the plan.

---

### 2.3 Daily Targets

The application uses a **fixed daily plan**.

Example:

| Food              | Daily Amount |
| ----------------- | ------------ |
| Chicken breast    | 240 g        |
| White fish        | 115 g        |
| Whey isolate      | 43 g         |
| Eggs              | 1 egg        |
| Greek yogurt      | 170 g        |
| Oats              | 30 g         |
| Frozen vegetables | 360 g        |
| Fresh vegetables  | 215 g        |
| Olive oil         | 8–9 ml       |
| Salmon            | 30 g         |
| Rice/potatoes     | 70 g         |
| Fruit             | 140 g        |

These targets repeat every day.

---

## 3. Features

---

## 3.1 Weekly Shopping List Generator

### Purpose

Generate a shopping list based on:

* Daily quantities
* 7 days per week

---

### Behavior

The system calculates:

Weekly Quantity = Daily Quantity × 7

Example:

| Food           | Daily | Weekly |
| -------------- | ----- | ------ |
| Chicken breast | 240 g | 1680 g |
| Eggs           | 1 egg | 7 eggs |

---

### Requirements

The shopping list must:

* Show each food item
* Show weekly quantity
* Show measurement units
* Allow checkbox marking

Example:

| Checkbox | Food           | Weekly Amount |
| -------- | -------------- | ------------- |
| ☐        | Chicken breast | 1680 g        |
| ☐        | Eggs           | 7 eggs        |

Checkbox state does not need to persist.

---

### Optional Behavior

User may reset all checkboxes.

---

## 3.2 Food Category Reference Table

### Purpose

Allow the user to see acceptable substitutions.

---

### Requirements

Each category must display:

* Category name
* Suitable foods list

Example:

| Category         | Suitable Foods                 |
| ---------------- | ------------------------------ |
| White fish       | Cod, Tilapia, Haddock, Pollock |
| Fresh vegetables | Spinach, Tomatoes, Peppers     |
| Fruit            | Apples, Oranges, Berries       |

---

### Behavior

This table is informational only.

It does not affect calculations.

---

## 3.3 Daily Intake Tracker

### Purpose

Track how much food the user has eaten today.

---

### Requirements

Each food item must display:

* Food name
* Daily target
* Amount consumed
* Remaining amount

---

### Example

| Food           | Target | Consumed | Remaining |
| -------------- | ------ | -------- | --------- |
| Chicken breast | 240 g  | 120 g    | 120 g     |
| Eggs           | 1 egg  | 1 egg    | 0 eggs    |

---

### Behavior

User must be able to:

* Enter consumed amounts
* Adjust consumed amounts
* Reset the day

---

### Calculations

Remaining Amount:

Remaining = Target − Consumed

If consumed exceeds target:

Remaining may be negative.

Example:

Target: 240 g
Consumed: 260 g
Remaining: −20 g

---

## 4. Measurement Rules

Each food item must specify measurement interpretation.

### Types

#### 4.1 Cooked Weight

Measured after cooking.

Example:

* Cooked chicken
* Cooked rice

---

#### 4.2 Uncooked Weight

Measured before cooking.

Example:

* Raw oats
* Raw meat

---

#### 4.3 Whole Units

Measured as individual items.

Example:

* Eggs

---

### Requirement

Each food item must indicate:

* Unit
* Cooked/uncooked/unit-based

Example:

| Food           | Unit | Measurement Type |
| -------------- | ---- | ---------------- |
| Chicken breast | g    | Cooked           |
| Oats           | g    | Uncooked         |
| Eggs           | egg  | Whole unit       |

---

## 5. Data Model

### 5.1 Food Item

Fields:

Name
Unit
Measurement Type
Daily Target
Category

Example:

Chicken breast
g
Cooked
240
Protein

---

### 5.2 Category

Fields:

Name
Suitable Foods List

Example:

White fish

* Cod
* Tilapia
* Haddock

---

### 5.3 Daily Intake Record

Fields:

Date
Food Item
Consumed Amount

Example:

2026-02-21
Chicken breast
180 g

---

## 6. User Interface Structure

---

## 6.1 Main Sections

The application should contain three sections:

### Section 1

Weekly Shopping List

Contains:

* Weekly quantities
* Checkboxes

---

### Section 2

Daily Intake Tracker

Contains:

* Targets
* Consumed
* Remaining

---

### Section 3

Food Options Reference

Contains:

* Categories
* Suitable foods

---

## 7. Default Data

### 7.1 Food Items

Chicken breast
White fish
Whey isolate
Eggs
Greek yogurt
Oats
Frozen vegetables
Fresh vegetables
Olive oil
Salmon
Rice/potatoes
Fruit

---

### 7.2 Categories

Chicken breast:

* Chicken breast

White fish:

* Cod
* Tilapia
* Haddock
* Pollock

Fruit:

* Apples
* Bananas
* Oranges
* Berries

Fresh vegetables:

* Tomatoes
* Spinach
* Lettuce
* Peppers

Frozen vegetables:

* Broccoli
* Peas
* Carrots

Rice/potatoes:

* White rice
* Brown rice
* Potatoes

---

## 8. User Actions

User must be able to:

### Shopping

* View weekly totals
* Check items off

---

### Tracking

* Enter consumed amounts
* Adjust values
* Reset day

---

### Reference

* View food alternatives

---

## 9. Non-Goals

The system does not need:

* Multiple users
* Accounts
* Authentication
* Meal scheduling
* Recipe tracking
* Nutrition tracking
* Calories
* Mobile apps
* Notifications

---

## 10. Simplicity Requirements

The system should:

* Be predictable
* Use fixed targets
* Avoid complex configuration
* Avoid dynamic rules

Targets should be easy to modify.

---

## 11. Success Criteria

The application is successful if a user can:

1. See exactly what to buy for a week.
2. Check off purchased items.
3. Track daily intake.
4. See remaining quantities.
5. See food alternatives.

---

If you want, the **next ideal document** would be a **"Data Schema Spec"** (very small) that makes it extremely easy for an AI coding agent to implement cleanly.

