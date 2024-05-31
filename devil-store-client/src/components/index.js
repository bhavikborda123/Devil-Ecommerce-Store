import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, ProtectedRoute, AdminProtectedRoute, CartProtectedRoute, PageNotFound, ProductDetails, ProductByCategory, CheckoutPage } from "./shop";
import ContactUs from "./shop/partials/ContactUs";
import { DashboardAdmin, Categories, Products, Orders, Userinfo } from "./admin";
import { UserProfile, UserOrders, SettingUser, WishList } from "./shop/dashboardUser";
import { ForgetPasswordSendOtp } from "./shop/auth/ForgetPasswordSendOtp";
import { ForgetPasswordVerifyOtp } from "./shop/auth/ForgetPasswordVerifyOtp";
import { ForgetPasswordReset } from "./shop/auth/ForgetPasswordReset";


/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/products/category/:catId" component={ProductByCategory} />
        <Route exact path="/contact-us" component={ContactUs} />

        <Route exact path="/reset-password/send-otp" component={ForgetPasswordSendOtp} />
        <Route exact path="/reset-password/verify-otp" component={ForgetPasswordVerifyOtp} />
        <Route exact path="/reset-password/reset-password" component={ForgetPasswordReset} />

        <CartProtectedRoute exact={true} path="/checkout" component={CheckoutPage} />
        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <AdminProtectedRoute exact={true} path="/admin/dashboard" component={DashboardAdmin} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/categories" component={Categories} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/products" component={Products} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/orders" component={Orders} />
        <AdminProtectedRoute exact={true} path="/admin/dashboard/userinfo" component={Userinfo} />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <ProtectedRoute exact={true} path="/user/orders" component={UserOrders} />
        <ProtectedRoute exact={true} path="/user/profile" component={UserProfile} />
        <ProtectedRoute exact={true} path="/user/wishlist" component={WishList} />
        <ProtectedRoute exact={true} path="/user/setting" component={SettingUser} />
        {/* User Dashboard End */}

        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
