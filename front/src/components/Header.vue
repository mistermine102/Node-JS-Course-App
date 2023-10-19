<template>
  <header class="border-gray-100 border-b">
    <nav class="px-4 py-4">
      <ul class="flex gap-x-8">
        <li><router-link to="/">Shop</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/orders">Orders</router-link></li>
        <li><router-link to="/admin/product/add">Add product</router-link></li>
        <li><router-link to="/admin/products">Admin product</router-link></li>
      </ul>
    </nav>
  </header>
</template>