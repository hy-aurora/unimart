/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as _utils from "../_utils.js";
import type * as admin from "../admin.js";
import type * as adminNotifications from "../adminNotifications.js";
import type * as carts from "../carts.js";
import type * as categories from "../categories.js";
import type * as contactQueries from "../contactQueries.js";
import type * as http from "../http.js";
import type * as logs from "../logs.js";
import type * as notifications from "../notifications.js";
import type * as orders from "../orders.js";
import type * as payments from "../payments.js";
import type * as products from "../products.js";
import type * as schools from "../schools.js";
import type * as todos from "../todos.js";
import type * as user from "../user.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  _utils: typeof _utils;
  admin: typeof admin;
  adminNotifications: typeof adminNotifications;
  carts: typeof carts;
  categories: typeof categories;
  contactQueries: typeof contactQueries;
  http: typeof http;
  logs: typeof logs;
  notifications: typeof notifications;
  orders: typeof orders;
  payments: typeof payments;
  products: typeof products;
  schools: typeof schools;
  todos: typeof todos;
  user: typeof user;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
